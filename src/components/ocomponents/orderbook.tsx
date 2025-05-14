import "../../styles/orderbook.css";
import { Tabs } from "radix-ui";
import "react-dropdown/style.css";

export default function Orderbook() {
	const options = ["one", "two", "three"];
	const defaultOption = options[0];
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
					{/* <Dropdown className="react-dropdown"
						options={options}
						// onChange={this._onSelect}
						value={defaultOption}
						placeholder="Select an option"
					/>
					;
					<CustomSelect defaultValue="">
						<SelectItem value="1">Item 1</SelectItem>
						<SelectItem value="2">Item 2</SelectItem>
						<SelectItem value="3">Item 3</SelectItem>
					</CustomSelect> */}
				</div>
				<Tabs.Content className="TabsContent" value="orderbook">
					<div>
						<table>
							<tr className="table-header">
								<td>Price (USDT)</td>
								<td>Amount (BTC)</td>
								<td>Total</td>
							</tr>
							<tr className="orderbook-sell-data">
								<td className="text-error">35889.12</td>
								<td>0.998816</td>
								<td>28000.98</td>
							</tr>
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
