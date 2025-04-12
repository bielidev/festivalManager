export interface Core {
  eventId: string;
  operation: "core";
  data: {
    coreData: {
      generalData: GeneralData;
      venueData: VenueData;
    };
    coreQuotas: {
      /* Note to myself:
              In step 4 of the stepper we create quotas/invitations types,
              and in step 5 we create bundles with those quotas/invitations types.
              In both steps we assing a quantity. Which one is the correct one?
                If we assign a quantity in step 4, every bundle will have the same quantity.
                If we assign a quantity in step 5, every bundle can have a different quantity
        */
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
  quotaType: string;
  quotaQuantity: number;
  color: string; // color in hexadecimal
  description: string;
}
