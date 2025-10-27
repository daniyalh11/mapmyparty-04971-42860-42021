import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, Users, DollarSign, TrendingUp, MoreVertical, Search, Filter, BarChart3, UserPlus, Mail, Settings } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import eventMusic from "@/assets/event-music.jpg";
import eventConference from "@/assets/event-conference.jpg";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { events } = useEvents();
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [analyticsFilter, setAnalyticsFilter] = useState("all");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("manager");
  
  const stats = [
    {
      title: "Total Events",
      value: events.length.toString(),
      change: "+2 this month",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Total Attendees",
      value: "15,420",
      change: "+12% from last month",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Revenue",
      value: "₹48,560",
      change: "+18% from last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Ticket Sales",
      value: "8,234",
      change: "+23% from last month",
      icon: TrendingUp,
      color: "text-blue-600",
    },
  ];

  const teamMembers = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Manager", status: "active", eventsManaged: 5 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Coordinator", status: "active", eventsManaged: 3 },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "Manager", status: "pending", eventsManaged: 0 },
  ];

  const sampleEvents = [
    {
      id: "1",
      title: "Summer Music Festival 2024",
      date: "July 15, 2024",
      status: "published",
      category: "Music",
      ticketsSold: 4850,
      totalTickets: 5000,
      revenue: 28500,
      image: eventMusic,
    },
    {
      id: "2",
      title: "Tech Innovation Conference",
      date: "August 22, 2024",
      status: "published",
      category: "Conference",
      ticketsSold: 1850,
      totalTickets: 2000,
      revenue: 19960,
      image: eventConference,
    },
    {
      id: "3",
      title: "Winter Gala Night",
      date: "December 10, 2024",
      status: "draft",
      category: "Arts",
      ticketsSold: 0,
      totalTickets: 500,
      revenue: 0,
      image: eventMusic,
    },
  ];

  const allEvents = [...sampleEvents, ...events.map((e, i) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    status: e.status,
    category: e.category,
    ticketsSold: 0,
    totalTickets: 0,
    revenue: 0,
    image: e.image,
  }))];

  const filteredEvents = allEvents.filter((event) => {
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const handleInviteMember = () => {
    if (!newMemberEmail) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Invitation sent to ${newMemberEmail}`);
    setNewMemberEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated userRole="organizer" />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Organizer Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Manage your events and track performance
              </p>
            </div>
            <Link to="/organizer/create-event">
              <Button variant="accent" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </Link>
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

          {/* Main Tabs */}
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="events" className="gap-2">
                <Calendar className="w-4 h-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Invite Team
              </TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle>Your Events</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-3">
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
                        <Link key={event.id} to={`/events/${event.id}`}>
                          <Card className="hover:shadow-elegant transition-all hover:-translate-y-1 cursor-pointer">
                            <div className="md:flex">
                              <div className="md:w-48 h-32 md:h-auto relative overflow-hidden">
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover"
                                />
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
                                    <p className="text-sm text-muted-foreground">
                                      {event.date}
                                    </p>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem 
                                        onClick={(e) => {
                                          e.preventDefault();
                                          navigate(`/organizer/create-event?edit=${event.id}`);
                                        }}
                                      >
                                        Edit Event
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={(e) => {
                                          e.preventDefault();
                                          navigate(`/events/${event.id}`);
                                        }}
                                      >
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                      <DropdownMenuItem className="text-destructive">
                                        Delete
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
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Analytics Overview</h2>
                  <p className="text-muted-foreground">Track your event performance</p>
                </div>
                <Select value={analyticsFilter} onValueChange={setAnalyticsFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <Card key={stat.title} className="hover:shadow-md transition-shadow">
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

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={event.image} alt={event.title} className="w-16 h-16 rounded object-cover" />
                          <div>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.ticketsSold} tickets sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">₹{event.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{Math.round((event.ticketsSold / event.totalTickets) * 100)}% capacity</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invite Team Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="coordinator">Coordinator</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleInviteMember} className="sm:w-auto">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Invite
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Managers can create and edit events. Coordinators can view and manage attendees. Viewers have read-only access.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={member.status === "active" ? "default" : "secondary"}>
                              {member.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {member.eventsManaged} events
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem>View Activity</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrganizerDashboard;
