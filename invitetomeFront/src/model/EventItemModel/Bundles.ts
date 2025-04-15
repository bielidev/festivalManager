/* Bundles operation (all bundles) , do not confuse with Bundle */
import { BundleData } from "./Bundle";
import { defaultBundle } from "./Bundle";
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

export const defaultBundles: Bundles = {
  eventId: "",
  operation: "bundles",
  data: {
    bundlesData: {
      /* key = Bundle operation, e.g. bundle#01#cocacola */
      "bundle#01#FastTrack": {
        bundleData: defaultBundle.data.bundleData,
        quotas: defaultBundle.data.bundleQuotas.quotas,
      },
    },
    bundlesMetadata: {
      totalInvitations: 0,
      sentInvitations: 0,
      acceptedInvitations: 0,
      totalBundles: 0,
      activeBundles: 0,
      draftBundles: 0,
      archivedBundles: 0,
      inProgressBundles: 0,
    },
  },
};
