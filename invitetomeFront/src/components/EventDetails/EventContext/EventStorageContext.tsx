import React, { createContext, useContext, useState } from "react";
import { mockCoreOp } from "../../../model/EventItemModel/MockData";
import { Core } from "../../../model/EventItemModel/Core";

// Local storage key for storing event ids
const EVENT_IDS_KEY = "eventIds";
const CORE_KEY_SUFFIX = "#core";

interface EventStorageContextType {
  eventCores: Core[];
  eventCoreStorageApi: {
    addEventCore: (eventCore: Core) => void;
    getEventCoreById: (id: string) => Core | undefined;
    updateEventCore: (updatedEventCore: Core) => void;
    removeEventCore: (id: string) => void;
  };
}

const EventStorageContext = createContext<EventStorageContextType | undefined>(
  undefined
);

export const useEventStorageContext = () => {
  const context = useContext(EventStorageContext);
  if (!context) {
    throw new Error(
      "useEventStorageContext must be used within an EventProvider"
    );
  }
  return context;
};

const initializeEvents = () => {
  // Arrays of event ids stored in local storage
  const storedIds = JSON.parse(
    localStorage.getItem(EVENT_IDS_KEY) || "[]"
  ) as string[];
  // If no ids are found, return mock data and store them in local storage
  if (storedIds.length === 0) {
    const idsArray = mockCoreOp.map((event) => {
      // We create a key for accessing the event core operation "eventId#core"
      localStorage.setItem(
        event.eventId + CORE_KEY_SUFFIX,
        JSON.stringify(event)
      );
      return event.eventId;
    });
    localStorage.setItem(EVENT_IDS_KEY, JSON.stringify(idsArray));
    return mockCoreOp;
  }
  // If ids are found, retrieve the events from local storage
  return storedIds
    .map((id) => {
      const eventCoreData = localStorage.getItem(id + CORE_KEY_SUFFIX);
      return eventCoreData ? JSON.parse(eventCoreData) : null;
    })
    .filter(Boolean) as Core[];
};

// Provider component
export const EventStorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [eventCores, setEventCores] = useState<Core[]>(initializeEvents);

  const eventCoreStorageApi = {
    addEventCore: (eventCore: Core) => {
      const updatedEvents = [...eventCores, eventCore];

      localStorage.setItem(
        EVENT_IDS_KEY,
        JSON.stringify(updatedEvents.map((e) => e.eventId))
      );
      localStorage.setItem(
        eventCore.eventId + CORE_KEY_SUFFIX,
        JSON.stringify(eventCore)
      );

      setEventCores(updatedEvents);
    },
    getEventCoreById: (id: string) =>
      eventCores.find((eventCore) => eventCore.eventId === id),
    updateEventCore: (updatedEventCore: Core) => {
      const updatedEventCores = eventCores.map((eventCore) =>
        eventCore.eventId === updatedEventCore.eventId
          ? updatedEventCore
          : eventCore
      );

      console.info("Updating event core data in storage");
      localStorage.setItem(
        updatedEventCore.eventId + CORE_KEY_SUFFIX,
        JSON.stringify(updatedEventCore)
      );

      setEventCores(updatedEventCores);
    },
    removeEventCore: (id: string) => {
      const updatedEventCores = eventCores.filter(
        (eventCore) => eventCore.eventId !== id
      );
      const updatedIds = updatedEventCores.map(
        (eventCore) => eventCore.eventId
      );

      localStorage.setItem(EVENT_IDS_KEY, JSON.stringify(updatedIds));
      localStorage.removeItem(id + CORE_KEY_SUFFIX);

      setEventCores(updatedEventCores);
    },
  };

  return (
    <EventStorageContext.Provider value={{ eventCores, eventCoreStorageApi }}>
      {children}
    </EventStorageContext.Provider>
  );
};
