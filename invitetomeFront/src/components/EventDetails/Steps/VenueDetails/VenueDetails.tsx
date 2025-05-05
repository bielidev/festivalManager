import { Box } from "@mui/material";
import { useState } from "react";
import { VenueDetailsForm } from "./VenueDetailsForm";
//import VenueZones, { Zone } from "./VenueZones";

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

 // const [zones, setZones] = useState<Zone[]>([]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <VenueDetailsForm 
        venueData={venueDataForm}
        setVenueData={setVenueDataForm}
      />
      
      {/* <VenueZones 
        zones={zones}
        onChange={setZones}
      /> */}
    </Box>
  );
};

export default VenueDetails;
