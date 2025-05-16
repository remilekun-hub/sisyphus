import "../../src/styles/dashboard.css";
import Orderbook from "../components/dashboardcomponents/orderbook";
import BuySell from "../components/dashboardcomponents/buysell";
import ChartNav from "@/components/dashboardcomponents/chartheader";
import Chart from "@/components/dashboardcomponents/chart";
import LargeOrderBook from "@/components/dashboardcomponents/largeorderbook";

export default function Dashboardpage() {
	return (
		<div className="dashboard-container">
			<ChartNav />
			<Chart />
			<Orderbook />
			<BuySell />
			<LargeOrderBook />
		</div>
	);
}
