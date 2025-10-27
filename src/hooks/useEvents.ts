import { useState, useEffect } from "react";

export interface Artist {
  name: string;
  photo: string;
  instagram?: string;
  spotify?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  subcategory: string;
  attendees?: number;
  price?: string;
  status: "published" | "draft";
  createdAt: string;
  artists?: Artist[];
}

const STORAGE_KEY = "mapMyParty_events";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<Event, "id" | "createdAt">) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const getPublishedEvents = () => {
    return events.filter((event) => event.status === "published");
  };

  const getDraftEvents = () => {
    return events.filter((event) => event.status === "draft");
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getPublishedEvents,
    getDraftEvents,
  };
};
