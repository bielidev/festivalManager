import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useEventStorageContext } from "./EventStorageContext";
import { Core } from "../../../model/EventItemModel/Core";

/* Context for managing event details */
interface EventDetailContextType {
  currentEvent: Core;
  dispatch: React.Dispatch<Action>;
}

const EventDetailContext = createContext<EventDetailContextType | undefined>(
  undefined
);

export const useEventDetailContext = () => {
  const context = useContext(EventDetailContext);
  if (!context) {
    throw new Error(
      "useEventDetailContext must be used within an EventDetailProvider"
    );
  }
  return context;
};

export const EventDetailProvider: React.FC<{
  children: React.ReactNode;
  id: string;
}> = ({ children, id }) => {
  const { eventCoreStorageApi } = useEventStorageContext();

  const initReducer = (id: string) => {
    if (id) {
      const eventData = eventCoreStorageApi.getEventCoreById(id);
      if (eventData) {
        console.info("Loading event data into reducer", eventData);
        return eventData;
      } else {
        console.error(
          "Failed to load event data, initializing empty event data"
        );
        return emptyEventData;
      }
    }
    console.info("No event data found, initializing empty event data");
    return emptyEventData;
  };

  const [currentEvent, dispatch] = useReducer(eventReducer, {} as Core, () =>
    initReducer(id)
  );

  useEffect(() => {
    eventCoreStorageApi.updateEventCore(currentEvent);
  }, [currentEvent]);

  return (
    <EventDetailContext.Provider value={{ currentEvent, dispatch }}>
      {children}
    </EventDetailContext.Provider>
  );
};

export interface GeneralInfoForm {
  eventCode: string;
  name: string;
  tags: string[];
  venue: string;
  city: string;
  address: string;
  gates: string[];
};

/* Reducer for managing event details */
type Action = { type: "GENERAL_DATA"; payload: GeneralInfoForm };

const eventReducer = (state: Core, action: Action) => {
  switch (action.type) {
    case "GENERAL_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          coreData: {
            ...state.data.coreData,
            generalData: {
              ...state.data.coreData.generalData,
              eventCode: action.payload.eventCode,
              eventName: action.payload.name,
              tags: action.payload.tags,
            },
            venueData: {
              ...state.data.coreData.venueData,
              venueName: action.payload.venue,
              city: action.payload.city,
              address: action.payload.address,
              gates: action.payload.gates,
            },
          },
        },
      };
    default:
      return state;
  }
};


// Empty event core data for initialization
const emptyEventData: Core = {
  eventId: "",
  operation: "core",
  data: {
    coreData: {
      generalData: {
        eventName: "",
        eventCode: "",
        description: "",
        type: "",
        edition: "",
        yearEdition: 0,
        websiteUrl: "",
        logoUrl: "",
        previewImageUrl: "",
        phone: "",
        tags: [],
      },
      venueData: {
        venueName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        gates: [],
      },
    },
    coreQuotas: {
      quotas: [
        {
          quotaType: "Fast Track",
          quotaQuantity: 0,
          description: "",
          color: "#000000",
        },
      ],
      totalInvitations: 0,
      remainingInvitations: 0,
    },
    coreStatus: {
      status: "Draft",
    },
    coreEventDates: {
      dates: [],
      startDate: "",
      endDate: "",
      openingTime: "",
      scheduleNotes: "",
    },
  },
};
