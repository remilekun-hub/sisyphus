export type ExchangeListType = {
	baseAsset: string;
	isSpotTradingAllowed: boolean;
	quoteAsset: string;
	symbol: string;
};

export interface CandleRaw {
  [0]: number; // Open time
  [1]: string; // Open
  [2]: string; // High
  [3]: string; // Low
  [4]: string; // Close
  [5]: string; // Volume
  [6]: number; // Close time
  [7]: string; // Quote volume
  [8]: number; // Trades
  [9]: string; // Taker buy base vol
  [10]: string; // Taker buy quote vol
}

export interface Props {
  chartData: CandleRaw[];
}

export interface CandlestickData {
	time: number | string; // Unix timestamp in seconds (or ISO date string)
	open: number;
	high: number;
	low: number;
	close: number;
}
export type BinanceCandle = [
	number,    // openTime
	string,    // open
	string,    // high
	string,    // low
	string,    // close
	string,    // volume
	number,    // closeTime
	string,    // quoteAssetVolume
	number,    // numberOfTrades
	string,    // takerBuyBaseVolume
	string,    // takerBuyQuoteVolume
	string     // ignore
];

export type Order = {
  price: number;
  amount: number;
  total: number;
  percentage: number;
};

export type OrderBook = {
  bids: Order[];
  asks: Order[];
};

export type OrderFormState = {
  price: string;
  amount: string;
  total: string;
};