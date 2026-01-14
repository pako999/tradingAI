import requests
import os
import logging

logger = logging.getLogger(__name__)

class BitqueryClient:
    def __init__(self):
        self.api_key = os.getenv("BITQUERY_API_KEY")
        self.url = "https://streaming.bitquery.io/graphql"

    def get_whale_trades(self, network="solana", currency_address=None):
        """
        Fetches recent trades > $10k USD to identify whale activity.
        """
        if not self.api_key:
            logger.warning("BITQUERY_API_KEY not found. Skipping on-chain data.")
            return []

        # GraphQL Query for Large Trades
        query = """
        query ($network: BluetoothNetwork!, $token: String!, $limit: Int!) {
          EVM(network: $network) {
            DEXTradeByTokens(
              orderBy: {descending: Block_Time}
              limit: $limit
              where: {Trade: {Side: {Currency: {SmartContract: {is: $token}}}}, Amount: {ge: "10000"}}
            ) {
              Block {
                Time
              }
              Trade {
                Amount
                Price
                Side {
                  Currency {
                    Symbol
                  }
                }
              }
              Transaction {
                Hash
              }
            }
          }
        }
        """
        
        # Adjust network name for Bitquery (eth -> ethereum, sol -> solana)
        bq_network = "eth" if network == "ethereum" else network
        
        variables = {
            "network": bq_network,
            "token": currency_address,
            "limit": 10
        }

        try:
            headers = {"Authorization": f"Bearer {self.api_key}"}
            response = requests.post(self.url, json={"query": query, "variables": variables}, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                return data.get("data", {}).get("EVM", {}).get("DEXTradeByTokens", [])
            else:
                logger.error(f"Bitquery Error: {response.text}")
                return []
        except Exception as e:
            logger.error(f"Failed to fetch Bitquery data: {e}")
            return []
