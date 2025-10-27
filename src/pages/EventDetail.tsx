import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventHero from "@/components/event-detail/EventHero";
import EventDescription from "@/components/event-detail/EventDescription";
import EventGallery from "@/components/event-detail/EventGallery";
import EventSchedule from "@/components/event-detail/EventSchedule";
import TicketSection from "@/components/event-detail/TicketSection";
import EventLocation from "@/components/event-detail/EventLocation";
import OrganizerInfo from "@/components/event-detail/OrganizerInfo";
import FloatingCTA from "@/components/event-detail/FloatingCTA";
import eventMusic from "@/assets/event-music.jpg";
import eventConference from "@/assets/event-conference.jpg";
import eventFood from "@/assets/event-food.jpg";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock event data with additional fields
  const event = {
    id: "1",
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Central Park, New York",
    address: "Central Park, New York, NY 10024",
    venue: "Central Park Main Stage",
    phone: "+1 (555) 123-4567",
    email: "info@summerfest.com",
    website: "https://summerfest.com",
    image: eventMusic,
    gallery: [eventMusic, eventConference, eventFood],
    category: "Music",
    attendees: 5000,
    description: `Join us for an unforgettable evening of music under the stars! The Summer Music Festival 2024 brings together world-class artists and local talent for a spectacular show you won't want to miss.

Experience five hours of non-stop entertainment featuring multiple stages, food vendors, and interactive art installations. This year's lineup includes Grammy-winning artists and breakthrough performers across various genres.

Immerse yourself in a celebration of sound, art, and community. From indie rock to electronic beats, there's something for everyone at this year's festival.`,
    highlights: [
      "Multiple performance stages with diverse genres",
      "International food vendors and craft beverages",
      "Interactive art installations by local artists",
      "VIP lounge access with premium amenities (VIP tickets)",
      "Free parking and shuttle service available",
      "Professional photo booths and social media zones",
    ],
    schedule: [
      { 
        time: "6:00 PM", 
        activity: "Gates Open & Welcome Reception",
        description: "Check-in begins. Explore food vendors, art installations, and grab your festival merch."
      },
      { 
        time: "7:00 PM", 
        activity: "Opening Act - Local Bands",
        description: "Three talented local bands kick off the night with high-energy performances."
      },
      { 
        time: "8:30 PM", 
        activity: "Headliner Performance",
        description: "Main stage lights up with our Grammy-winning headliner for an unforgettable set."
      },
      { 
        time: "10:00 PM", 
        activity: "Special Guest Performance",
        description: "Surprise special guest takes the stage for an exclusive performance."
      },
      { 
        time: "11:00 PM", 
        activity: "Event Closes",
        description: "Festival concludes. Shuttle service available for 30 minutes after closing."
      },
    ],
    tickets: [
      {
        id: "general",
        name: "General Admission",
        price: 49,
        description: "Access to main event area and all performances",
        available: 500,
        maxPerOrder: 10,
      },
      {
        id: "vip",
        name: "VIP Experience",
        price: 149,
        description: "Premium viewing area, complimentary drinks, VIP lounge access",
        available: 100,
        maxPerOrder: 4,
      },
      {
        id: "early-bird",
        name: "Early Bird Special",
        price: 39,
        description: "Limited time offer - Same as General Admission",
        available: 0,
        maxPerOrder: 10,
        soldOut: true,
      },
    ],
    organizer: {
      name: "Music Events Co.",
      bio: "Premier event organizers bringing world-class entertainment to your city since 2010.",
      organizerId: "1",
    },
  };

  const scrollToLocation = () => {
    document.getElementById("location-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTickets = () => {
    document.getElementById("tickets-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = () => {
    // Share functionality handled in EventHero component
  };

  const priceRange = `$${Math.min(...event.tickets.filter(t => !t.soldOut).map(t => t.price))} - $${Math.max(...event.tickets.map(t => t.price))}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container pt-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Hero Section */}
        <EventHero
          title={event.title}
          date={event.date}
          location={event.location}
          image={event.image}
          onLocationClick={scrollToLocation}
        />

        {/* Main Content */}
        <div className="container py-16 space-y-24">
          {/* Description Section */}
          <EventDescription
            description={event.description}
            date={event.date}
            time={event.time}
            venue={event.venue}
            address={event.address}
            email={event.email}
            website={event.website}
            priceRange={priceRange}
          />

          {/* Gallery Section */}
          {event.gallery && event.gallery.length > 0 && (
            <EventGallery images={event.gallery} />
          )}

          {/* Schedule & Highlights */}
          <EventSchedule schedule={event.schedule} highlights={event.highlights} />

          {/* Tickets Section */}
          <div id="tickets-section">
            <TicketSection tickets={event.tickets} />
          </div>

          {/* Location Section */}
          <EventLocation
            venue={event.venue}
            address={event.address}
            phone={event.phone}
          />

          {/* Organizer Info */}
          <OrganizerInfo
            name={event.organizer.name}
            bio={event.organizer.bio}
            organizerId={event.organizer.organizerId}
          />
        </div>
      </main>

      {/* Floating CTA */}
      <FloatingCTA onBookClick={scrollToTickets} onShareClick={handleShare} />

      <Footer />
    </div>
  );
};

export default EventDetail;
