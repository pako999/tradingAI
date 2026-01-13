import random

class OnChainService:
    @staticmethod
    def get_whale_activity():
        """
        Simulates Whale Concentration and Exchange Net Flow.
        High whale accumulation + Exchange Outflows = Bullish (High Score).
        High exchange inflows = Bearish (Low Score).
        """
        # 0 = dump, 1 = accumulate
        accumulation_trend = random.random()
        
        if accumulation_trend > 0.7:
            score = random.uniform(80, 95)
            desc = "Whales are aggressively accumulating"
        elif accumulation_trend > 0.4:
            score = random.uniform(45, 75)
            desc = "Stable whale holdings, low exchange inflows"
        else:
            score = random.uniform(15, 40)
            desc = "High exchange inflows detected from whale wallets"
            
        return score, desc
