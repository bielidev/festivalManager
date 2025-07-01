import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogoUploader from "./LogoUploader";

interface EditorPanelProps {
  fields: { [key: string]: string };
  visibility: { [key: string]: boolean };
  customFields: { name: string; placeholder: string; position: string }[];
  defaultFields: string[];
  language: string;
  translations: any;
  onInputChange: (field: string, value: string | null) => void;
  onToggleVisibility: (field: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  fields,
  visibility,
  customFields,
  defaultFields,
  onInputChange,
  onToggleVisibility,
  language,
  translations,
}) => {
  const orderedFields = [...defaultFields];

  customFields.forEach(({ name, position }) => {
    const positionIndex = orderedFields.indexOf(position);
    if (positionIndex !== -1) {
      orderedFields.splice(positionIndex + 1, 0, name);
    } else {
      orderedFields.push(name);
    }
  });

  const showLogoUploader =
    orderedFields.includes("logoUrl") && visibility.logoUrl;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ mr: 1 }}>Customize Email Template Fields</Typography>
        <IconButton
          onClick={() =>
            orderedFields.forEach((field) => onToggleVisibility(field))
          }
          sx={{ color: "grey.500" }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      </Box>

      {showLogoUploader && (
        <Box sx={{ mb: 2 }}>
          <LogoUploader
            language={language}
            translations={translations}
            onChange={(_, value) => onInputChange("logoUrl", value)}
            value={fields.logoUrl}
          />
        </Box>
      )}

      {orderedFields.map((field) => {
        if (field === "logoUrl") return null;

        if (field === "pickupLocation") {
          if (!visibility[field]) return null;
          return (
            <Box key={field} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label={
                  translations[language]?.pickupLocation || "Pickup Location"
                }
                value={fields[field] || ""}
                onChange={(e) => onInputChange(field, e.target.value)}
                variant="outlined"
                size="small"
                disabled={!visibility[field]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    "& fieldset": {
                      borderColor: visibility[field] ? "#2563eb" : "grey.300",
                    },
                    "&:hover fieldset": {
                      borderColor: visibility[field] ? "#1d4ed8" : "grey.500",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "grey.600",
                    "&.Mui-focused": {
                      color: "#2563eb",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => onToggleVisibility(field)}
                        edge="end"
                        sx={{
                          color: visibility[field] ? "#2563eb" : "grey.500",
                          "&:hover": {
                            color: "#1d4ed8",
                          },
                        }}
                      >
                        {visibility[field] ? (
                          <Visibility fontSize="small" />
                        ) : (
                          <VisibilityOff fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          );
        }

        return (
          <Box key={field} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label={translations[language]?.[field] || field}
              value={fields[field] || ""}
              onChange={(e) => onInputChange(field, e.target.value)}
              variant="outlined"
              size="small"
              disabled={!visibility[field]}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  "& fieldset": {
                    borderColor: visibility[field] ? "#2563eb" : "grey.300",
                  },
                  "&:hover fieldset": {
                    borderColor: visibility[field] ? "#1d4ed8" : "grey.500",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey.600",
                  "&.Mui-focused": {
                    color: "#2563eb",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => onToggleVisibility(field)}
                      edge="end"
                      sx={{
                        color: visibility[field] ? "#2563eb" : "grey.500",
                        "&:hover": {
                          color: "#1d4ed8",
                        },
                      }}
                    >
                      {visibility[field] ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default EditorPanel;
