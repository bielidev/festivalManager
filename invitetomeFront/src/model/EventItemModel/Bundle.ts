/* Bundle operation (individual), do not confuse with Bundles */
import { Quota } from "./Core";

export interface Bundle {
  eventId: string;
  operation: string; // "e.g. bundle#01#cocacola"
  contacts: Contact[];
  data: {
    bundleData: {
      bundleName: string;
      sponsorName: string;
      bundleDescription: string;
    };
    bundleDates: {
      dates: string[];
    };
    bundleQuotas: {
      quotas: Quota[];
      totalInvitations: number;
      sentInvitations: number;
      acceptedInvitations: number;
    };
    bundleStatus: {
      status: BundleStatus;
    };
  };
  gsiPK: "BUNDLES";
  invitations: string[]; // List of invitation operations
}

export type BundleStatus = "Draft" | "Active" | "In Progress" | "Archived";

export interface Contact {
  name: string;
  email: string;
}
