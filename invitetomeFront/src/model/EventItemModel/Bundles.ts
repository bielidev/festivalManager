/* Bundles operation (all bundles) , do not confuse with Bundle */
import { BundleData } from "./Bundle";
import { Quota } from "./Core";

export interface Bundles {
  eventId: string;
  operation: "bundles";
  data: {
    bundlesData: {
      /* key = Bundle operation, e.g. bundle#01#cocacola */
      [key: string]: {
        bundleData: BundleData;
        quotas: Quota[];
      };
    };
    bundlesMetadata: BundleMetadata;
  };
}

interface BundleMetadata {
  totalInvitations: number;
  sentInvitations: number;
  acceptedInvitations: number;
  totalBundles: number;
  activeBundles: number;
  draftBundles: number;
  archivedBundles: number;
  inProgressBundles: number;
}
