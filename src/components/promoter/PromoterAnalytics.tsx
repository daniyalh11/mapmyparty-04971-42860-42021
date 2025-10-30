import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

const PromoterAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState("week");

  const weeklyData = [
    { name: "Mon", sales: 12000, tickets: 45 },
    { name: "Tue", sales: 19000, tickets: 68 },
    { name: "Wed", sales: 15000, tickets: 52 },
    { name: "Thu", sales: 25000, tickets: 89 },
    { name: "Fri", sales: 32000, tickets: 112 },
    { name: "Sat", sales: 48000, tickets: 165 },
    { name: "Sun", sales: 41000, tickets: 142 },
  ];

  const monthlyData = [
    { name: "Week 1", sales: 85000, tickets: 312 },
    { name: "Week 2", sales: 92000, tickets: 345 },
    { name: "Week 3", sales: 78000, tickets: 289 },
    { name: "Week 4", sales: 105000, tickets: 398 },
  ];

  const data = timeFrame === "week" ? weeklyData : monthlyData;

  const categoryData = [
    { name: "Music", events: 12, revenue: 125000 },
    { name: "Conference", events: 8, revenue: 95000 },
    { name: "Food", events: 5, revenue: 68000 },
    { name: "Arts", events: 3, revenue: 42000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Sales (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="tickets" 
                  fill="hsl(var(--accent))" 
                  name="Tickets"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="events" 
                fill="hsl(var(--primary))" 
                name="Events"
              />
              <Bar 
                dataKey="revenue" 
                fill="hsl(var(--accent))" 
                name="Revenue (₹)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromoterAnalytics;
