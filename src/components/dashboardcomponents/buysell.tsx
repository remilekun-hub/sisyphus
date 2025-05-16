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
						<div className="buy-type-wrapper">
							{buyType.map((type) => (
								<button
									key={type}
									className={`buy-type-button ${
										selectedBuyType === type
											? "buy-type-selected"
											: "buy-type-unselected"
									}`}
									onClick={() => setSelectedBuyType(type)}
								>
									{type}
								</button>
							))}
						</div>

						{selectedBuyType.toLowerCase() === "limit" && (
							<div className="limit-order-wrapper">
								<div className="limit-input-row">
									<p className="limit-label">
										Limit Price{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Amount{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Type{" "}
										<Info className="limit-info-icon" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="limit-select-trigger">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="limit-select-content">
												<SelectItem
													value="Fill or Kill"
													className="limit-select-item"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className="limit-select-item"
												>
													Good till cancelled
												</SelectItem>
												<SelectItem
													value="Good till date"
													className="limit-select-item"
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
							<div className="limit-input-row mt-4!">
								<p className="limit-label">
									Amount <Info className="limit-info-icon" />
								</p>
								<div className="limit-input-group">
									<input
										type="text"
										placeholder="0.00"
										className="limit-input"
										value={form.amount}
										onChange={(e) =>
											handleAmountChange(e.target.value)
										}
									/>
									<p className="limit-currency">
										{slicedCurrentMarketPair[0].toUpperCase()}
									</p>
								</div>
							</div>
						)}

						{selectedBuyType.toLowerCase() === "stop-limit" && (
							<div className="limit-order-wrapper">
								<div className="limit-input-row">
									<p className="limit-label">
										Limit Price{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Amount{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Type{" "}
										<Info className="limit-info-icon" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="limit-select-trigger">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="limit-select-content">
												<SelectItem
													value="Fill or Kill"
													className="limit-select-item"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className="limit-select-item"
												>
													Good till cancelled
												</SelectItem>
												<SelectItem
													value="Good till date"
													className="limit-select-item"
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
							<div className="total-row">
								<p className="label">Total</p>
								<p className="label">{form.total}</p>
							</div>
							<button
								className="buy-cta"
								disabled={!form.amount || !form.price}
							>
								Buy {slicedCurrentMarketPair[0].toUpperCase()}
							</button>
						</div>
						<div>
							<div className="account-row">
								<div className="account-label">
									<p className="label">Total account value</p>
								</div>

								<div>
									<Select
										value={selectedCurrency}
										onValueChange={handleCurrencyChange}
									>
										<SelectTrigger className="select-trigger">
											<p>{selectedCurrency}</p>
										</SelectTrigger>
										<SelectContent className="select-content">
											<SelectItem
												value="NGN"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/nigerian-flag.png"
														className="flag-icon"
														alt="nigerian flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														Nigerian Naira
													</h1>
													<p className="currency-code">
														NGN
													</p>
												</div>
											</SelectItem>
											<SelectItem
												value="GBP"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/british-flag.png"
														className="flag-icon"
														alt="british flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														British Pounds
													</h1>
													<p className="currency-code">
														GBP
													</p>
												</div>
											</SelectItem>
											<SelectItem
												value="USD"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/american-flag.png"
														className="flag-icon"
														alt="american flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														US Dollars
													</h1>
													<p className="currency-code">
														USD
													</p>
												</div>
											</SelectItem>
											<SelectItem
												value="EUR"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/european-flag.png"
														className="flag-icon"
														alt="european flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														European Euros
													</h1>
													<p className="currency-code">
														EUR
													</p>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<p className="balance">0.00</p>
						</div>
					</div>

					<div className="orders-row">
						<div className="order-col">
							<p className="label">Open Orders</p>
							<p className="balance">0.00</p>
						</div>
						<div className="order-col">
							<p className="label">Available</p>
							<p className="balance">0.00</p>
						</div>
					</div>

					<button className="deposit-btn">Deposit</button>
				</Tabs.Content>
				<Tabs.Content className="TabsContent" value="sell">
					<div>
						<div className="buy-type-wrapper">
							{buyType.map((type) => (
								<button
									key={type}
									className={`buy-type-button ${
										selectedBuyType === type
											? "buy-type-selected"
											: "buy-type-unselected"
									}`}
									onClick={() => setSelectedBuyType(type)}
								>
									{type}
								</button>
							))}
						</div>

						{selectedBuyType.toLowerCase() === "limit" && (
							<div className="limit-order-wrapper">
								<div className="limit-input-row">
									<p className="limit-label">
										Limit Price{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Amount{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Type{" "}
										<Info className="limit-info-icon" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="limit-select-trigger">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="limit-select-content">
												<SelectItem
													value="Fill or Kill"
													className="limit-select-item"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className="limit-select-item"
												>
													Good till cancelled
												</SelectItem>
												<SelectItem
													value="Good till date"
													className="limit-select-item"
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
							<div className="limit-input-row mt-4!">
								<p className="limit-label">
									Amount <Info className="limit-info-icon" />
								</p>
								<div className="limit-input-group">
									<input
										type="text"
										placeholder="0.00"
										className="limit-input"
										value={form.amount}
										onChange={(e) =>
											handleAmountChange(e.target.value)
										}
									/>
									<p className="limit-currency">
										{slicedCurrentMarketPair[0].toUpperCase()}
									</p>
								</div>
							</div>
						)}

						{selectedBuyType.toLowerCase() === "stop-limit" && (
							<div className="limit-order-wrapper">
								<div className="limit-input-row">
									<p className="limit-label">
										Limit Price{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.price}
											onChange={(e) =>
												handlePriceChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[1].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Amount{" "}
										<Info className="limit-info-icon" />
									</p>
									<div className="limit-input-group">
										<input
											type="text"
											placeholder="0.00"
											className="limit-input"
											value={form.amount}
											onChange={(e) =>
												handleAmountChange(
													e.target.value
												)
											}
										/>
										<p className="limit-currency">
											{slicedCurrentMarketPair[0].toUpperCase()}
										</p>
									</div>
								</div>

								<div className="limit-input-row">
									<p className="limit-label">
										Type{" "}
										<Info className="limit-info-icon" />
									</p>
									<div>
										<Select>
											<SelectTrigger className="limit-select-trigger">
												<SelectValue placeholder="Good till cancelled" />
											</SelectTrigger>
											<SelectContent className="limit-select-content">
												<SelectItem
													value="Fill or Kill"
													className="limit-select-item"
												>
													Fill or Kill
												</SelectItem>
												<SelectItem
													value="Good till cancelled"
													className="limit-select-item"
												>
													Good till cancelled
												</SelectItem>
												<SelectItem
													value="Good till date"
													className="limit-select-item"
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
							<div className="total-row">
								<p className="label">Total</p>
								<p className="label">{form.total}</p>
							</div>
							<button
								className="buy-cta"
								disabled={!form.amount || !form.price}
							>
								Sell {slicedCurrentMarketPair[0].toUpperCase()}
							</button>
						</div>
						<div>
							<div className="account-row">
								<div className="account-label">
									<p className="label">Total account value</p>
								</div>

								<div>
									<Select
										value={selectedCurrency}
										onValueChange={handleCurrencyChange}
									>
										<SelectTrigger className="select-trigger">
											<p>{selectedCurrency}</p>
										</SelectTrigger>
										<SelectContent className="select-content">
											<SelectItem
												value="NGN"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/nigerian-flag.png"
														className="flag-icon"
														alt="nigerian flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														Nigerian Naira
													</h1>
													<p className="currency-code">
														NGN
													</p>
												</div>
											</SelectItem>
											<SelectItem
												value="GBP"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/british-flag.png"
														className="flag-icon"
														alt="british flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														British Pounds
													</h1>
													<p className="currency-code">
														GBP
													</p>
												</div>
											</SelectItem>
											<SelectItem
												value="USD"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/american-flag.png"
														className="flag-icon"
														alt="american flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														US Dollars
													</h1>
													<p className="currency-code">
														USD
													</p>
												</div>
											</SelectItem>
											<SelectItem
												value="EUR"
												className="select-item"
											>
												<div>
													<img
														src="./src/assets/european-flag.png"
														className="flag-icon"
														alt="european flag"
													/>
												</div>
												<div>
													<h1 className="currency-name">
														European Euros
													</h1>
													<p className="currency-code">
														EUR
													</p>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<p className="balance">0.00</p>
						</div>
					</div>

					<div className="orders-row">
						<div className="order-col">
							<p className="label">Open Orders</p>
							<p className="balance">0.00</p>
						</div>
						<div className="order-col">
							<p className="label">Available</p>
							<p className="balance">0.00</p>
						</div>
					</div>

					<button className="deposit-btn">Deposit</button>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
