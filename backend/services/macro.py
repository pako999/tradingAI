import random

class MacroService:
    @staticmethod
    def get_btc_etf_flow():
        """
        Simulates fetching BTC ETF Net Flow data.
        Returns a normalized score (0-100) and a description.
        In reality, high inflows are bullish (high score), outflows bearish (low score).
        """
        # Simulate value between -500M and +500M
        flow_millions = random.uniform(-100, 300) 
        
        if flow_millions > 100:
            score = random.uniform(75, 100)
            desc = f"Strong Inflows of ${flow_millions:.1f}M"
        elif flow_millions > 0:
            score = random.uniform(50, 75)
            desc = f"Moderate Inflows of ${flow_millions:.1f}M"
        elif flow_millions > -50:
            score = random.uniform(40, 50)
            desc = f"Neutral/Minor Outflows of ${abs(flow_millions):.1f}M"
        else:
            score = random.uniform(10, 40)
            desc = f"Significant Outflows of ${abs(flow_millions):.1f}M"
            
        return score, desc
