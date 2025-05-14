import "../../styles/orderbook.css";
import { Tabs } from "radix-ui";
import "react-dropdown/style.css";

export default function BuySell() {
	return (
		<div className="orderbook-container">
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
						buy
					</div>
				</Tabs.Content>
				<Tabs.Content className="TabsContent" value="sell">
					<h1>sell</h1>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
