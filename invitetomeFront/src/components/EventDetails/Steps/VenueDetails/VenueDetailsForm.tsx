import {
  TextField,
  Grid,
  Typography,
  Autocomplete,
  Chip,
} from "@mui/material";

export interface VenueDetailsFormData {
  venue: string;
  city: string;
  address: string;
  gates: string[];
}

interface VenueDetailsFormProps {
  venueData: VenueDetailsFormData;
  setVenueData: React.Dispatch<React.SetStateAction<VenueDetailsFormData>>;
}

export const VenueDetailsForm: React.FC<VenueDetailsFormProps> = ({ 
  venueData,
  setVenueData, 
}) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...venueData,
      [name]: value,
    };
    setVenueData(updatedData);
  };

  const handleOnChangeTags = (newValue: string[]) => {
    const updatedData = {
      ...venueData,
      gates: newValue,
    };
    setVenueData(updatedData);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
          Venue Details
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          value={venueData.venue}
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
          value={venueData.city}
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
          value={venueData.address}
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
          value={venueData.gates}
          onChange={(_event, newValue) => handleOnChangeTags(newValue)}
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
  );
};

export default VenueDetailsForm;