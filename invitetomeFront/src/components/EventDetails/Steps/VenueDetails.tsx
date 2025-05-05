import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useState } from "react";

interface VenueDetailsForm {
  venue: string;
  city: string;
  address: string;
  gates: string[];
}

export const VenueDetails = () => {
  const [venueDetailsForm, setVenueDetailsForm] = useState<VenueDetailsForm>({
    venue: "",
    city: "",
    address: "",
    gates: [],
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVenueDetailsForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnChangeTags = (newValue: string[], field: string) => {
    setVenueDetailsForm((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={3}>
        {/* Venue Information */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Venue Details
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={venueDetailsForm.venue}
            fullWidth
            label="Venue Name"
            variant="outlined"
            required
            onChange={handleOnChange}
            name="venue"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={venueDetailsForm.city}
            fullWidth
            label="City"
            variant="outlined"
            type="text"
            required
            onChange={handleOnChange}
            name="city"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={venueDetailsForm.address}
            fullWidth
            label="Address"
            variant="outlined"
            required
            multiline
            rows={2}
            onChange={handleOnChange}
            name="address"
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            value={venueDetailsForm.gates}
            onChange={(_event, newValue) =>
              handleOnChangeTags(newValue, "gates")
            }
            renderTags={(value: string[], getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  sx={{
                    bgcolor: "#7799CC",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  key={option}
                  label={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Gates"
                variant="outlined"
                placeholder="Add gates"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Zones
          </Typography>
        </Grid>
    </Box>
  );
};

export default VenueDetails;
