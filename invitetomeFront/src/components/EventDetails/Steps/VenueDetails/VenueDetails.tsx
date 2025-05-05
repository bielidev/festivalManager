import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { VenueDetailsForm } from "./VenueDetailsForm";
import VenueZones, { Zone } from "./VenueZones";

interface VenueData {
  venue: string;
  city: string;
  address: string;
  gates: string[];
}

export const VenueDetails = () => {
  const [venueDataForm, setVenueDataForm] = useState<VenueData>({
    venue: "",
    city: "",
    address: "",
    gates: [],
  });

  const [zonesForm, setZonesForm] = useState<Zone[]>([]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={3}>
      <VenueDetailsForm
        venueData={venueDataForm}
        setVenueData={setVenueDataForm}
      />
      <VenueZones zonesForm={zonesForm} setZonesForm={setZonesForm} />
      </Grid>
    </Box>
  );
};

export default VenueDetails;
