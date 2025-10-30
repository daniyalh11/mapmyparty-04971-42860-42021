import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, DollarSign, TrendingUp, Search, Eye, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import eventMusic from "@/assets/event-music.jpg";
import eventConference from "@/assets/event-conference.jpg";
import eventFood from "@/assets/event-food.jpg";
import { useEvents } from "@/hooks/useEvents";

const PromoterDashboard = () => {
  const navigate = useNavigate();
  const { events } = useEvents();
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
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
  ];

  const allOrganizerEvents = [
    {
      id: "1",
      title: "Summer Music Festival 2024",
      organizer: "ABC Events",
      date: "July 15, 2024",
      status: "published",
      category: "Music",
      ticketsSold: 4850,
      totalTickets: 5000,
      revenue: 28500,
      image: eventMusic,
      promoted: true,
    },
    {
      id: "2",
      title: "Tech Innovation Conference",
      organizer: "TechCorp",
      date: "August 22, 2024",
      status: "published",
      category: "Conference",
      ticketsSold: 1850,
      totalTickets: 2000,
      revenue: 19960,
      image: eventConference,
      promoted: false,
    },
    {
      id: "3",
      title: "Food & Wine Festival",
      organizer: "Culinary Dreams",
      date: "September 10, 2024",
      status: "published",
      category: "Food",
      ticketsSold: 3200,
      totalTickets: 4000,
      revenue: 45000,
      image: eventFood,
      promoted: true,
    },
    {
      id: "4",
      title: "Winter Gala Night",
      organizer: "Elite Events",
      date: "December 10, 2024",
      status: "draft",
      category: "Arts",
      ticketsSold: 0,
      totalTickets: 500,
      revenue: 0,
      image: eventMusic,
      promoted: false,
    },
    ...events.map((e) => ({
      id: e.id,
      title: e.title,
      organizer: "EventHub Organizer",
      date: e.date,
      status: e.status,
      category: e.category,
      ticketsSold: 0,
      totalTickets: 0,
      revenue: 0,
      image: e.image,
      promoted: false,
    })),
  ];

  const filteredEvents = allOrganizerEvents.filter((event) => {
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated userRole="promoter" />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Promoter Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Manage and promote events from all organizers
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
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

          {/* Events Management */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>All Events</CardTitle>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events or organizers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Music">Music</SelectItem>
                      <SelectItem value="Conference">Conference</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No events found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-elegant transition-all hover:-translate-y-1">
                      <div className="md:flex">
                        <div className="md:w-48 h-32 md:h-auto relative overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          {event.promoted && (
                            <Badge className="absolute top-2 left-2 bg-accent">
                              Promoted
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold">
                                  {event.title}
                                </h3>
                                <Badge
                                  variant={
                                    event.status === "published"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {event.status}
                                </Badge>
                                <Badge variant="outline">{event.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Organizer: <span className="font-medium">{event.organizer}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {event.date}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  onClick={() => navigate(`/events/${event.id}`)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {event.promoted ? "Remove Promotion" : "Promote Event"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Manage Visibility
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Tickets Sold
                              </p>
                              <p className="text-lg font-semibold">
                                {event.ticketsSold} / {event.totalTickets}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Revenue
                              </p>
                              <p className="text-lg font-semibold text-primary">
                                ₹{event.revenue.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Capacity
                              </p>
                              <p className="text-lg font-semibold">
                                {event.totalTickets > 0 
                                  ? Math.round((event.ticketsSold / event.totalTickets) * 100)
                                  : 0}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromoterDashboard;
