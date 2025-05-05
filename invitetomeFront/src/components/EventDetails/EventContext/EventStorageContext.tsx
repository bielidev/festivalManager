import React, { createContext, useContext, useState } from "react";
import {
  mockBundlesOp,
  mockCoreOp,
  mockEventBundleOps,
} from "../../../model/EventItemModel/MockData";
import { Core, emptyEventData, GeneralData } from "../../../model/EventItemModel/Core";
import { getItem, setItem, removeItem } from "../../../utils/localStorage";
import { DateTimeForm } from "../Steps/Calendar";
import { QuotaStateForm } from "../reducers/quotaReducer";
import { Bundles } from "../../../model/EventItemModel/Bundles";
import { BundleStateForm } from "../reducers/bundleReducer";
import { GeneralInfoForm } from "../Steps/GeneralInfo";

// Local storage key for storing event ids
const EVENT_IDS_KEY = "eventIds";
const CORE_KEY_SUFFIX = "#core";
const BUNDLES_KEY_SUFFIX = "#bundles";
// Local storage keys for storing event bundles
const EVENT_BUNDLE_KEY_SUFFIX = "BundleKeys"; // e.g. "eventId#BundleKeys"

interface EventStorageContextType {
  eventCores: Core[];
  eventCoreStorageApi: {
    addEventCore: (eventCore: Core) => void;
    getEventCoreById: (id: string) => Core | undefined;
    updateEventCore: (updatedEventCore: Core) => void;
    removeEventCore: (id: string) => void;
    getEventGeneralData: (id: string) => GeneralData;
    updateEventGeneralData: (
      id: string,
      generalInfoForm: GeneralInfoForm
    ) => void;
    updateTimeDates: (id: string, dateTimeForm: DateTimeForm) => void;
    updateInvitationQuotas: (
      id: string,
      invitationQuotaData: QuotaStateForm
    ) => void;
  };
  eventBundlesStorageApi: {
    setEventBundles: (eventId: string, bundles: Bundles) => void;
    getEventBundles: (eventId: string) => Bundles | undefined;
    removeEventBundles: (eventId: string) => void;
    updateBundles: (eventId: string, bundleStateForm: BundleStateForm) => void;
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
  const storedIds = getItem(EVENT_IDS_KEY) || [];
  // If no ids are found, return mock data and store them in local storage
  if (storedIds.length === 0) {
    const idsArray = mockCoreOp.map((event) => {
      // We create a key for accessing the event core operation "eventId#core"
      setItem(event.eventId + CORE_KEY_SUFFIX, event);
      return event.eventId;
    });
    setItem(EVENT_IDS_KEY, idsArray);
    return mockCoreOp;
  }
  // If ids are found, retrieve the events from local storage
  return storedIds
    .map((id: string) => {
      const eventCoreData = getItem(id + CORE_KEY_SUFFIX);
      return eventCoreData || null;
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

      setItem(
        EVENT_IDS_KEY,
        updatedEvents.map((e) => e.eventId)
      );
      setItem(eventCore.eventId + CORE_KEY_SUFFIX, eventCore);

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

      setItem(updatedEventCore.eventId + CORE_KEY_SUFFIX, updatedEventCore);

      setEventCores(updatedEventCores);
    },
    getEventGeneralData: (id: string) => {
      const eventCore = eventCores.find((eventCore) => eventCore.eventId === id);
      if (!eventCore) {
        console.error("Event core not found for id:", id);
        return emptyEventData.data.coreData.generalData;
      }
      return eventCore.data.coreData.generalData;
    },
    updateEventGeneralData: (id: string, generalInfoForm : GeneralInfoForm)  => {
      const eventCore = eventCores.find((eventCore) => eventCore.eventId === id);
      if (!eventCore) {
        console.error("Event core not found for id:", id);
        return;
      }

      // Update the event core with the new general data
      const updatedEventCore = {
        ...eventCore,
        data: {
          ...eventCore.data,
          coreData: {
            ...eventCore.data.coreData,
            generalData: {
              ...eventCore.data.coreData.generalData,
              ...generalInfoForm,
            },
          },
        },
      };

      setItem(id + CORE_KEY_SUFFIX, updatedEventCore);

      setEventCores((prevState) =>
        prevState.map((event) =>
          event.eventId === id ? updatedEventCore : event
        )
      );
    },
    removeEventCore: (id: string) => {
      const updatedEventCores = eventCores.filter(
        (eventCore) => eventCore.eventId !== id
      );
      const updatedIds = updatedEventCores.map(
        (eventCore) => eventCore.eventId
      );

      setItem(EVENT_IDS_KEY, updatedIds);
      removeItem(id + CORE_KEY_SUFFIX);

      setEventCores(updatedEventCores);
    },
    updateTimeDates: (id: string, dateTimeForm: DateTimeForm) => {
      let eventCore = eventCores.find((eventCore) => eventCore.eventId === id);
      if (!eventCore) {
        console.error("Event core not found for id:", id);
        return;
      }

      // Preserve the day by creating ISO strings without timezone offset
      const datesIsoformatted = dateTimeForm.selectedDates.map((date) => {
        // Create a date string that preserves the selected day regardless of timezone
        return new Date(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            10,
            0,
            0
          )
        ).toISOString();
      });
      const startDate = datesIsoformatted[0];
      const endDate = datesIsoformatted[datesIsoformatted.length - 1];

      // Update the event core with the new dates and times
      eventCore = {
        ...eventCore,
        data: {
          ...eventCore.data,
          coreEventDates: {
            ...eventCore.data.coreEventDates,
            dates: datesIsoformatted,
            openingTime: dateTimeForm.openingTime,
            scheduleNotes: dateTimeForm.scheduleNotes,
            startDate: startDate,
            endDate: endDate,
          },
        },
      };

      const updatedEventCores = eventCores.map((eventCoreItem) =>
        eventCoreItem.eventId === id ? eventCore : eventCoreItem
      );

      setItem(id + CORE_KEY_SUFFIX, eventCore);

      setEventCores(updatedEventCores);
    },
    updateInvitationQuotas: (
      id: string,
      invitationQuotaData: QuotaStateForm
    ) => {
      let eventCore = eventCores.find((eventCore) => eventCore.eventId === id);
      if (!eventCore) {
        console.error("Event core not found for id:", id);
        return;
      }

      // Update the event core with the new quotas
      eventCore = {
        ...eventCore,
        data: {
          ...eventCore.data,
          coreQuotas: {
            ...eventCore.data.coreQuotas,
            quotas: invitationQuotaData.quotas,
            totalInvitations: invitationQuotaData.totalInvitations,
            //remainingInvitations: invitationQuotaData.remainingInvitations,
          },
        },
      };

      const updatedEventCores = eventCores.map((eventCoreItem) =>
        eventCoreItem.eventId === id ? eventCore : eventCoreItem
      );

      setItem(id + CORE_KEY_SUFFIX, eventCore);

      setEventCores(updatedEventCores);
    },
  };

  const eventBundlesStorageApi = {
    setEventBundles: (eventId: string, bundles: Bundles) => {
      setItem(eventId + BUNDLES_KEY_SUFFIX, bundles);
    },
    getEventBundles: (eventId: string) => {
      if (!eventId) {
        console.error("Event ID is required to get event bundles.");
        return;
      }
      // Check if there are events with the same ID
      const eventExists = getItem(EVENT_IDS_KEY).includes(eventId);
      if (!eventExists) {
        console.error("Event ID does not exist in local storage.");
        return;
      }
      const bundles = getItem(eventId + BUNDLES_KEY_SUFFIX);
      // Event exists, but bundles are not in local storage
      if (!bundles) {
        const bundlesData = mockBundlesOp.find(
          (bundle) => bundle.eventId === eventId
        );

        setItem(eventId + BUNDLES_KEY_SUFFIX, bundlesData);

        // Load individual bundles
        let bundleKeys: string[] = [];
        const individualBundles = mockEventBundleOps.get(eventId);
        if (individualBundles) {
          individualBundles.forEach((bundle) => {
            bundleKeys.push(bundle.operation);
            setItem(`${eventId}#${bundle.operation}`, bundle);
            setItem(eventId + EVENT_BUNDLE_KEY_SUFFIX, bundleKeys);
          });
        }

        return bundlesData;
      }
      return bundles;
    },
    removeEventBundles: (eventId: string) => {
      if (!eventId) {
        console.error("Event ID is required to remove event bundles.");
        return;
      }
      removeItem(eventId + BUNDLES_KEY_SUFFIX);
      // Remove individual bundles
      const bundleKeys = getItem(eventId + EVENT_BUNDLE_KEY_SUFFIX) as string[];
      if (bundleKeys) {
        bundleKeys.forEach((bundleKey) => {
          removeItem(`${eventId}#${bundleKey}`);
        });
        removeItem(eventId + EVENT_BUNDLE_KEY_SUFFIX);
      }
    },
    updateBundles: (eventId: string, bundleStateForm: BundleStateForm) => {
      if (!eventId) {
        console.error("Event ID is required to update bundles.");
        return;
      }

      // 1. Update core quotas in the event core
      const eventCore = eventCoreStorageApi.getEventCoreById(eventId);
      if (eventCore) {
        // Calculate total assigned quotas from all bundles
        const updatedQuotas = bundleStateForm.availableQuotas.map((quota) => ({
          ...quota,
        }));

        // Update the event core with the new quotas
        const updatedEventCore = {
          ...eventCore,
          data: {
            ...eventCore.data,
            coreQuotas: {
              ...eventCore.data.coreQuotas,
              quotas: updatedQuotas,
            },
          },
        };

        // Save the updated event core
        eventCoreStorageApi.updateEventCore(updatedEventCore);
      }

      // 2. Update overall bundles data
      const bundlesData =
        eventBundlesStorageApi.getEventBundles(eventId) ||
        mockBundlesOp.find((bundle) => bundle.eventId === eventId);

      if (bundlesData) {
        const updatedBundlesData: Bundles = {
          ...bundlesData,
          eventId,
          data: {
            bundlesData: {},
            bundlesMetadata: {
              totalInvitations: 0,
              sentInvitations: 0,
              acceptedInvitations: 0,
              totalBundles: bundleStateForm.bundles.length,
              totalAssignedQuotas: 0,
            },
          },
        };

        // Calculate totals and populate bundlesData
        let totalAssignedQuotas = 0;
        bundleStateForm.bundles.forEach((bundle) => {
          const bundleTotal = bundle.assignedQuotas.reduce(
            (sum, quota) => sum + quota.assignedQuotaQty,
            0
          );
          totalAssignedQuotas += bundleTotal;

          // Add bundle to bundlesData
          updatedBundlesData.data.bundlesData[bundle.id] = {
            bundleData: {
              bundleName: bundle.sponsorName,
              sponsorName: bundle.sponsorName,
              sponsorEmail: bundle.email,
              sponsorContactName: bundle.sponsorName,
              bundleDescription: `Bundle for ${bundle.sponsorName}`,
            },
            quotas: bundle.assignedQuotas,
            statusCode: "Draft",
          };
        });

        updatedBundlesData.data.bundlesMetadata.totalAssignedQuotas =
          totalAssignedQuotas;
        updatedBundlesData.data.bundlesMetadata.totalInvitations =
          totalAssignedQuotas;

        // Save the updated bundles data
        setItem(eventId + BUNDLES_KEY_SUFFIX, updatedBundlesData);

        // 3. Update individual bundles
        // First, get the existing bundle keys
        let existingBundleKeys =
          (getItem(eventId + EVENT_BUNDLE_KEY_SUFFIX) as string[]) || [];

        // Create a set of all bundle keys that should exist after the update
        const newBundleIds = new Set(
          bundleStateForm.bundles.map((bundle) => bundle.id)
        );

        // Remove bundles that no longer exist
        existingBundleKeys.forEach((bundleKey) => {
          if (!newBundleIds.has(bundleKey)) {
            removeItem(`${eventId}#${bundleKey}`);
          }
        });

        // Create/update individual bundles and collect new keys
        let updatedBundleKeys: string[] = [];

        bundleStateForm.bundles.forEach((bundle) => {
          const bundleKey = bundle.id;
          updatedBundleKeys.push(bundleKey);

          // Get existing bundle or create new one
          const existingBundle = getItem(`${eventId}#${bundleKey}`) || {
            eventId,
            operation: bundleKey,
            contacts: [],
            data: {
              bundleData: {
                bundleName: "",
                sponsorName: "",
                sponsorEmail: "",
                sponsorContactName: "",
                bundleDescription: "",
              },
              bundleDates: { dates: [] },
              bundleQuotas: { quotas: [], totalAssignedQuota: 0 },
              bundleStatus: { statusCode: "Draft" },
            },
            gsiPK: "BUNDLES",
            invitations: [],
          };

          // Update bundle with new data
          const updatedBundle = {
            ...existingBundle,
            data: {
              ...existingBundle.data,
              bundleData: {
                bundleName: bundle.sponsorName,
                sponsorName: bundle.sponsorName,
                sponsorEmail: bundle.email,
                sponsorContactName: bundle.sponsorName,
                bundleDescription: `Bundle for ${bundle.sponsorName}`,
              },
              bundleQuotas: {
                quotas: bundle.assignedQuotas,
                totalAssignedQuota: bundle.totalInvitations,
              },
            },
          };

          // Save the updated individual bundle
          setItem(`${eventId}#${bundleKey}`, updatedBundle);
        });

        // Update bundle keys list
        setItem(eventId + EVENT_BUNDLE_KEY_SUFFIX, updatedBundleKeys);
      }
    },
  };

  return (
    <EventStorageContext.Provider
      value={{ eventCores, eventCoreStorageApi, eventBundlesStorageApi }}
    >
      {children}
    </EventStorageContext.Provider>
  );
};
