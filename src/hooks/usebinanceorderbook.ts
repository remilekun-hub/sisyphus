import type { Order, OrderBook } from "@/types";
import { useEffect, useState } from "react";

const useBinanceOrderBook = (symbol: string, limit: string): OrderBook => {
	const [orderBook, setOrderBook] = useState<OrderBook>({
		bids: [],
		asks: [],
	});

	useEffect(() => {
		if (!symbol) return;

		const lowerSymbol = symbol.toLowerCase();
		const wsUrl = `wss://stream.binance.com:9443/ws/${lowerSymbol}@depth${limit}@1000ms`;
		const ws = new WebSocket(wsUrl);

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);

			const parseOrders = (entries: [string, string][]): Order[] => {
				const orders = entries.map(([priceStr, amountStr]) => {
					const price = parseFloat(priceStr);
					const amount = parseFloat(amountStr);
					const total = price * amount;
					return { price, amount, total, percentage: 0 };
				});

				const totalSum = orders.reduce((sum, o) => sum + o.total, 0);
				return orders.map((o) => ({
					...o,
					percentage:
						totalSum > 0
							? parseFloat(
									((o.total / totalSum) * 100).toFixed(2)
							  )
							: 0,
				}));
			};

			setOrderBook({
				bids: parseOrders(data.bids),
				asks: parseOrders(data.asks),
			});
		};

		return () => {
			ws.close();
		};
	}, [symbol, limit]);

	return orderBook;
};

export default useBinanceOrderBook;
