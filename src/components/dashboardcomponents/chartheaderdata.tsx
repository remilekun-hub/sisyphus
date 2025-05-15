import { ChartColumnIncreasing, Clock, MoveUp } from "lucide-react";
import "../../styles/chartnav.css";
import { useQuery } from "@tanstack/react-query";
import { base_url } from "@/constants";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ChartHeaderData() {
	const [searchParams] = useSearchParams();
	const currentmarketPair = searchParams.get("market") || "BTC_USDT";
	const slicedCurrentMarketPair = currentmarketPair.split("_");

	const symbol = `${slicedCurrentMarketPair[0].toUpperCase()}${slicedCurrentMarketPair[1].toUpperCase()}`;

	const { data } = useQuery({
		queryKey: [
			"24hr-ticker",
			{
				base: slicedCurrentMarketPair[0],
				quote: slicedCurrentMarketPair[1],
			},
		],
		queryFn: async () => {
			const { data } = await axios.get(
				`${base_url}/api/v3/ticker/24hr?symbol=${symbol}`
			);
			return data;
		},
		staleTime: 0,
	});

	console.log({ data });

	askPrice: "103418.01000000";
	askQty: "6.67117000";
	bidPrice: "103418.00000000";
	bidQty: "0.28547000";
	closeTime: 1747342832009;
	count: 3891576;
	firstId: 4908345199;
	highPrice: "104192.70000000";
	lastId: 4912236774;
	lastPrice: "103418.00000000";
	lastQty: "0.01513000";
	lowPrice: "101383.07000000";
	openPrice: "103555.52000000";
	openTime: 1747256432009;
	prevClosePrice: "103555.52000000";
	priceChange: "-137.52000000";
	priceChangePercent: "-0.133";
	quoteVolume: "1719555668.72582730";
	symbol: "BTCUSDT";
	volume: "16736.41940000";
	weightedAvgPrice: "102743.34238576";

	function get24hrLowPercentage(
		currentPrice: number | string | undefined,
		lowPrice: number | string | undefined
	): number {
		if (currentPrice && lowPrice) {
			const current = parseFloat(currentPrice as string);
			const low = parseFloat(lowPrice as string);

			if (isNaN(current) || isNaN(low) || low === 0) return 0;

			const percentage = ((current - low) / low) * 100;
			return parseFloat(percentage.toFixed(2));
		}
		return 0;
	}

	function get24HrPercentageHight(
		currentPrice: number | string | undefined,
		highPrice: number | string | undefined
	): number {
		if (currentPrice && highPrice) {
			const current = parseFloat(currentPrice as string);
			const high = parseFloat(highPrice as string);
			const percentage = ((high - current) / high) * 100;
			if (isNaN(current) || isNaN(high) || high === 0) return 0;
			return parseFloat(percentage.toFixed(2));
		} else {
			return 0;
		}
	}

	const lowPercent = get24hrLowPercentage(data?.lastPrice, data?.lowPrice);
	const highPercent = get24hrLowPercentage(data?.lastPrice, data?.highPrice);
	return (
		<>
			<div className="border-r-[1px] border-r-[#EAF0FE]/10 pr-10! py-4!">
				<p>
					{data.lastPrice
						? Number(data.lastPrice).toLocaleString()
						: "-"}
				</p>
			</div>

			<div className="border-0 border-r-[1px] border-r-[#EAF0FE]/10 pr-18! pl-10! ">
				<h4 className="item-header">
					<Clock className="size-4 text-[#A7B1BC]" /> 24h change
				</h4>
				<p>
					<span>
						{data.priceChange
							? Number(data.priceChange).toFixed(2)
							: "-"}
					</span>{" "}
					{data.priceChangePercent
						? `${Number(data.priceChangePercent).toFixed(2)}%`
						: "-"}
				</p>
			</div>
			<div className="border-0 border-r-[1px] border-r-[#EAF0FE]/10 pr-18! pl-10!">
				<h4 className="item-header">
					<MoveUp className="size-4 text-[#A7B1BC]" /> 24h high
				</h4>
				<p>
					<span>
						{data.highPrice
							? Number(data.highPrice).toLocaleString()
							: "-"}
					</span>{" "}
					<span>{highPercent}%</span>
				</p>
			</div>
			<div className="border-0 border-r-[1px] border-r-[#EAF0FE]/10 pr-18! pl-10!">
				<h4 className="item-header">
					<MoveUp className="size-4 text-[#A7B1BC]" /> 24h low
				</h4>
				<p>
					<span>
						{data.lowPrice
							? Number(data.lowPrice).toLocaleString()
							: "-"}
					</span>{" "}
					<span>{lowPercent}%</span>
				</p>
			</div>
			<div className="pl-10!">
				<h4 className="item-header">
					<ChartColumnIncreasing className="size-4 text-[#A7B1BC]" />{" "}
					24h volume
				</h4>
				<p>
					{data.quoteVolume
						? Number(data.quoteVolume).toLocaleString()
						: "-"}
				</p>
			</div>
		</>
	);
}
