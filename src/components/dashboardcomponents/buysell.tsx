import clsx from "clsx";
import "../../styles/buysell.css";
import { Tabs } from "radix-ui";
import { useState } from "react";
import { Info } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useSearchParams } from "react-router-dom";
import type { OrderFormState } from "@/types";

export default function BuySell() {
	const buyType = ["Limit", "Market", "Stop-Limit"];
	const [selectedBuyType, setSelectedBuyType] = useState(buyType[0]);
	const [searchParams] = useSearchParams();
	const currentmarketPair = searchParams.get("market") || "BTC_USDT";
	const slicedCurrentMarketPair = currentmarketPair.split("_");
	const [selectedCurrency, setSelectedCurrency] = useState("NGN");

	const handleCurrencyChange = (value: string) => {
		setSelectedCurrency(value);
	};

	const [form, setForm] = useState<OrderFormState>({
		price: "",
		amount: "",
		total: "0.00",
	});

	const updateForm = (updatedFields: Partial<OrderFormState>) => {
		setForm((prev) => ({
			...prev,
			...updatedFields,
		}));
	};

	const handlePriceChange = (value: string) => {
		const price = value;
		const { amount } = form;
		const total = amount
			? (parseFloat(price) * parseFloat(amount)).toFixed(2)
			: "";
		updateForm({ price, total });
	};

	const handleAmountChange = (value: string) => {
		const amount = value;
		const { price } = form;
		const total = price
			? (parseFloat(price) * parseFloat(amount)).toFixed(2)
			: "";
		updateForm({ amount, total });
	};

	const handleTotalChange = (value: string) => {
		const total = value;
		const { price } = form;
		const amount =
			price && parseFloat(price) !== 0
				? (parseFloat(total) / parseFloat(price)).toFixed(6)
				: "";
		updateForm({ total, amount });
	};

	return (
		<div className="buy-sell-container">
			<Tabs.Root className="TabsRoot" defaultValue="buy">
				<Tabs.List
					className="TabsList"
					aria-label="Manage your account"
				>
					<Tabs.Trigger className="TabsTrigger" value="buy">
						Buy
					</Tabs.Trigger>
					<Tabs.Trigger className="TabsTrigger" value="sell">
						Sell
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content className="TabsContent" value="buy">
					<div>
						<div className="flex gap-3 items-center justify-between">
							{buyType.map((type) => (
								<button
									key={type}
									className={clsx(
										"text-[15px]! transition font-[500]! outline-0! border-0! cursor-pointer! rounded-full! px-3.5! py-1.5!",
										{
											"bg-[#353945]! text-white!":
												selectedBuyType === type,
										},
										{
											"bg-none! text-[#A7B1BC]!":
												selectedBuyType !== type,
										}
									)}
									onClick={() => setSelectedBuyType(type)}
								>
									{type}
								</button>
							))}
						</div>
						{selectedBuyType.toLowerCase() === "limit" && (
							<div className="w-full flex-col gap-4 mt-4! rounded-[8px!]">
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Limit Price{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											placeholder="0.00"
											className="border-0! placeholder:text-[#A7B1BC]! text-right! flex-1! pr-2! text-[#A7B1BC]! font-[500]! text-[14px]!"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Amount{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											className="border-0! text-right! flex-1! pr-2! placeholder:text-[#A7B1BC]! text-[#A7B1BC]! font-[500]! text-[14px]!"
											placeholder="0.00"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Type{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="text-[#A7B1BC]! font-[500]! text-[14px]! focus-visible:ring-0! ring-0! outline-none! border-0! w-auto! h-full! px-1.5!  bg-inherit! rounded-[4px]! flex! items-center! justify-center!">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="bg-[#353945] px-0! border-1 rounded-[12px]! border-[#373B3F]! py-0! ml-10! w-[200px]!">
												<SelectItem
													value="	Fill or Kill"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till cancelled
												</SelectItem>

												<SelectItem
													value="Good till date"
													className="rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till date
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						)}
						{selectedBuyType.toLowerCase() === "market" && (
							<div className="mt-4! mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Amount{" "}
									<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
								</p>
								<div className="flex! items-center!">
									<input
										type="text"
										className="border-0! text-right! flex-1! pr-2! placeholder:text-[#A7B1BC]! text-[#A7B1BC]! font-[500]! text-[14px]!"
										placeholder="0.00"
										value={form.amount}
										onChange={(e) =>
											handleAmountChange(e.target.value)
										}
									/>
									<p className="text-[#A7B1BC] font-[500] text-[14px]">
										{slicedCurrentMarketPair[1].toUpperCase()}
									</p>
								</div>
							</div>
						)}

						{selectedBuyType.toLowerCase() === "stop-limit" && (
							<div className="w-full flex-col gap-4 mt-4! rounded-[8px!]">
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Limit Price{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											placeholder="0.00"
											className="border-0! placeholder:text-[#A7B1BC]! text-right! flex-1! pr-2! text-[#A7B1BC]! font-[500]! text-[14px]!"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Amount{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											className="border-0! text-right! flex-1! pr-2! placeholder:text-[#A7B1BC]! text-[#A7B1BC]! font-[500]! text-[14px]!"
											placeholder="0.00"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Type{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="text-[#A7B1BC]! font-[500]! text-[14px]! focus-visible:ring-0! ring-0! outline-none! border-0! w-auto! h-full! px-1.5!  bg-inherit! rounded-[4px]! flex! items-center! justify-center!">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="bg-[#353945] px-0! border-1 rounded-[12px]! border-[#373B3F]! py-0! ml-10! w-[200px]!">
												<SelectItem
													value="	Fill or Kill"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till cancelled
												</SelectItem>

												<SelectItem
													value="Good till date"
													className="rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till date
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						)}

						<div>
							<div className="flex justify-between items-center mb-3!">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Total
								</p>
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									{form.total}
								</p>
							</div>
							<button
								className="buy-cta"
								disabled={!form.amount || !form.price}
							>
								Buy {slicedCurrentMarketPair[0].toUpperCase()}
							</button>
						</div>
						<div>
							<div className="flex justify-between items-center! mt-5!">
								<div className="flex flex-col gap-2">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Total account value
									</p>
								</div>

								<div>
									<Select
										value={selectedCurrency}
										onValueChange={handleCurrencyChange}
									>
										<SelectTrigger className="text-[#A7B1BC]! py-0! font-[500]! text-[14px]! focus-visible:ring-0! ring-0! outline-none! border-0! w-auto! h-full! px-1.5!  bg-inherit! rounded-[4px]! flex! items-center! justify-center!">
											<p>{selectedCurrency}</p>
										</SelectTrigger>
										<SelectContent className="bg-[#353945] px-0! border-1 rounded-[24px]! border-[#373B3F]! py-0! ml-10! w-[220px]!">
											<SelectItem
												value="NGN"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/nigerian-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="nigerian flag"
													/>
												</div>
												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														Nigerian Naira
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														NGN
													</p>
												</div>
											</SelectItem>

											<SelectItem
												value="GBP"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/british-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="british flag"
													/>
												</div>
												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														British Pounds
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														GBP
													</p>
												</div>
											</SelectItem>

											<SelectItem
												value="USD"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/american-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="american flag"
													/>
												</div>

												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														US Dollars
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														USD
													</p>
												</div>
											</SelectItem>

											<SelectItem
												value="EUR"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/european-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="european flag"
													/>
												</div>

												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														European euros
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														EUR
													</p>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<p className="text-white font-[700] text-[15px] inline-flex items-center">
								0.00
							</p>
						</div>

						<div className="flex items-center! mt-5!">
							<div className="flex flex-col w-[65%]">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Open Orders
								</p>
								<p className="text-white font-[700] text-[15px] inline-flex items-center">
									0.00
								</p>
							</div>
							<div className="flex flex-col w-[35%]">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Available
								</p>
								<p className="text-white font-[700] text-[15px] inline-flex items-center">
									0.00
								</p>
							</div>
						</div>
					</div>

					<button className="rounded-[8px]! mt-6! px-5! py-4! bg-[#2764FF]! font-[400] text-white!">
						Deposit
					</button>
				</Tabs.Content>
				<Tabs.Content className="TabsContent" value="sell">
					<div>
						<div className="flex gap-3 items-center justify-between">
							{buyType.map((type) => (
								<button
									key={type}
									className={clsx(
										"text-[15px]! transition font-[500]! outline-0! border-0! cursor-pointer! rounded-full! px-3.5! py-1.5!",
										{
											"bg-[#353945]! text-white!":
												selectedBuyType === type,
										},
										{
											"bg-none! text-[#A7B1BC]!":
												selectedBuyType !== type,
										}
									)}
									onClick={() => setSelectedBuyType(type)}
								>
									{type}
								</button>
							))}
						</div>
						{selectedBuyType.toLowerCase() === "limit" && (
							<div className="w-full flex-col gap-4 mt-4! rounded-[8px!]">
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Limit Price{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											placeholder="0.00"
											className="border-0! placeholder:text-[#A7B1BC]! text-right! flex-1! pr-2! text-[#A7B1BC]! font-[500]! text-[14px]!"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Amount{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											className="border-0! text-right! flex-1! pr-2! placeholder:text-[#A7B1BC]! text-[#A7B1BC]! font-[500]! text-[14px]!"
											placeholder="0.00"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Type{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="text-[#A7B1BC]! font-[500]! text-[14px]! focus-visible:ring-0! ring-0! outline-none! border-0! w-auto! h-full! px-1.5!  bg-inherit! rounded-[4px]! flex! items-center! justify-center!">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="bg-[#353945] px-0! border-1 rounded-[12px]! border-[#373B3F]! py-0! ml-10! w-[200px]!">
												<SelectItem
													value="	Fill or Kill"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till cancelled
												</SelectItem>

												<SelectItem
													value="Good till date"
													className="rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till date
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						)}
						{selectedBuyType.toLowerCase() === "market" && (
							<div className="mt-4! mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Amount{" "}
									<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
								</p>
								<div className="flex! items-center!">
									<input
										type="text"
										className="border-0! text-right! flex-1! pr-2! placeholder:text-[#A7B1BC]! text-[#A7B1BC]! font-[500]! text-[14px]!"
										placeholder="0.00"
										value={form.amount}
										onChange={(e) =>
											handleAmountChange(e.target.value)
										}
									/>
									<p className="text-[#A7B1BC] font-[500] text-[14px]">
										{slicedCurrentMarketPair[1].toUpperCase()}
									</p>
								</div>
							</div>
						)}

						{selectedBuyType.toLowerCase() === "stop-limit" && (
							<div className="w-full flex-col gap-4 mt-4! rounded-[8px!]">
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Limit Price{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											placeholder="0.00"
											className="border-0! placeholder:text-[#A7B1BC]! text-right! flex-1! pr-2! text-[#A7B1BC]! font-[500]! text-[14px]!"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Amount{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div className="flex! items-center!">
										<input
											type="text"
											className="border-0! text-right! flex-1! pr-2! placeholder:text-[#A7B1BC]! text-[#A7B1BC]! font-[500]! text-[14px]!"
											placeholder="0.00"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="text-[#A7B1BC] font-[500] text-[14px]">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>
								<div className="mb-4! border-[1px] rounded-[8px]! py-4! border-[#373B3F] w-full! px-4! flex! items-center! justify-between!">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Type{" "}
										<Info className="size-3 text-[#A7B1BC] ml-2! mt-1!" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="text-[#A7B1BC]! font-[500]! text-[14px]! focus-visible:ring-0! ring-0! outline-none! border-0! w-auto! h-full! px-1.5!  bg-inherit! rounded-[4px]! flex! items-center! justify-center!">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="bg-[#353945] px-0! border-1 rounded-[12px]! border-[#373B3F]! py-0! ml-10! w-[200px]!">
												<SelectItem
													value="	Fill or Kill"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className=" rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till cancelled
												</SelectItem>

												<SelectItem
													value="Good till date"
													className="rounded-[0px]! py-4! px-4! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
												>
													Good till date
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						)}

						<div>
							<div className="flex justify-between items-center mb-3!">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Total
								</p>
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									{form.total}
								</p>
							</div>
							<button
								className="buy-cta"
								disabled={!form.amount || !form.price}
							>
								Sell {slicedCurrentMarketPair[0].toUpperCase()}
							</button>
						</div>
						<div>
							<div className="flex justify-between items-center! mt-5!">
								<div className="flex flex-col gap-2">
									<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
										Total account value
									</p>
								</div>

								<div>
									<Select
										value={selectedCurrency}
										onValueChange={handleCurrencyChange}
									>
										<SelectTrigger className="text-[#A7B1BC]! py-0! font-[500]! text-[14px]! focus-visible:ring-0! ring-0! outline-none! border-0! w-auto! h-full! px-1.5!  bg-inherit! rounded-[4px]! flex! items-center! justify-center!">
											<p>{selectedCurrency}</p>
										</SelectTrigger>
										<SelectContent className="bg-[#353945] px-0! border-1 rounded-[24px]! border-[#373B3F]! py-0! ml-10! w-[220px]!">
											<SelectItem
												value="NGN"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/nigerian-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="nigerian flag"
													/>
												</div>
												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														Nigerian Naira
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														NGN
													</p>
												</div>
											</SelectItem>

											<SelectItem
												value="GBP"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/british-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="british flag"
													/>
												</div>
												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														British Pounds
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														GBP
													</p>
												</div>
											</SelectItem>

											<SelectItem
												value="USD"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/american-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="american flag"
													/>
												</div>

												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														US Dollars
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														USD
													</p>
												</div>
											</SelectItem>

											<SelectItem
												value="EUR"
												className="flex! items-center! rounded-[0px]! py-4! px-2.5! bg-[#1C2127]! hover:bg-[#252A30]! text-white!"
											>
												<div>
													<img
														src="./src/assets/european-flag.png"
														className="w-[32px] h-[32px] max-w-full"
														alt="european flag"
													/>
												</div>

												<div>
													<h1 className="text-[14px]! font-[700] text-white">
														European euros
													</h1>
													<p className="text-[13px]! font-[500] text-[#A7B1BC] mt-1.5!">
														EUR
													</p>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<p className="text-white font-[700] text-[15px] inline-flex items-center">
								0.00
							</p>
						</div>

						<div className="flex items-center! mt-5!">
							<div className="flex flex-col w-[65%]">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Open Orders
								</p>
								<p className="text-white font-[700] text-[15px] inline-flex items-center">
									0.00
								</p>
							</div>
							<div className="flex flex-col w-[35%]">
								<p className="text-[#A7B1BC] font-[500] text-[14px] inline-flex items-center">
									Available
								</p>
								<p className="text-white font-[700] text-[15px] inline-flex items-center">
									0.00
								</p>
							</div>
						</div>
					</div>

					<button className="rounded-[8px]! mt-6! px-5! py-4! bg-[#2764FF]! font-[400] text-white!">
						Deposit
					</button>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
