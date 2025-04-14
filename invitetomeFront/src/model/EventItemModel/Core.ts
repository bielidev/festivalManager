export interface Core {
  eventId: string;
  operation: "core";
  data: {
    coreData: {
      generalData: GeneralData;
      venueData: VenueData;
    };
    coreQuotas: {
      quotas: Quota[];
      totalInvitations: number;
      remainingInvitations: number;
    };
    coreStatus: {
      status: EventStatus;
    };
    coreEventDates: {
      /* Dates are in ISO 8601 format */
      dates: string[];
      startDate: string;
      endDate: string;
      openingTime: string; // Time in 24h format
      scheduleNotes: string;
    };
  };
}

export type EventStatus =
  | "Upcoming"
  | "Draft"
  | "Active"
  | "In Progress"
  | "Archived";

export interface GeneralData {
  eventName: string;
  eventCode: string;
  description: string;
  type: string;
  edition: string;
  yearEdition: number;
  websiteUrl: string;
  logoUrl: string;
  previewImageUrl: string;
  phone: string;
  tags: string[];
}

export interface VenueData {
  venueName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  gates: string[];
}

export interface Quota {
  invitationType: string; // e.g. "VIP", "Backstage"
  quotaQuantity: number;
  color: string; // color in hexadecimal
  description: string;
}
