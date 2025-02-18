"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

const categories = ["Food", "Bills", "Entertainment", "Transportation", "Others"];

export default function CategorySelect({ onChange }: { onChange: (category: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Select onValueChange={(value) => { setSelectedCategory(value); onChange(value); }}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
