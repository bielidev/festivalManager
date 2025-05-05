import { Quota } from "../../../model/EventItemModel/Core";
import { AssignedQuota } from "../../../model/EventItemModel/Bundle";

// Bundle interface
export interface StepperBundle {
  id: string;
  sponsorName: string;
  email: string;
  assignedQuotas: AssignedQuota[];
  totalInvitations: number;
}

// State interface - removed UI state properties
export interface BundleStateForm {
  bundles: StepperBundle[];
  availableQuotas: Quota[];
  currentBundle: StepperBundle | null;
}

// Action types - removed UI related actions
export const BUNDLE_ACTIONS = {
  INITIALIZE_STATE: "INITIALIZE_STATE",
  SET_CURRENT_BUNDLE: "SET_CURRENT_BUNDLE",
  CLEAR_CURRENT_BUNDLE: "CLEAR_CURRENT_BUNDLE",
  UPDATE_BUNDLE_FIELD: "UPDATE_BUNDLE_FIELD",
  UPDATE_QUOTA_ALLOCATION: "UPDATE_QUOTA_ALLOCATION",
  SAVE_BUNDLE: "SAVE_BUNDLE",
  DELETE_BUNDLE: "DELETE_BUNDLE",
} as const;

// Action interfaces
export interface InitializeStateAction {
  type: typeof BUNDLE_ACTIONS.INITIALIZE_STATE;
  payload: {
    availableQuotas: Quota[];
    bundles?: StepperBundle[];
  };
}

export interface SetCurrentBundleAction {
  type: typeof BUNDLE_ACTIONS.SET_CURRENT_BUNDLE;
  payload: StepperBundle | null;
}

export interface ClearCurrentBundleAction {
  type: typeof BUNDLE_ACTIONS.CLEAR_CURRENT_BUNDLE;
}

export interface UpdateBundleFieldAction {
  type: typeof BUNDLE_ACTIONS.UPDATE_BUNDLE_FIELD;
  payload: {
    name: string;
    value: string;
  };
}

export interface UpdateQuotaAllocationAction {
  type: typeof BUNDLE_ACTIONS.UPDATE_QUOTA_ALLOCATION;
  payload: {
    quota: AssignedQuota;
    index: number;
    value: string;
  };
}

export interface SaveBundleAction {
  type: typeof BUNDLE_ACTIONS.SAVE_BUNDLE;
}

export interface DeleteBundleAction {
  type: typeof BUNDLE_ACTIONS.DELETE_BUNDLE;
  payload: string; // bundle id
}

export type BundleAction =
  | InitializeStateAction
  | SetCurrentBundleAction
  | ClearCurrentBundleAction
  | UpdateBundleFieldAction
  | UpdateQuotaAllocationAction
  | SaveBundleAction
  | DeleteBundleAction;

// Helper function to calculate total invitations in a bundle
const calculateTotalInvitations = (assignedQuotas: AssignedQuota[]): number => {
  return assignedQuotas.reduce((sum, q) => sum + q.assignedQuotaQty, 0);
};

// Helper function to update available quotas
const updateAvailableQuotas = (
  availableQuotas: Quota[],
  oldBundle: StepperBundle | null,
  newBundle: StepperBundle | null
): Quota[] => {
  const result = [...availableQuotas];
  
  // Remove old allocations
  if (oldBundle) {
    oldBundle.assignedQuotas.forEach((quota, index) => {
      if (index < result.length) {
        result[index] = {
          ...result[index],
          assignedQuotas: result[index].assignedQuotas - quota.assignedQuotaQty
        };
      }
    });
  }
  
  // Add new allocations
  if (newBundle) {
    newBundle.assignedQuotas.forEach((quota, index) => {
      if (index < result.length) {
        result[index] = {
          ...result[index],
          assignedQuotas: result[index].assignedQuotas + quota.assignedQuotaQty
        };
      }
    });
  }
  
  return result;
};

// Reducer function
export const bundleReducer = (
  state: BundleStateForm,
  action: BundleAction
): BundleStateForm => {
  switch (action.type) {
    case BUNDLE_ACTIONS.INITIALIZE_STATE: {
      return {
        ...state,
        availableQuotas: action.payload.availableQuotas,
        bundles: action.payload.bundles || [],
      };
    }

    case BUNDLE_ACTIONS.SET_CURRENT_BUNDLE: {
      return {
        ...state,
        currentBundle: action.payload,
      };
    }

    case BUNDLE_ACTIONS.CLEAR_CURRENT_BUNDLE: {
      return {
        ...state,
        currentBundle: null,
      };
    }

    case BUNDLE_ACTIONS.UPDATE_BUNDLE_FIELD: {
      if (!state.currentBundle) return state;

      return {
        ...state,
        currentBundle: {
          ...state.currentBundle,
          [action.payload.name]: action.payload.value,
        },
      };
    }

    case BUNDLE_ACTIONS.UPDATE_QUOTA_ALLOCATION: {
      if (!state.currentBundle) return state;

      const { quota, index, value } = action.payload;
      const newValue = parseInt(value) || 0;
      const oldValue = quota.assignedQuotaQty;

      // Create new quotas array with updated value
      const newQuotas = [...state.currentBundle.assignedQuotas];
      newQuotas[index] = {
        ...quota,
        assignedQuotaQty: newValue,
      };

      // Update available quotas
      const updatedAvailableQuotas = [...state.availableQuotas];
      if (index < updatedAvailableQuotas.length) {
        updatedAvailableQuotas[index] = {
          ...updatedAvailableQuotas[index],
          assignedQuotas: 
            updatedAvailableQuotas[index].assignedQuotas + 
            (newValue - oldValue)
        };
      }

      return {
        ...state,
        availableQuotas: updatedAvailableQuotas,
        currentBundle: {
          ...state.currentBundle,
          assignedQuotas: newQuotas,
          totalInvitations: calculateTotalInvitations(newQuotas),
        },
      };
    }

    case BUNDLE_ACTIONS.SAVE_BUNDLE: {
      if (!state.currentBundle) return state;

      const { currentBundle } = state;
      let updatedBundles: StepperBundle[];

      // Either update existing bundle or add new one
      if (state.bundles.some((b) => b.id === currentBundle.id)) {
        updatedBundles = state.bundles.map((b) =>
          b.id === currentBundle.id ? currentBundle : b
        );
      } else {
        updatedBundles = [...state.bundles, currentBundle];
      }

      return {
        ...state,
        bundles: updatedBundles,
        currentBundle: null,
      };
    }

    case BUNDLE_ACTIONS.DELETE_BUNDLE: {
      const bundleToDelete = state.bundles.find((b) => b.id === action.payload);
      if (!bundleToDelete) return state;

      // Update available quotas when deleting a bundle
      const updatedAvailableQuotas = updateAvailableQuotas(
        state.availableQuotas,
        bundleToDelete,
        null
      );

      return {
        ...state,
        bundles: state.bundles.filter((b) => b.id !== action.payload),
        availableQuotas: updatedAvailableQuotas,
      };
    }

    default:
      return state;
  }
};

// Action creators
export const initializeState = (
  availableQuotas: Quota[],
  bundles?: StepperBundle[]
): InitializeStateAction => ({
  type: BUNDLE_ACTIONS.INITIALIZE_STATE,
  payload: { availableQuotas, bundles },
});

export const setCurrentBundle = (bundle: StepperBundle | null): SetCurrentBundleAction => ({
  type: BUNDLE_ACTIONS.SET_CURRENT_BUNDLE,
  payload: bundle,
});

export const clearCurrentBundle = (): ClearCurrentBundleAction => ({
  type: BUNDLE_ACTIONS.CLEAR_CURRENT_BUNDLE,
});

export const updateBundleField = (
  name: string,
  value: string
): UpdateBundleFieldAction => ({
  type: BUNDLE_ACTIONS.UPDATE_BUNDLE_FIELD,
  payload: { name, value },
});

export const updateQuotaAllocation = (
  quota: AssignedQuota,
  index: number,
  value: string
): UpdateQuotaAllocationAction => ({
  type: BUNDLE_ACTIONS.UPDATE_QUOTA_ALLOCATION,
  payload: { quota, index, value },
});

export const saveBundle = (): SaveBundleAction => ({
  type: BUNDLE_ACTIONS.SAVE_BUNDLE,
});

export const deleteBundle = (id: string): DeleteBundleAction => ({
  type: BUNDLE_ACTIONS.DELETE_BUNDLE,
  payload: id,
});