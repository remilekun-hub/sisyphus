import { ChartColumnIncreasing, Clock, MoveUp } from "lucide-react";
import "../../styles/chartnav.css";
import { useSearchParams } from "react-router-dom";
import useTicker24hr from "@/hooks/usetickertwentyfour";

export default function ChartHeaderData() {
	const [searchParams] = useSearchParams();
	const currentmarketPair = searchParams.get("market") || "BTC_USDT";
	const slicedCurrentMarketPair = currentmarketPair.split("_");
	const { data } = useTicker24hr(
		slicedCurrentMarketPair[0],
		slicedCurrentMarketPair[1]
	);

	function get24hrLowPercentage(
		currentPrice: number | string | undefined,
		lowPrice: number | string | undefined
	): string {
		if (currentPrice && lowPrice) {
			const current = parseFloat(currentPrice as string);
			const low = parseFloat(lowPrice as string);

			if (isNaN(current) || isNaN(low) || low === 0) return "";

			const percentage = ((current - low) / low) * 100;
			const formatted = Math.abs(percentage).toFixed(2);
			const sign = percentage >= 0 ? "+" : "-";
			return `${sign}${formatted}%`;
		}
		return "";
	}

	function get24HrPercentageHigh(
		currentPrice: number | string | undefined,
		highPrice: number | string | undefined
	): string {
		if (currentPrice && highPrice) {
			const current = parseFloat(currentPrice as string);
			const high = parseFloat(highPrice as string);
			const percentage = ((high - current) / high) * 100;
			if (isNaN(current) || isNaN(high) || high === 0) return "";
			const formatted = Math.abs(percentage).toFixed(2);
			const sign = percentage >= 0 ? "+" : "-";
			return `${sign}${formatted}%`;
		} else {
			return "";
		}
	}

	const lowPercent = get24hrLowPercentage(data?.lastPrice, data?.lowPrice);
	const highPercent = get24HrPercentageHigh(data?.lastPrice, data?.highPrice);
	return (
		<div className="chart-header-block-wrapper">
			<div className="chart-header-block">
				<h4 className="item-header">
					<Clock className="size-4 text-[#A7B1BC]" /> 24h change
				</h4>
				<p style={{ color: "#25c26e" }}>
					<span>
						{data?.priceChange
							? Number(data.priceChange).toFixed(2)
							: "-"}
					</span>{" "}
					{data?.priceChangePercent
						? `${Number(data.priceChangePercent).toFixed(2)}%`
						: "-"}
				</p>
			</div>
			<div className="chart-header-block">
				<h4 className="item-header">
					<MoveUp className="size-4 text-[#5f91c6]" /> 24h high
				</h4>
				<p>
					<span>
						{data?.highPrice
							? Number(data.highPrice).toLocaleString()
							: "-"}
					</span>{" "}
					<span>{highPercent}</span>
				</p>
			</div>
			<div className="chart-header-block">
				<h4 className="item-header">
					<MoveUp className="size-4 text-[#A7B1BC]" /> 24h low
				</h4>
				<p>
					<span>
						{data?.lowPrice
							? Number(data.lowPrice || 0).toLocaleString()
							: "-"}
					</span>{" "}
					<span>{lowPercent}</span>
				</p>
			</div>
			<div className="chart-header-block">
				<h4 className="item-header">
					<ChartColumnIncreasing className="size-4 text-[#A7B1BC]" />{" "}
					24h volume
				</h4>
				<p>
					{data?.quoteVolume
						? Number(data.quoteVolume || 0).toLocaleString()
						: "-"}
				</p>
			</div>
		</div>
	);
}
