// hooks/useTicker24hr.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { base_url } from "@/constants";

export default function useTicker24hr(base: string, quote: string) {
	const symbol = `${base.toUpperCase()}${quote.toUpperCase()}`;

	return useQuery({
		queryKey: ["24hr-ticker", { base, quote }],
		queryFn: async () => {
			const { data } = await axios.get(
				`${base_url}/api/v3/ticker/24hr?symbol=${symbol}`
			);
			return data;
		},
		staleTime: 0,
	});
}
