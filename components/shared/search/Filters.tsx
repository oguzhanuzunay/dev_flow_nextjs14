"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  placeHolder: string;
  filterList: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filters = ({
  placeHolder,
  filterList,
  otherClasses,
  containerClasses,
}: Props) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`background-light800_dark300 text-dark500_light700 body-regular light-border w-[180px] border px-5 py-2.5 ${otherClasses}`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeHolder} />
          </div>
        </SelectTrigger>

        <SelectContent className="background-light800_dark300 text-dark400_light700">
          <SelectGroup>
            {filterList.map((filter) => {
              return (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
