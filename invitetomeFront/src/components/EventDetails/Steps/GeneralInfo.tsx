import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEventStorageContext } from "../EventContext/EventStorageContext";

export interface GeneralInfoForm {
  eventCode: string;
  eventName: string;
  tags: string[];
}

export const GeneralInfo = () => {
  const { id } = useParams();
  const eventId = id || "";
  const { eventCoreStorageApi } = useEventStorageContext();

  const [generalInfoForm, setGeneralInfoForm] = useState<GeneralInfoForm>({
    eventCode: "",
    eventName: "",
    tags: [],
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    const eventGeneralData = eventCoreStorageApi.getEventGeneralData(eventId);
    if (eventGeneralData) {
      setGeneralInfoForm({
        eventCode: eventGeneralData.eventCode,
        eventName: eventGeneralData.eventName,
        tags: eventGeneralData.tags,
      });
    }
    else {
      setGeneralInfoForm({
        eventCode: "",
        eventName: "",
        tags: [],
      });
    }
  }, [eventId]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...generalInfoForm,
      [name]: value,
    }
    setGeneralInfoForm(updatedData);
    eventCoreStorageApi.updateEventGeneralData(eventId, updatedData);

  };

  const handleOnChangeTags = (newValue: string[], field: string) => {
    const updatedTags = {
      ...generalInfoForm,
      [field]: newValue,
    }
    setGeneralInfoForm(updatedTags);
    eventCoreStorageApi.updateEventGeneralData(eventId, updatedTags);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={3}>
        {/* Event Basic Info */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Basic Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={generalInfoForm.eventCode}
            fullWidth
            label="Event Code"
            variant="outlined"
            required
            onChange={handleOnChange}
            name="eventCode"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            value={generalInfoForm.eventName}
            fullWidth
            label="Event Name"
            variant="outlined"
            required
            onChange={handleOnChange}
            name="eventName"
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            value={generalInfoForm.tags}
            onChange={(_e, newValue) => handleOnChangeTags(newValue, "tags")}
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
                label="Tags"
                variant="outlined"
                placeholder="Add tags"
              />
            )}
          />
        </Grid>

        {/* Event Logo Upload */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Event Logo
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </Button>

            {/* Logo Preview */}
            {logoPreview && (
              <Box
                sx={{
                  mt: 1,
                  width: 100,
                  height: 100,
                  borderRadius: 1,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logoPreview}
                  alt="Event Logo Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInfo;
