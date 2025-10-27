import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/hooks/useEvents";
import eventMusic from "@/assets/event-music.jpg";
import eventConference from "@/assets/event-conference.jpg";
import eventFood from "@/assets/event-food.jpg";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const { getPublishedEvents } = useEvents();

  const defaultEvents = [
    {
      id: "1",
      title: "Summer Music Festival 2024",
      date: "July 15, 2024",
      location: "Central Park, New York",
      image: eventMusic,
      category: "Music",
      attendees: 5000,
      price: "From $49",
    },
    {
      id: "2",
      title: "Tech Innovation Conference",
      date: "August 22, 2024",
      location: "Convention Center, San Francisco",
      image: eventConference,
      category: "Conference",
      attendees: 2000,
      price: "From $199",
    },
    {
      id: "3",
      title: "Food & Wine Tasting Festival",
      date: "September 10, 2024",
      location: "Riverside Park, Chicago",
      image: eventFood,
      category: "Food & Drink",
      attendees: 3500,
      price: "From $75",
    },
    {
      id: "4",
      title: "Electronic Music Night",
      date: "July 20, 2024",
      location: "Arena Stadium, Los Angeles",
      image: eventMusic,
      category: "Music",
      attendees: 8000,
      price: "From $65",
    },
    {
      id: "5",
      title: "Business Leadership Summit",
      date: "August 5, 2024",
      location: "Grand Hotel, Boston",
      image: eventConference,
      category: "Conference",
      attendees: 1500,
      price: "From $299",
    },
    {
      id: "6",
      title: "Street Food Festival",
      date: "September 18, 2024",
      location: "Downtown Square, Austin",
      image: eventFood,
      category: "Food & Drink",
      attendees: 4000,
      price: "From $35",
    },
  ];

  // Combine default events with user-created published events
  const allEvents = useMemo(() => {
    const userEvents = getPublishedEvents();
    return [...userEvents, ...defaultEvents];
  }, []);

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "all" || 
        event.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [allEvents, searchQuery, category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-12">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Browse Events
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Discover amazing events happening near you
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-background sticky top-16 z-40">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="food">Food & Drink</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="arts">Arts & Culture</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="md:w-auto">
                Clear Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredEvents.length} events
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Events
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
