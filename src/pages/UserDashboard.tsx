import { useState } from "react";
import { Ticket, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TicketModal from "@/components/TicketModal";
import eventMusic from "@/assets/event-music.jpg";
import eventConference from "@/assets/event-conference.jpg";

const UserDashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  
  // Mock user tickets
  const userTickets = [
    {
      id: "1",
      eventId: "1",
      eventTitle: "Summer Music Festival 2024",
      eventDate: "July 15, 2024",
      eventTime: "6:00 PM",
      location: "Central Park, New York",
      image: eventMusic,
      ticketType: "General Admission",
      quantity: 2,
      totalPrice: 98,
      bookingDate: "June 1, 2024",
      status: "confirmed",
    },
    {
      id: "2",
      eventId: "2",
      eventTitle: "Tech Innovation Conference",
      eventDate: "August 22, 2024",
      eventTime: "9:00 AM",
      location: "Convention Center, San Francisco",
      image: eventConference,
      ticketType: "VIP Experience",
      quantity: 1,
      totalPrice: 299,
      bookingDate: "June 5, 2024",
      status: "confirmed",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated userRole="user" />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Tickets</h1>
            <p className="text-muted-foreground text-lg">
              View and manage your event bookings
            </p>
          </div>

          {userTickets.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring events and book your first ticket!
                </p>
                <Button variant="accent">Browse Events</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src={ticket.image}
                        alt={ticket.eventTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge className="mb-2">
                            {ticket.status === "confirmed" ? "Confirmed" : "Pending"}
                          </Badge>
                          <h3 className="text-2xl font-bold mb-2">
                            {ticket.eventTitle}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${ticket.totalPrice}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {ticket.quantity} {ticket.quantity > 1 ? "tickets" : "ticket"}
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {ticket.eventDate} at {ticket.eventTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{ticket.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="w-4 h-4" />
                          <span>{ticket.ticketType}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          variant="default"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          View Ticket
                        </Button>
                        <Button 
                          variant="outline"
                          asChild
                        >
                          <Link to={`/events/${ticket.eventId}`}>Event Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Ticket Modal */}
          {selectedTicket && (
            <TicketModal
              isOpen={!!selectedTicket}
              onClose={() => setSelectedTicket(null)}
              ticket={selectedTicket}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
