import { useReducer, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { useEventStorageContext } from "../EventContext/EventStorageContext";
import { useParams } from "react-router-dom";
import { Quota } from "../../../model/EventItemModel/Core";
import { AssignedQuota } from "../../../model/EventItemModel/Bundle";
import {
  StepperBundle,
  BundleStateForm,
  bundleReducer,
  initializeState,
  setCurrentBundle,
  clearCurrentBundle,
  updateBundleField,
  updateQuotaAllocation,
  saveBundle,
  deleteBundle,
} from "./bundleReducer";

export const Bundles = () => {
  const { eventCoreStorageApi, eventBundlesStorageApi } =
    useEventStorageContext();
  const { id } = useParams();
  const eventId = id || "";

  // Initial state for data
  const initialState: BundleStateForm = {
    bundles: [],
    availableQuotas: [],
    currentBundle: null,
  };

  // Local component state for UI
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Use reducer for data state
  const [state, dispatch] = useReducer(bundleReducer, initialState);

  // Calculate remaining quotas
  const remainingQuotas = state.availableQuotas.reduce(
    (acc, quota) => acc + (quota.quotaQuantity - quota.assignedQuotas),
    0
  );

  // Load data on component mount
  useEffect(() => {
    const loadBundlesData = async () => {
      // Get available quotas
      const eventCore = eventCoreStorageApi.getEventCoreById(eventId);
      let quotas: Quota[] = [];
      if (eventCore) {
        quotas = eventCore.data.coreQuotas.quotas;

      }

      // Get bundles data 
      const bundlesData = eventBundlesStorageApi.getEventBundles(eventId);
      let bundles: StepperBundle[] = [];
      if (bundlesData) {
        bundles = Object.keys(bundlesData.data.bundlesData).map((key) => {
          const bundle = bundlesData.data.bundlesData[key];
          return {
            id: key,
            sponsorName: bundle.bundleData.sponsorName,
            email: bundle.bundleData.sponsorEmail,
            assignedQuotas: bundle.quotas,
            totalInvitations: bundle.quotas.reduce(
              (acc, quota) => acc + quota.assignedQuotaQty,
              0
            )
          };
        });
      }
      // Initialize state
      dispatch(initializeState(quotas, bundles));
    };

    loadBundlesData();
  }, [eventId]);

  // Save bundles when they change
  useEffect(() => {
    if (state.bundles.length > 0) {
      // Here you would convert state.bundles to your storage format
      // and save to your storage API
    }
  }, [state.bundles]);

  // Event handlers
  const handleOpenDialog = (bundle?: StepperBundle) => {
    if (bundle) {
      // Edit existing bundle
      dispatch(setCurrentBundle(bundle));
      setIsEditMode(true);
    } else {
      // Create new bundle
      const newBundle: StepperBundle = {
        id: Date.now().toString(),
        sponsorName: "",
        email: "",
        assignedQuotas: state.availableQuotas.map((quota) => ({
          invitationType: quota.invitationType,
          color: quota.color || "#6B7280", // default gray color
          assignedQuotaQty: 0,
        })),
        totalInvitations: 0,
      };

      dispatch(setCurrentBundle(newBundle));
      setIsEditMode(false);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    dispatch(clearCurrentBundle());
  };

  const handleOnChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateBundleField(name, value));
  };

  const handleOnChangeAssignedQuota = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    quota: AssignedQuota,
    index: number
  ) => {
    dispatch(updateQuotaAllocation(quota, index, e.target.value));
  };

  const handleSaveBundle = () => {
    dispatch(saveBundle());
    setIsDialogOpen(false);
  };

  const handleDeleteBundle = (id: string) => {
    dispatch(deleteBundle(id));
  };

  const handleShareBundle = (bundle: StepperBundle) => {
    // Implement sharing functionality
    console.log("Share bundle with:", bundle.email);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", pt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Sponsor Bundles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Bundle
        </Button>
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        Total Invitations Remaining: {remainingQuotas}
      </Typography>

      <Grid container spacing={3}>
        {state.bundles.map((bundle) => (
          <Grid item xs={12} md={6} key={bundle.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {bundle.sponsorName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {bundle.email}
                </Typography>

                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bundle.assignedQuotas.map((quota) => (
                        <TableRow key={quota.invitationType}>
                          <TableCell>{quota.invitationType}</TableCell>
                          <TableCell align="right">
                            {quota.assignedQuotaQty}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {bundle.totalInvitations}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => handleOpenDialog(bundle)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleShareBundle(bundle)}
                  size="small"
                >
                  <ShareIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteBundle(bundle.id)}
                  size="small"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Bundle Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? "Edit Bundle" : "Create New Bundle"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="sponsorName"
                label="Sponsor Name"
                value={state.currentBundle?.sponsorName || ""}
                onChange={handleOnChangeTextField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                label="Sponsor Email"
                type="email"
                value={state.currentBundle?.email || ""}
                onChange={handleOnChangeTextField}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Quota Allocation
              </Typography>
              <Stack spacing={2}>
                {state.currentBundle?.assignedQuotas.map((quota, index) => (
                  <Box
                    key={quota.invitationType}
                    sx={{ display: "flex", gap: 2, alignItems: "center" }}
                  >
                    <Chip
                      label={quota.invitationType}
                      sx={{
                        bgcolor: quota.color,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                    <TextField
                      type="number"
                      label="Quantity"
                      value={quota.assignedQuotaQty}
                      onChange={(e) =>
                        handleOnChangeAssignedQuota(e, quota, index)
                      }
                      size="small"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                    <Typography variant="body2">
                      Invitations remaining:{" "}
                      {state.availableQuotas[index]?.quotaQuantity -
                        state.availableQuotas[index]?.assignedQuotas || 0}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveBundle} variant="contained">
            Save Bundle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bundles;
