import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import qrPlaceholder from "../../assets/attachment_preview.png";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import StyleIcon from "@mui/icons-material/Style";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

interface PreviewPanelProps {
  fields: { [key: string]: string };
  visibility: { [key: string]: boolean };
  customFields: { name: string; placeholder: string; position: string }[];
  defaultFields: string[];
  language: string;
  translations: { [key: string]: { [key: string]: string } };
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  fields,
  visibility,
  customFields,
  language,
  translations,
}) => {
  const renderCustomFieldsInSection = (sectionFields: string[]) => {
    return customFields
      .filter((cf) => sectionFields.includes(cf.position))
      .map((field) =>
        visibility[field.name] ? (
          <Typography key={field.name} variant="body1" sx={{ mb: 1 }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {field.name}:
            </Box>{" "}
            <Box component="span">{fields[field.name]}</Box>
          </Typography>
        ) : null
      );
  };

  return (
    <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 800,
          mx: "auto",
          bgcolor: "#fff",
          borderRadius: "2rem",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#1c2733",
            textAlign: "center",
            color: "white",
            borderTopLeftRadius: "2rem",
            borderTopRightRadius: "2rem",
            p: 1,
          }}
        >
          {visibility.logoUrl && (
            <Box
              component="img"
              src={fields.logoUrl}
              alt="Company Logo"
              sx={{
                maxWidth: "200px",
                height: "auto",
                mb: 2,
              }}
            />
          )}
          {visibility.header && (
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              {fields.header}
            </Typography>
          )}
          {renderCustomFieldsInSection(["logoUrl", "header"])}
        </Box>

        {/* Contact Details */}
        {(visibility.contactName ||
          visibility.contactEmail ||
          visibility.contactPhone) && (
          <Box sx={{ display: "flex", gap: 4, mb: 4, p: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    borderBottom: "1px solid #ccc",
                    pb: 1,
                    mb: 2,
                  }}
                >
                  {translations[language]?.contactDetails || "Contact Details"}
                </Typography>
                {visibility.contactName && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                      <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                    </Box>{" "}
                    {fields.contactName}
                  </Typography>
                )}
                {visibility.contactEmail && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                    </Box>{" "}
                    {fields.contactEmail}
                  </Typography>
                )}
                {visibility.contactPhone && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                    </Box>{" "}
                    {fields.contactPhone}
                  </Typography>
                )}
                {renderCustomFieldsInSection([
                  "contactName",
                  "contactEmail",
                  "contactPhone",
                ])}
              </Box>
            </Box>
          </Box>
        )}
        {/* Event Details */}
        <Box sx={{ mb: 4 }}>
          {visibility.eventName && (
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontSize: "1.5rem",
                lineHeight: 1.334,
                letterSpacing: "0.0075em",
                "& .label": {
                  color: "text.secondary",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  marginRight: 1,
                },
              }}
            >
              <Box component="span" className="label">
                {translations[language]?.eventName || "Event"}:
              </Box>
              {fields.eventName}
            </Typography>
          )}
          {visibility.eventDate && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {translations[language]?.eventDate || "Date"}:
              </Box>{" "}
              {fields.eventDate}
            </Typography>
          )}
          {visibility.eventLocation && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {translations[language]?.eventLocation || "Location"}:
              </Box>{" "}
              {fields.eventLocation}
            </Typography>
          )}
          {visibility.eventDescription && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {translations[language]?.eventDescription || "Description"}:
              </Box>{" "}
              <Box component="span" sx={{ whiteSpace: "pre-wrap" }}>
                {fields.eventDescription}
              </Box>
            </Typography>
          )}
          {renderCustomFieldsInSection([
            "eventName",
            "eventDate",
            "eventLocation",
            "eventDescription",
          ])}
        </Box>

        {/* QR Code */}
        {visibility.qrInstruction && (
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Box
              component="img"
              src={qrPlaceholder}
              alt="QR Code"
              sx={{
                width: "150px",
                height: "auto",
                mb: 2,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {fields.qrInstruction}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Footer */}
        <Box sx={{ textAlign: "center" }}>
          {visibility.footerText1 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, color: "red", fontWeight: 550 }}
            >
              {fields.footerText1}
            </Typography>
          )}
          {visibility.footerText2 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {fields.footerText2}
            </Typography>
          )}
          {visibility.footerText2 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {translations[language]?.poweredBy || "Powered by"}:
              </Box>{" "}
              {fields.poweredBy}
            </Typography>
          )}
          {renderCustomFieldsInSection([
            "footerText1",
            "footerText2",
            "poweredBy",
          ])}
        </Box>
      </Paper>
    </Box>
  );
};

export default PreviewPanel;
