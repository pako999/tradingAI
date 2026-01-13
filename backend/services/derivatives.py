import random

class DerivativesService:
    @staticmethod
    def get_market_health():
        """
        Simulates Funding Rates and Liquidation Clusters.
        Extremely high funding rates = Overleveraged (Risk of correction -> Lower short-term confidence?).
        Actually, for checking trend:
        - Positive funding often means bullish sentiment but risk of long squeeze.
        - Negative funding means bearish sentiment but potential for short squeeze.
        
        Let's interpret 'Confidence' as 'Signal Strength' for UPWARD movement for simplicity in this demo,
        or just general market health.
        
        Let's say: 
        - Neutral/Slight positive funding = Healthy Bullish (High score).
        - Extreme positive = Overbought (Medium risk score).
        - Negative = Bearish sentiment (Low score).
        """
        funding_rate = random.uniform(-0.02, 0.05) # Simulated percentage
        
        if funding_rate > 0.03:
            score = random.uniform(40, 60)
            desc = f"High Funding ({funding_rate*100:.3f}%) - Risk of Long Squeeze"
        elif funding_rate > 0:
            score = random.uniform(70, 90)
            desc = f"Healthy Funding ({funding_rate*100:.3f}%) - Bullish Sentiment"
        else:
            score = random.uniform(20, 45)
            desc = f"Negative Funding ({funding_rate*100:.3f}%) - Bearish Sentiment"
            
        return score, desc
