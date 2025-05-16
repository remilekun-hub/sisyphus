import "../../styles/largeorderbook.css";
import { Tabs } from "radix-ui";

export default function LargeOrderBook() {
	return (
		<div className="large-orderbook-container">
			<Tabs.Root className="TabsRoot" defaultValue="openorders">
				<Tabs.List
					className="TabsList"
					aria-label="Manage your account"
				>
					<Tabs.Trigger className="TabsTrigger" value="openorders">
						Open Orders
					</Tabs.Trigger>
					<Tabs.Trigger className="TabsTrigger" value="positions">
						Positions
					</Tabs.Trigger>
					<Tabs.Trigger className="TabsTrigger" value="orderhistory">
						Order History
					</Tabs.Trigger>
					<Tabs.Trigger className="TabsTrigger" value="tradehistory">
						Trade History
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content className="TabsContent h-full" value="openorders">
					<div className="no-orders-container">
						<div className="no-orders-content">
							<h1 className="no-orders-title">No Open Orders</h1>
							<p className="no-orders-subtext">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing
							</p>
						</div>
					</div>
				</Tabs.Content>
				<Tabs.Content className="TabsContent" value="positions">
					<div className="no-orders-container">
						<div className="no-orders-content">
							<h1 className="no-orders-title">No Open Orders</h1>
							<p className="no-orders-subtext">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing
							</p>
						</div>
					</div>
				</Tabs.Content>
				<Tabs.Content className="TabsContent" value="orderhistory">
					<div className="no-orders-container">
						<div className="no-orders-content">
							<h1 className="no-orders-title">No Open Orders</h1>
							<p className="no-orders-subtext">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing
							</p>
						</div>
					</div>
				</Tabs.Content>
        <Tabs.Content className="TabsContent" value="tradehistory">
					<div className="no-orders-container">
						<div className="no-orders-content">
							<h1 className="no-orders-title">No Open Orders</h1>
							<p className="no-orders-subtext">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing
							</p>
						</div>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
