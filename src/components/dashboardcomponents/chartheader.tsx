import { ChevronDown } from "lucide-react";
import "../../styles/chartnav.css";
import { useQuery } from "@tanstack/react-query";
import { base_url } from "@/constants";
import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { FixedSizeList as List } from "react-window";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ExchangeListType } from "@/types";
import useDebounce from "@/hooks/usedebounce";
import { useSearchParams } from "react-router-dom";
import ChartHeaderData from "./chartheaderdata";
import useTicker24hr from "@/hooks/usetickertwentyfour";
import Glass from "@/assets/icons/glass";

export default function ChartNav() {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentmarketPair = searchParams.get("market") || "BTC_USDT";
	const slicedCurrentMarketPair = currentmarketPair.split("_");
	const [selectMarket, setSelectMarket] = useState("All");
	const [rawExchangesList, setRawExchangesList] = useState<
		ExchangeListType[]
	>([]);
	const [exchangesList, setExchangesList] = useState<ExchangeListType[]>([]);
	const [query, setQuery] = useState("");

	const { data: exchanges } = useQuery({
		queryKey: ["exchanges"],
		queryFn: async () => {
			const { data } = await axios.get(`${base_url}/api/v3/exchangeInfo`);
			const isSpotAllowed = Array.isArray(data?.symbols)
				? (data.symbols as ExchangeListType[]).filter(
						(d) => d.isSpotTradingAllowed
				  )
				: [];
			return isSpotAllowed;
		},
		staleTime: 30000,
	});
	useEffect(() => {
		if (exchanges?.length) {
			setRawExchangesList(exchanges);
			setExchangesList(exchanges);
		}
	}, [exchanges]);

	useEffect(() => {
		const market = selectMarket.toLowerCase();
		let filteredList = rawExchangesList;
		if (market === "all") {
			setExchangesList(filteredList);
		} else if (market === "usd") {
			filteredList = rawExchangesList.filter(
				(d) =>
					d.baseAsset.toLowerCase() === "usd" ||
					d.baseAsset.toLowerCase() === "usdt"
			);
			setExchangesList(filteredList);
		} else {
			filteredList = rawExchangesList.filter(
				(d) => d.baseAsset.toLowerCase() === market
			);
			setExchangesList(filteredList);
		}
	}, [selectMarket]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value.trim());
	};
	const search = useDebounce(query);
	const filteredList = (exchangesList || []).filter((value) =>
		value.symbol.toLowerCase().includes(search.toLowerCase())
	);
	const markets = ["All", "USD", "BTC"];
	const { data } = useTicker24hr(
		slicedCurrentMarketPair[0],
		slicedCurrentMarketPair[1]
	);

	return (
		<div className="chartnav-container">
			<div className="symbol">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="dropdown-trigger-button">
							<span>
								{slicedCurrentMarketPair[0]}/
								{slicedCurrentMarketPair[1]}
							</span>
							<ChevronDown />
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="dropdown-content">
						<p className="dropdown-title">Select Market</p>

						<div className="dropdown-search">
							<Glass />
							<input
								type="text"
								value={query}
								onChange={handleChange}
								placeholder="Search"
							/>
						</div>

						<div className="market-filters">
							{markets.map((m) => (
								<button
									key={m}
									onClick={() => setSelectMarket(m)}
									className={`market-filter-button ${
										selectMarket === m ? "active" : ""
									}`}
								>
									{m}
								</button>
							))}
						</div>

						<div className="market-list">
							<List
								height={210}
								itemCount={filteredList.length}
								itemSize={45}
								width={"100%"}
								className="react-window-no-scrollbar"
							>
								{({ index, style }) => {
									const d = filteredList[index];
									return (
										<DropdownMenuItem
											key={index}
											style={style}
											onClick={() => {
												setSearchParams({
													market: `${d.baseAsset.toUpperCase()}_${d.quoteAsset.toUpperCase()}`,
												});
											}}
											className="dropdown-item"
										>
											<p>
												{d.baseAsset} - {d.quoteAsset}
											</p>
										</DropdownMenuItem>
									);
								}}
							</List>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>

				<p className="symbol-price">
					{data?.lastPrice
						? `$${Number(data.lastPrice).toLocaleString()}`
						: "-"}
				</p>
			</div>

			<div>
				<ChartHeaderData />
			</div>
		</div>
	);
}
