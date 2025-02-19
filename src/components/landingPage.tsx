"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  const options = [
    { title: "Dashboard", route: "/dashboard" },
    { title: "Add Transaction", route: "/add-transaction" },
    { title: "Transaction List", route: "/transactions" },
    { title: "Monthly Summary", route: "/monthly-summary" },
    { title: "Category Chart", route: "/category-chart" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {options.map((option) => (
        <Card key={option.route} className="cursor-pointer hover:shadow-lg">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-bold">{option.title}</h2>
            <Button className="mt-4" onClick={() => router.push(option.route)}>
              Open
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
