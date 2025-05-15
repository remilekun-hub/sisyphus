import "../../styles/orderbook.css";
import { Tabs } from "radix-ui";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import useBinanceOrderBook from "@/hooks/usebinanceorderbook";
import OrderAsk from "./orderask";
import OrderBid from "./orderbid";

export default function Orderbook() {
	const [searchParams] = useSearchParams();
	const currentmarketPair = searchParams.get("market") || "BTC_USDT";
	const slicedCurrentMarketPair = currentmarketPair.split("_");
	const [orderLimit, setOrderLimit] = useState("5");
	const symbol = `${slicedCurrentMarketPair[0].toLowerCase()}${slicedCurrentMarketPair[1].toLowerCase()}`;

	const { bids, asks } = useBinanceOrderBook(symbol, orderLimit);
	const totalBids = bids.reduce((sum, order) => sum + order.price, 0);
	const totalAsks = asks.reduce((sum, order) => sum + order.price, 0);

	const handleLimitChange = (value: string) => {
		setOrderLimit(value);
	};
	return (
		<div className="orderbook-container">
			<Tabs.Root className="TabsRoot" defaultValue="orderbook">
				<Tabs.List
					className="TabsList"
					aria-label="Manage your account"
				>
					<Tabs.Trigger className="TabsTrigger" value="orderbook">
						Order Book
					</Tabs.Trigger>
					<Tabs.Trigger className="TabsTrigger" value="recenttrades">
						Recent Trades
					</Tabs.Trigger>
				</Tabs.List>
				<div>
					<div>hello</div>
					<Select
						value={orderLimit}
						onValueChange={handleLimitChange}
					>
						<SelectTrigger
							size="default"
							className="focus-visible:ring-0! ring-0! outline-none! border-0! w-[60px]! h-[40px]! px-1.5!  bg-[#353945]! rounded-[4px]! flex! items-center! justify-center!"
						>
							<SelectValue placeholder="10" />
						</SelectTrigger>
						<SelectContent className="bg-[#353945] px-1! border-0 py-1!">
							<SelectItem
								value="5"
								className="text-white py-2! px-0.5!"
							>
								5
							</SelectItem>
							<SelectItem
								value="10"
								className="text-white py-2! px-0.5!"
							>
								10
							</SelectItem>
							<SelectItem
								value="20"
								className="text-white py-2! px-0.5!"
							>
								20
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Tabs.Content className="TabsContent" value="orderbook">
					<div>
						<table>
							<tr className="table-header">
								<td>Price (USDT)</td>
								<td>Amount (BTC)</td>
								<td>Total</td>
							</tr>
							{asks?.map((b, i) => (
								<OrderAsk key={i} {...b} />
							))}

							<tr className="">
								<td
									colSpan={3}
									style={{
										textAlign: "center",
										paddingBlock: "6px",
									}}
								>
									<span style={{ color: "#25c26e" }}>
										{totalBids.toFixed(2)}
									</span>{" "}
									- <span>{totalAsks.toFixed(2)}</span>
								</td>
							</tr>
							{bids?.map((b, i) => (
								<OrderBid key={i} {...b} />
							))}
						</table>
					</div>
				</Tabs.Content>
				<Tabs.Content className="TabsContent" value="recenttrades">
					<h1>recent</h1>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
