import React, { useState, useMemo, useCallback } from "react";
import useDebounce from "@/hooks/usedebounce";
import { FixedSizeList as List } from "react-window";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu"; // adjust this import based on your setup
import type { ExchangeListType } from "@/types";

const MarketDropdown = ({selectMarket}:{selectMarket:string, allMarkets: ExchangeListType[]}) => {
  const [query, setQuery] = useState("");

  // Debounced input handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      setQuery(value);
    }, 300),
    []
  );

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const filteredList:ExchangeListType[] = useMemo(() => {
    return allMarkets.filter((m) => {
      const name = `${m.baseAsset}-${m.quoteAsset}`.toLowerCase();
      return name.includes(query.toLowerCase());
    });
  }, [query, allMarkets]);

  const markets = useMemo(() => {
    // Create a unique list of market baseAssets for the toggle buttons
    return Array.from(new Set(allMarkets.map((m) => m.baseAsset)));
  }, [allMarkets]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">Open</button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[444px] h-[400px] border rounded-[8px] ml-[50px] dropdown-content p-4 bg-[#1a1a1a]">
        <p className="text-[16px] mb-3 font-[500] text-white">Select Market</p>

        <div className="flex w-full bg-[#20252B] h-[40px] mb-3">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search"
            className="w-full flex-1 border border-[#373B3F] rounded-[8px] h-full text-white pl-2 bg-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-3 border-y border-[var(--border-primary)] py-2">
          {markets.map((m) => (
            <button
              key={m}
              onClick={() => setSelectMarket(m)}
              className={clsx(
                "text-[15px] font-[500] outline-none border-none cursor-pointer rounded-full px-4 py-1.5",
                {
                  "bg-[#353945] text-white": selectMarket === m,
                  "bg-transparent text-[#A7B1BC]": selectMarket !== m,
                }
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <List
          height={250}
          itemCount={filteredList.length}
          itemSize={40}
          width={"100%"}
        >
          {({ index, style }) => {
            const d = filteredList[index];
            return (
              <DropdownMenuItem key={index} style={style}>
                <p className="uppercase text-[#A7B1BC] text-[15px] font-[400]">
                  {d.baseAsset} - {d.quoteAsset}
                </p>
              </DropdownMenuItem>
            );
          }}
        </List>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MarketDropdown;
