import { useState } from "react";
import { Ticket, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  maxPerOrder: number;
  soldOut?: boolean;
}

interface TicketSectionProps {
  tickets: TicketType[];
}

const TicketSection = ({ tickets }: TicketSectionProps) => {
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateTicketQuantity = (ticketId: string, quantity: number) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, quantity),
    }));
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = tickets.find((t) => t.id === ticketId);
      return total + (ticket?.price || 0) * quantity;
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Get Your Tickets
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <Card
            key={ticket.id}
            className={`group hover:shadow-elegant transition-all hover-scale ${
              ticket.soldOut ? "opacity-60" : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform">
                  <Ticket className="w-6 h-6 text-primary" />
                </div>
                {ticket.soldOut ? (
                  <Badge variant="secondary">Sold Out</Badge>
                ) : (
                  <Badge variant="default" className="bg-primary/10 text-primary">
                    {ticket.available} left
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold mb-2">{ticket.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                <div className="text-3xl font-bold text-primary">₹{ticket.price}</div>
              </div>

              {/* Actions */}
              {!ticket.soldOut && (
                <div className="space-y-2">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="accent" className="w-full" size="lg">
                        <ShoppingCart className="w-4 h-4" />
                        Book Now
                      </Button>
                    </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{ticket.name}</DialogTitle>
                      <DialogDescription>{ticket.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">₹{ticket.price}</span>
                        <Badge>{ticket.available} available</Badge>
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateTicketQuantity(
                              ticket.id,
                              (selectedTickets[ticket.id] || 0) - 1
                            )
                          }
                          disabled={!selectedTickets[ticket.id]}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-3xl font-bold min-w-[60px] text-center">
                          {selectedTickets[ticket.id] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateTicketQuantity(
                              ticket.id,
                              (selectedTickets[ticket.id] || 0) + 1
                            )
                          }
                          disabled={
                            (selectedTickets[ticket.id] || 0) >= ticket.maxPerOrder
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {selectedTickets[ticket.id] > 0 && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="flex justify-between text-lg">
                            <span>Subtotal</span>
                            <span className="font-bold">
                              ₹{ticket.price * (selectedTickets[ticket.id] || 0)}
                            </span>
                          </div>
                          <Button variant="accent" size="lg" className="w-full">
                            Proceed to Checkout
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.open(window.location.href, '_blank')}
                >
                  View Full Event Page
                </Button>
              </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicketSection;
