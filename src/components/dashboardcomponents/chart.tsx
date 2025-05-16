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
import Mobilebuysell from "./mobilebuysell";

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
		staleTime: 0,
	});

	const chartContainerRef = useRef<HTMLDivElement | null>(null);
	const chart = useRef<IChartApi | null>(null);
	const resizeObserver = useRef<ResizeObserver | null>(null);

	// @ts-ignore
	const parsedCandles: CandlestickData[] =
		chartData?.map((candle) => ({
			time: candle[0] / 1000,
			open: parseFloat(candle[1]),
			high: parseFloat(candle[2]),
			low: parseFloat(candle[3]),
			close: parseFloat(candle[4]),
		})) ?? [];

	// @ts-ignore
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

		const containerWidth = chartContainerRef.current.clientWidth;
		const containerHeight = Math.min(window.innerHeight * 0.6, 400);

		chart.current = createChart(chartContainerRef.current, {
			width: containerWidth,
			height: containerHeight,
			crosshair: {
				mode:
					window.innerWidth < 768
						? CrosshairMode.Magnet
						: CrosshairMode.Normal,
			},
			grid: {
				vertLines: { color: "#334158", visible: false },
				horzLines: { color: "#334158", visible: false },
			},
			timeScale: {
				fixLeftEdge: true,
				timeVisible: true,
				secondsVisible: false,
				// @ts-ignore
				tickMarkFormatter: (time) => {
					const date = new Date(time * 1000);
					const hours = date.getHours().toString().padStart(2, "0");
					const minutes = date
						.getMinutes()
						.toString()
						.padStart(2, "0");

					if (selectedRange.toLowerCase() === "1h") {
						return `${hours}:00`;
					} else if (selectedRange.toLowerCase() === "2h") {
						return date.getHours() % 2 === 0 ? `${hours}:00` : "";
					} else if (selectedRange.toLowerCase() === "4h") {
						return date.getHours() % 4 === 0 ? `${hours}:00` : "";
					}
					return `${hours}:${minutes}`;
				},
				minBarSpacing:
					selectedRange.toLowerCase() === "1h"
						? 5
						: selectedRange.toLowerCase() === "2h"
						? 10
						: 15,
			},
			rightPriceScale: {
				autoScale: true,
				entireTextOnly: true,
				minimumWidth: window.innerWidth < 768 ? 60 : 100,
			},
			layout: {
				textColor: "#A7B1BC",
				fontSize: window.innerWidth < 768 ? 10 : 12,
			},
		});

		const candleSeries = chart.current.addSeries(CandlestickSeries, {
			upColor: "#00C076",
			downColor: "#FF6838",
			borderDownColor: "#ff4976",
			borderUpColor: "#4bffb5",
			wickDownColor: "#838ca1",
			wickUpColor: "#838ca1",
			priceFormat: {
				type: "price",
				precision: window.innerWidth < 768 ? 2 : 0,
				minMove: 0.01,
			},
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
				minimumWidth: window.innerWidth < 768 ? 60 : 100,
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
			const { width } = entries[0].contentRect;
			const height = Math.min(window.innerHeight * 0.6, 400);
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
			<div className="time-wrapper">
				<p className="time-label">Time</p>
				<div className="time-buttons-container">
					{timeRange.map((time) => (
						<button
							key={time}
							className={`time-button ${
								selectedRange === time ? "active" : "inactive"
							}`}
							onClick={() => setSelectedRange(time)}
						>
							{time.toUpperCase()}
						</button>
					))}
				</div>
			</div>
			<div ref={chartContainerRef} className="mainchart-container" />
			<Mobilebuysell />
		</div>
	);
}
