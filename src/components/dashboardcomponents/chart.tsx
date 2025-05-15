import clsx from "clsx";
import "../../styles/chart.css";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { base_url } from "@/constants";
import { useSearchParams } from "react-router-dom";
import {
	createChart,
	CandlestickSeries,
	HistogramSeries,
	CrosshairMode,
	type CandlestickData,
	type HistogramData,
	type IChartApi,
	ColorType,
} from "lightweight-charts";
import type { BinanceCandle } from "@/types";

export default function Chart() {
	const timeRange = ["1h", "2h", "4h", "1d", "1w", "1m"];
	const [selectedRange, setSelectedRange] = useState(timeRange[2]);
	const [searchParams] = useSearchParams();
	const currentmarketPair = searchParams.get("market") || "BTC_USDT";
	const slicedCurrentMarketPair = currentmarketPair.split("_");
	const symbol = `${
		slicedCurrentMarketPair[0]
	}${slicedCurrentMarketPair[1].toUpperCase()}`;

	const { data: chartData } = useQuery({
		queryKey: [selectedRange, symbol],
		queryFn: async () => {
			const { data } = await axios.get(
				`${base_url}/api/v3/klines?symbol=${symbol}&interval=${selectedRange.toLowerCase()}&limit=100`
			);
			return data as BinanceCandle[];
		},
		staleTime: 0
	});

	const chartContainerRef = useRef<HTMLDivElement | null>(null);
	const chart = useRef<IChartApi | null>(null);
	const resizeObserver = useRef<ResizeObserver | null>(null);

	const parsedCandles: CandlestickData[] =
		chartData?.map((candle) => ({
			time: candle[0] / 1000, // seconds
			open: parseFloat(candle[1]),
			high: parseFloat(candle[2]),
			low: parseFloat(candle[3]),
			close: parseFloat(candle[4]),
		})) ?? [];

	const parsedVolume: HistogramData[] =
		chartData?.map((candle) => ({
			time: candle[0] / 1000,
			value: parseFloat(candle[5]),
			color:
				parseFloat(candle[4]) > parseFloat(candle[1])
					? "#4bffb5"
					: "#ff4976",
		})) ?? [];

	useEffect(() => {
		if (!chartContainerRef.current) return;

		chart.current = createChart(chartContainerRef.current, {
			width: chartContainerRef.current.clientWidth,
			height: 500,
			crosshair: { mode: CrosshairMode.Normal },
			grid: {
				vertLines: { color: "#334158", visible: false },
				horzLines: { color: "#334158", visible: false },
			},
			timeScale: {
				fixLeftEdge: true,
			},
			rightPriceScale: {
				autoScale: true,
				entireTextOnly: true,
				minimumWidth: 100,
			},
			layout: {
				textColor: "#A7B1BC",
			},
		});

		const candleSeries = chart.current.addSeries(CandlestickSeries, {
			upColor: "#00C076",
			downColor: "#FF6838",
			borderDownColor: "#ff4976",
			borderUpColor: "#4bffb5",
			wickDownColor: "#838ca1",
			wickUpColor: "#838ca1",
			priceFormat: { type: "price", precision: 0, minMove: 1 },
		});
		candleSeries.setData(parsedCandles);

		const volumeSeries = chart.current.addSeries(HistogramSeries, {
			priceFormat: { type: "volume" },
		});

		volumeSeries.setData(parsedVolume);
		chart.current.applyOptions({
			layout: {
				background: { type: ColorType.Solid, color: "#20252B" },
			},
			rightPriceScale: {
				
				autoScale: true,
				entireTextOnly: true,
				minimumWidth: 100,
				scaleMargins: {
					top: 0.3,
					bottom: 0,
				},
				
			},
		});
		chart.current.timeScale().fitContent();

		return () => chart.current?.remove();
	}, [chartData]);

	useEffect(() => {
		if (!chartContainerRef.current || !chart.current) return;

		resizeObserver.current = new ResizeObserver((entries) => {
			const { width, height } = entries[0].contentRect;
			chart.current?.applyOptions({ width, height });
			setTimeout(() => {
				chart.current?.timeScale().fitContent();
			}, 0);
		});

		resizeObserver.current.observe(chartContainerRef.current);

		return () => resizeObserver.current?.disconnect();
	}, []);

	return (
		<div className="chart-container">
			<div className="flex gap-3 items-center">
				<p
					className={clsx(
						"text-[15px]! bg-none! text-[#A7B1BC]! transition font-[500]! outline-0! border-0! cursor-pointer! rounded-full! px-3! py-1.5!"
					)}
				>
					Time
				</p>
				{timeRange.map((time) => (
					<button
						key={time}
						className={clsx(
							"text-[15px]! transition font-[500]! outline-0! border-0! cursor-pointer! rounded-full! px-3.5! py-1.5!",
							{
								"bg-[#353945]! text-white!":
									selectedRange === time,
							},
							{
								"bg-none! text-[#A7B1BC]!":
									selectedRange !== time,
							}
						)}
						onClick={() => setSelectedRange(time)}
					>
						{time.toUpperCase()}
					</button>
				))}
			</div>

			<div className="">
				<div
					ref={chartContainerRef}
					className="mainchart-container"
					style={{
						width: "100%",
						height: "100%",
						margin: 0,
						padding: 0,
						position: "relative",
					}}
				/>
			</div>
		</div>
	);
}
