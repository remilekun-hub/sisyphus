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
import useBinanceOrderBook from "@/hooks/usebinanceorderbook";
import OrderAsk from "./orderask";
import OrderBid from "./orderbid";
import { MoveUp } from "lucide-react";

export default function Orderbook() {
	const [searchParams] = useSearchParams();
	const currentmarketPair = searchParams.get("market") || "BTC_USDT";
	const slicedCurrentMarketPair = currentmarketPair.split("_");

	const symbol = `${slicedCurrentMarketPair[0].toLowerCase()}${slicedCurrentMarketPair[1].toLowerCase()}`;

	const { bids, asks } = useBinanceOrderBook(symbol, "5");
	const totalBids = bids.reduce((sum, order) => sum + order.price, 0);
	const totalAsks = asks.reduce((sum, order) => sum + order.price, 0);

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
				<div className=" ordertype-box">
					<div className="ordertype-icons">
						
					</div>
					<Select>
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
								<td>
									Price <br />(
									{slicedCurrentMarketPair[1].toUpperCase()})
								</td>
								<td>
									Amount <br />(
									{slicedCurrentMarketPair[0].toUpperCase()})
								</td>
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
									<span
										style={{
											display: "inline-block",
											marginRight: "3px",
										}}
									>
										<MoveUp className="text-[#25c26e] size-3" />{" "}
									</span>
									<span>{totalAsks.toFixed(2)}</span>
								</td>
							</tr>
							{bids?.map((b, i) => (
								<OrderBid key={i} {...b} />
							))}
						</table>
					</div>
				</Tabs.Content>
				<Tabs.Content className="TabsContent" value="recenttrades">
					<div>
						<table>
							<tr className="table-header">
								<td>
									Price <br />(
									{slicedCurrentMarketPair[1].toUpperCase()})
								</td>
								<td>
									Amount <br />(
									{slicedCurrentMarketPair[0].toUpperCase()})
								</td>
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
									<span
										style={{
											display: "inline-block",
											marginRight: "3px",
										}}
									>
										<MoveUp className="text-[#25c26e] size-3" />{" "}
									</span>
									<span>{totalAsks.toFixed(2)}</span>
								</td>
							</tr>
							{bids?.map((b, i) => (
								<OrderBid key={i} {...b} />
							))}
						</table>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
