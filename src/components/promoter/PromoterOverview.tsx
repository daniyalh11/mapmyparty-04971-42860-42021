import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp, Activity } from "lucide-react";

const PromoterOverview = () => {
  const stats = [
    {
      title: "Total Events",
      value: "28",
      change: "+12 this month",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Total Organizers",
      value: "45",
      change: "+8 this month",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Total Revenue",
      value: "₹2,48,560",
      change: "+24% from last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Promoted Events",
      value: "18",
      change: "64% of total",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Live Events",
      value: "5",
      change: "Active now",
      icon: Activity,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-elegant transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromoterOverview;
