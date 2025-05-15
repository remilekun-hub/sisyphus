import type { Order } from "@/types";
import React from "react";

export default function OrderBid({ percentage, price, amount, total }: Order) {
	return (
		<tr
			className="orderbook-buy-data"
			style={
				{
					"--width": `${percentage}%`,
				} as React.CSSProperties
			}
		>
			<td className="text-error">{price.toFixed(2)}</td>
			<td>{amount}</td>
			<td>{total.toFixed(2)}</td>
		</tr>
	);
}
