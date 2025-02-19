"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const options = [
    { title: "Dashboard", route: "/dashboard" },
    { title: "Transaction List", route: "/transactions" },
    { title: "Monthly Summary", route: "/monthly-summary" },
    { title: "Budget Coparison", route: "/budget" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Personal Finance Tracker</h1>
      
      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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

      {/* Dashboard Preview */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
      </div>
    </div>
  );
}
