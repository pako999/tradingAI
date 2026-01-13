from services.macro import MacroService
from services.onchain import OnChainService
from services.derivatives import DerivativesService

class WeightedConsensusEngine:
    def __init__(self):
        self.macro = MacroService()
        self.onchain = OnChainService()
        self.derivatives = DerivativesService()
        
    def analyze_ticker(self, ticker: str):
        # 1. Fetch Data
        macro_score, macro_desc = self.macro.get_btc_etf_flow()
        onchain_score, onchain_desc = self.onchain.get_whale_activity()
        deriv_score, deriv_desc = self.derivatives.get_market_health()
        
        # 2. Apply Weights
        # Macro (30%), On-Chain (40%), Derivatives (30%)
        final_score = (macro_score * 0.30) + (onchain_score * 0.40) + (deriv_score * 0.30)
        
        # 3. Determine Sentiment
        if final_score >= 80:
            sentiment = "Extreme Bullish"
        elif final_score >= 60:
            sentiment = "Bullish"
        elif final_score >= 40:
            sentiment = "Neutral"
        elif final_score >= 20:
            sentiment = "Bearish"
        else:
            sentiment = "Extreme Bearish"
            
        return {
            "ticker": ticker.upper(),
            "confidence_score": round(final_score, 2),
            "market_sentiment": sentiment,
            "components": {
                "macro": {"score": round(macro_score, 1), "desc": macro_desc},
                "onchain": {"score": round(onchain_score, 1), "desc": onchain_desc},
                "derivatives": {"score": round(deriv_score, 1), "desc": deriv_desc}
            }
        }
