/* Bundle operation (individual), do not confuse with Bundles */
import { Quota } from "./Core";

export interface Bundle {
  eventId: string;
  operation: string; // "e.g. bundle#01#cocacola"
  contacts: Contact[];
  data: {
    bundleData: BundleData;
    bundleDates: {
      dates: string[];
    };
    bundleQuotas: BundleQuotas;
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
export interface BundleData {
  bundleName: string;
  sponsorName: string;
  sponsorEmail: string;
  bundleDescription: string;
}

export interface BundleQuotas {
  quotas: Quota[];
  totalInvitations: number;
  sentInvitations: number;
  acceptedInvitations: number;
}
