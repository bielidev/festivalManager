/* Bundles operation (all bundles) , do not confuse with Bundle */
import { AssignedQuota, BundleData, BundleStatus } from "./Bundle";
import { defaultBundle } from "./Bundle";
export interface Bundles {
  eventId: string;
  operation: "bundles";
  data: {
    bundlesData: {
      /* key = Bundle operation, e.g. bundle#01#cocacola */
      [key: string]: {
        bundleData: BundleData;
        quotas: AssignedQuota[];
        statusCode: BundleStatus;
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
  totalAssignedQuotas: number; // summation of all assigned quotas per bundle
}

export const defaultBundles: Bundles = {
  eventId: "",
  operation: "bundles",
  data: {
    bundlesData: {
      /* key = Bundle operation, e.g. bundle#01#cocacola */
      "bundle#00#fasttrack": {
        bundleData: defaultBundle.data.bundleData,
        quotas: defaultBundle.data.bundleQuotas.quotas,
        statusCode: defaultBundle.data.bundleStatus.statusCode,
      },
    },
    bundlesMetadata: {
      totalInvitations: 0,
      sentInvitations: 0,
      acceptedInvitations: 0,
      totalBundles: 1,
      totalAssignedQuotas: 0,
    },
  },
};
