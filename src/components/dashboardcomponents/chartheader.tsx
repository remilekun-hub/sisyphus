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
import clsx from "clsx";
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
						<button className="outline-none! uppercase! text-[22px]! font-[500]! text-white! flex! items-center!">
							<span>
								{slicedCurrentMarketPair[0]}/
								{slicedCurrentMarketPair[1]}
							</span>
							<ChevronDown className="text-white size-5 ml-5!" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[444px] mt-5! h-[400px] border-[1px]! rounded-[8px]! ml-[30px]! dropdown-content p-4!">
						<p className="text-[16px] mb-3! font-[500] text-white">
							Select Market
						</p>
						<div className="px-4! flex items-center w-full bg-[#20252B] h-[40px] mb-3! border-[1px]! border-[#373B3F]!  rounded-[8px]!">
							<Glass className="mt-0.5!" />
							<input
								type="text"
								value={query}
								onChange={handleChange}
								placeholder="Search"
								className="w-full! flex-1 border-0 h-full text-white! pl-3! placeholder:text-[#A5B1BD]!"
							/>
						</div>
						<div className="flex items-center gap-4 border-[1px] py-1.5! border-x-0 border-[var(--border-primary)]">
							{markets.map((m) => (
								<button
									key={m}
									onClick={() => setSelectMarket(m)}
									className={clsx(
										"text-[15px]! font-[500]! outline-0! border-0! cursor-pointer! rounded-full! px-3! py-1.5!",
										{
											"bg-[#353945]! text-white!":
												selectMarket === m,
										},
										{
											"bg-none! text-[#A7B1BC]!":
												selectMarket !== m,
										}
									)}
								>
									{m}
								</button>
							))}
						</div>

						<div className="w-full mt-3!">
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
											className="hover:bg-inherit! cursor-pointer!"
										>
											<p className="uppercase text-[#A7B1BC] text-[15px] font-[400]">
												{d.baseAsset} - {d.quoteAsset}
											</p>
										</DropdownMenuItem>
									);
								}}
							</List>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
				<p
					style={{
						color: "#25c26e",
						fontSize: "18px",
						fontWeight: 500,
					}}
				>
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
