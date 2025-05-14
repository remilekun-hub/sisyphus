import React from "react";
import Orderbook from "../components/ocomponents/orderbook";
import BuySell from "../components/ocomponents/buysell";

export default function Dashboardpage() {
	return (
		<div>
			<Orderbook />
			<BuySell />
		</div>
	);
}
