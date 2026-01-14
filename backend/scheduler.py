from apscheduler.schedulers.background import BackgroundScheduler
from services.intelligence import AlphaIntelligenceEngine
from database import SessionLocal, Signal
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ai_engine = AlphaIntelligenceEngine()

def run_prediction_cycle():
    """
    Run every 15 mins.
    1. Generates signals for watched tickers.
    2. Saves them to DB.
    """
    logger.info("⚡️ Running AlphaPulse Prediction Cycle...")
    db = SessionLocal()
    # Top 100 Coins (Majors + Trending Alts + Memes)
    tickers = [
        "BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "AVAX", "DOGE", "DOT", "LINK",
        "MATIC", "SHIB", "LTC", "TRX", "UNI", "ATOM", "XLM", "ETC", "FIL", "NEAR",
        "VET", "ALGO", "ICP", "STX", "AAVE", "QNT", "GRT", "FTM", "EOS", "SAND",
        "MANA", "THETA", "EGLD", "AXS", "XTZ", "RUNE", "CAKE", "FLOW", "HBAR", "KCS",
        "MKR", "BSV", "KLAY", "IOTA", "NEO", "CRV", "LDO", "APT", "ARB", "OP",
        "INJ", "RNDR", "PEPE", "WIF", "BONK", "FLOKI", "SUI", "SEI", "TIA", "BLUR",
        "DYDX", "IMX", "SNX", "GMX", "KAS", "WOO", "FET", "AGIX", "OCEAN", "JASMY",
        "CFX", "GALA", "CHZ", "MINA", "COMP", "DASH", "ZEC", "NOT", "TON", "BCH",
        "LEO", "OKB", "CRO", "LUNC", "BTT", "XMR", "TUSD", "USDD", "FDUSD", "GNO",
        "AR", "ROSE", "GLM", "BAT", "ENJ", "ZIL", "TFUEL", "QTUM", "ANKR", "WAVES"
    ]
    
    try:
        for ticker in tickers:
            # Generate Pro Signal
            setup = ai_engine.generate_trade_setup(ticker)
            
            # Simple logic: If confidence > 80, log it as a trade signal
            if setup["success_probability"] > 80:
                logger.info(f"🔥 HIGH CONFIDENCE SIGNAL: {ticker} {setup['signal']}")
                
                db_signal = Signal(
                    ticker=ticker,
                    signal_type=setup["signal"],
                    entry_price=setup["setup"]["entry_zone"][0], # Low end of zone
                    stop_loss=setup["setup"]["stop_loss"],
                    take_profit=setup["setup"]["take_profit_1"],
                    confidence=float(setup["success_probability"])
                )
                db.add(db_signal)
        
        db.commit()
    except Exception as e:
        logger.error(f"Error in prediction cycle: {e}")
    finally:
        db.close()

def start_scheduler():
    scheduler = BackgroundScheduler()
    # Run every 5 minutes for demo purposes (usually 15min or 1h)
    scheduler.add_job(run_prediction_cycle, "interval", minutes=5)
    scheduler.start()
    logger.info("✅ AlphaPulse Scheduler Started")
