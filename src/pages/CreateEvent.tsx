import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, Globe, Upload, X, ChevronLeft, Plus, MapPin, Ticket, Users, Table2, UsersRound } from "lucide-react";
import Header from "@/components/Header";
import { toast } from "sonner";
import { useEvents, Artist } from "@/hooks/useEvents";
import eventMusic from "@/assets/event-music.jpg";
import TicketTypeModal from "@/components/TicketTypeModal";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const CreateEvent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addEvent, events, updateEvent } = useEvents();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [eventType, setEventType] = useState("one-time");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<"vip-guest" | "standard" | "table" | "group-pass" | null>(null);
  const [savedTickets, setSavedTickets] = useState<any[]>([]);
  
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;
  
  // Form data
  const [eventTitle, setEventTitle] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [venueName, setVenueName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [venueContact, setVenueContact] = useState("");
  const [venueEmail, setVenueEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("one-time");
  const [ticketPrice, setTicketPrice] = useState("49");
  const [artists, setArtists] = useState<Artist[]>([{ name: "", photo: "", instagram: "", spotify: "" }]);

  const categoryHierarchy = {
    Music: ["Bollywood", "Hip Hop", "Electronic", "Melodic", "Live Music", "Metal", "Rap", "Music House", "Techno", "K-pop", "Hollywood", "POP", "Punjabi", "Disco", "Rock", "Afrobeat", "Dance Hall", "Thumri", "Bolly Tech"],
    Workshop: ["Sports", "Arts", "Meeting", "Conference", "Seminar", "Yoga", "Cooking", "Dance", "Self Help", "Consultation", "Corporate Event", "Communication"]
  };

  // Load event data if editing
  useEffect(() => {
    if (editId) {
      const eventToEdit = events.find(e => e.id === editId);
      if (eventToEdit) {
        setEventTitle(eventToEdit.title);
        setMainCategory(eventToEdit.category || '');
        setSelectedCategories([eventToEdit.subcategory || '']);
        setCoverImage(eventToEdit.image);
        
        // Parse location
        const locationParts = eventToEdit.location.split(', ');
        if (locationParts.length > 0) setVenueName(locationParts[0]);
        if (locationParts.length > 1) setCity(locationParts[1]);
        if (locationParts.length > 2) setState(locationParts[2]);
        
        // Parse price
        if (eventToEdit.price && eventToEdit.price.includes('₹')) {
          const price = eventToEdit.price.replace(/[^0-9]/g, '');
          setTicketPrice(price);
        }

        setArtists(eventToEdit.artists || [{ name: "", photo: "", instagram: "", spotify: "" }]);
      }
    }
  }, [editId, events]);

  const steps = [
    { number: 1, title: "Event Details" },
    { number: 2, title: "Date & Time" },
    { number: 3, title: "Tickets" },
    { number: 4, title: "Venue & Location" },
    { number: 5, title: "Add Artist" },
    { number: 6, title: "Additional Info" },
  ];

  const progress = (currentStep / 6) * 100;

  const nextStep = () => {
    // Validate required fields for each step
    if (currentStep === 1) {
      if (!eventTitle.trim()) {
        toast.error("Event title is required");
        return;
      }
      if (!mainCategory) {
        toast.error("Main category is required");
        return;
      }
      if (selectedCategories.length === 0) {
        toast.error("Subcategory is required");
        return;
      }
      if (!coverImage) {
        toast.error("Cover image is required");
        return;
      }
    }

    if (currentStep === 2) {
      if (!startDate) {
        toast.error("Starting date is required");
        return;
      }
      if (!startTime) {
        toast.error("Starting time is required");
        return;
      }
      if (!endDate) {
        toast.error("Ending date is required");
        return;
      }
      if (!endTime) {
        toast.error("Ending time is required");
        return;
      }
    }

    if (currentStep === 3) {
      if (savedTickets.length === 0) {
        toast.error("Please add at least one ticket type");
        return;
      }
    }

    if (currentStep === 4) {
      if (!venueName.trim()) {
        toast.error("Venue name is required");
        return;
      }
      if (!city.trim()) {
        toast.error("City is required");
        return;
      }
      if (!state.trim()) {
        toast.error("State is required");
        return;
      }
      if (!venueContact.trim()) {
        toast.error("Contact number is required");
        return;
      }
      if (!venueEmail.trim()) {
        toast.error("Email is required");
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(venueEmail)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    if (currentStep < 6) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleArtistPhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newArtists = [...artists];
        newArtists[index].photo = reader.result as string;
        setArtists(newArtists);
      };
      reader.readAsDataURL(file);
    }
  };

  const openTicketModal = (type: "vip-guest" | "standard" | "table" | "group-pass") => {
    setSelectedTicketType(type);
    setTicketModalOpen(true);
  };

  const handleSaveTicket = (ticketData: any) => {
    setSavedTickets([...savedTickets, ticketData]);
    toast.success("Ticket type added successfully!");
  };

  const handleSubmit = (isDraft: boolean) => {
    // Validation
    if (!eventTitle || !mainCategory || selectedCategories.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isEditMode && editId) {
      // Update existing event
      updateEvent(editId, {
        title: eventTitle,
        date: "Coming Soon",
        location: `${venueName || "TBD"}, ${city || "TBD"}${state ? `, ${state}` : ""}`,
        image: coverImage || eventMusic,
        category: mainCategory,
        subcategory: selectedCategories[0] || "",
        price: ticketPrice ? `From ₹${ticketPrice}` : "Free",
        status: isDraft ? "draft" : "published",
        artists: artists.filter(a => a.name.trim() !== ""),
      });
      
      toast.success("Event updated successfully!");
    } else {
      // Create new event
      addEvent({
        title: eventTitle,
        date: "Coming Soon",
        location: `${venueName || "TBD"}, ${city || "TBD"}${state ? `, ${state}` : ""}`,
        image: coverImage || eventMusic,
        category: mainCategory,
        subcategory: selectedCategories[0] || "",
        price: ticketPrice ? `From ₹${ticketPrice}` : "Free",
        status: isDraft ? "draft" : "published",
        artists: artists.filter(a => a.name.trim() !== ""),
      });

      toast.success(
        isDraft ? "Event saved as draft!" : "Event published successfully!"
      );
    }
    
    navigate("/organizer/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header isAuthenticated userRole="organizer" />

      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Progress Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-2">
                  {isEditMode ? "Update Event" : "Create New Event"}
                </h1>
                <p className="text-muted-foreground">
                  Step {currentStep} of 6: {steps[currentStep - 1].title}
                </p>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-4">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-center gap-2 text-sm ${
                      step.number === currentStep
                        ? "text-primary font-semibold"
                        : step.number < currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.number < currentStep
                          ? "bg-primary border-primary text-primary-foreground"
                          : step.number === currentStep
                          ? "border-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="hidden md:inline">{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Event Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="eventTitle">Event Title *</Label>
                    <Input
                      id="eventTitle"
                      placeholder="Enter event title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Main Category *</Label>
                    <Select value={mainCategory} onValueChange={(value) => {
                      setMainCategory(value);
                      setSelectedCategories([]);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select main category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {mainCategory && (
                    <div>
                      <Label>Subcategory *</Label>
                      <Select value={selectedCategories[0] || ""} onValueChange={(value) => setSelectedCategories([value])}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryHierarchy[mainCategory as keyof typeof categoryHierarchy]?.map((subcat) => (
                            <SelectItem key={subcat} value={subcat}>
                              {subcat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Photos Section */}
                  <div className="space-y-2">
                    <Label htmlFor="cover-image">Cover Image *</Label>
                    <div className="space-y-3">
                      <Input 
                        id="cover-image" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleCoverImageChange}
                        className="cursor-pointer"
                      />
                      {coverImage && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                          <img 
                            src={coverImage} 
                            alt="Cover preview" 
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => setCoverImage(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gallery">Gallery Images (optional)</Label>
                    <div className="space-y-3">
                      <Input 
                        id="gallery" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleGalleryImagesChange}
                        className="cursor-pointer"
                      />
                      {galleryImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {galleryImages.map((img, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                              <img 
                                src={img} 
                                alt={`Gallery preview ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeGalleryImage(index)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Event Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Event Type *</Label>
                    <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time Event</SelectItem>
                        <SelectItem value="recurring">Recurring Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Starting Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime">Starting Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="endDate">Ending Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">Ending Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Tickets */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-sm text-muted-foreground">
                    Select ticket types to add for your event
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* VIP Guest List Card */}
                    <Card 
                      className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                      onClick={() => openTicketModal("vip-guest")}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">Add VIP Guest List</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Free entry for VIP guests with no pricing
                        </p>
                      </CardContent>
                    </Card>

                    {/* Standard Ticket Card */}
                    <Card 
                      className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                      onClick={() => openTicketModal("standard")}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                            <Ticket className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">Add Standard Ticket</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Regular paid tickets with GST options
                        </p>
                      </CardContent>
                    </Card>

                    {/* Table Ticket Card */}
                    <Card 
                      className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                      onClick={() => openTicketModal("table")}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                            <Table2 className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">Add Table Ticket</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Reserved table booking for groups
                        </p>
                      </CardContent>
                    </Card>

                    {/* Group Pass Card */}
                    <Card 
                      className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                      onClick={() => openTicketModal("group-pass")}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                            <UsersRound className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">Add Group Pass</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Discounted pass for group bookings
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Display saved tickets */}
                  {savedTickets.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Added Tickets ({savedTickets.length})</h3>
                      <div className="grid gap-3">
                        {savedTickets.map((ticket, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold">{ticket.ticketName}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {ticket.ticketCategory} • {ticket.ticketEntryType}
                                  </p>
                                  {ticket.price !== "0" && (
                                    <p className="text-sm font-semibold mt-1">₹{ticket.price}</p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSavedTickets(savedTickets.filter((_, i) => i !== index))}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Venue & Location */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="venueName">Venue Name *</Label>
                    <Input
                      id="venueName"
                      placeholder="Enter venue name"
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="Enter state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="venueContact">Contact Number *</Label>
                      <Input
                        id="venueContact"
                        type="tel"
                        placeholder="Enter contact number"
                        value={venueContact}
                        onChange={(e) => setVenueContact(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="venueEmail">Email *</Label>
                      <Input
                        id="venueEmail"
                        type="email"
                        placeholder="Enter email"
                        value={venueEmail}
                        onChange={(e) => setVenueEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea id="address" placeholder="Enter full address" />
                  </div>

                  <div>
                    <Label>Map Location (Optional)</Label>
                    <div className="border rounded-lg p-4 text-center text-muted-foreground">
                      <MapPin className="mx-auto mb-2" size={32} />
                      <p className="text-sm">Click to add location on map</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Add Artist */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <Label>Artists</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setArtists([...artists, { name: "", photo: "", instagram: "", spotify: "" }])}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Artist
                    </Button>
                  </div>

                  {artists.map((artist, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Artist {index + 1}</h3>
                          {artists.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setArtists(artists.filter((_, i) => i !== index))}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div>
                          <Label htmlFor={`artist-name-${index}`}>Artist Name *</Label>
                          <Input
                            id={`artist-name-${index}`}
                            placeholder="Enter artist name"
                            value={artist.name}
                            onChange={(e) => {
                              const newArtists = [...artists];
                              newArtists[index].name = e.target.value;
                              setArtists(newArtists);
                            }}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`artist-photo-${index}`}>Artist Photo *</Label>
                          <div className="space-y-3">
                            <Input
                              id={`artist-photo-${index}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleArtistPhotoChange(index, e)}
                              className="cursor-pointer"
                            />
                            {artist.photo && (
                              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                                <img 
                                  src={artist.photo} 
                                  alt={`${artist.name} preview`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`artist-instagram-${index}`}>Instagram (Optional)</Label>
                          <Input
                            id={`artist-instagram-${index}`}
                            placeholder="Enter Instagram handle"
                            value={artist.instagram}
                            onChange={(e) => {
                              const newArtists = [...artists];
                              newArtists[index].instagram = e.target.value;
                              setArtists(newArtists);
                            }}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`artist-spotify-${index}`}>Spotify (Optional)</Label>
                          <Input
                            id={`artist-spotify-${index}`}
                            placeholder="Enter Spotify URL"
                            value={artist.spotify}
                            onChange={(e) => {
                              const newArtists = [...artists];
                              newArtists[index].spotify = e.target.value;
                              setArtists(newArtists);
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Step 6: Additional Information */}
              {currentStep === 6 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms & Conditions</Label>
                    <Textarea
                      id="terms"
                      placeholder="Enter any terms and conditions..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Custom Questions for Attendees</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input placeholder="Question (e.g., Dietary requirements?)" />
                        <Button variant="outline" size="sm">
                          + Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Organizer Notes (Private)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any internal notes..."
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 6 ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => handleSubmit(true)}>
                  {isEditMode ? "Save Changes" : "Save as Draft"}
                </Button>
                <Button variant="accent" onClick={() => handleSubmit(false)}>
                  {isEditMode ? "Update Event" : "Publish Event"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Ticket Type Modal */}
      {selectedTicketType && (
        <TicketTypeModal
          open={ticketModalOpen}
          onClose={() => {
            setTicketModalOpen(false);
            setSelectedTicketType(null);
          }}
          ticketType={selectedTicketType}
          onSave={handleSaveTicket}
        />
      )}
    </div>
  );
};

export default CreateEvent;
