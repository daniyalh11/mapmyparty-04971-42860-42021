import { Calendar, MapPin, Mail, Globe, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EventDescriptionProps {
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  email?: string;
  website?: string;
  priceRange: string;
}

const EventDescription = ({
  description,
  date,
  time,
  venue,
  address,
  email,
  website,
  priceRange,
}: EventDescriptionProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column - Description */}
      <div className="lg:col-span-2 space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About this Event
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>

      {/* Right Column - Quick Info Card */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24 shadow-elegant animate-fade-in border-2 border-primary/10">
          <CardContent className="p-6 space-y-5">
            <h3 className="text-xl font-bold mb-4">Event Details</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium">{date}</p>
                  <p className="text-sm text-muted-foreground">{time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{venue}</p>
                  <p className="text-sm text-muted-foreground">{address}</p>
                </div>
              </div>

              {email && (
                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Contact</p>
                    <a
                      href={`mailto:${email}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {website && (
                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Website</p>
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-accent transition-colors break-all"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground">Price Range</p>
                  <p className="font-medium text-xl">{priceRange}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDescription;
