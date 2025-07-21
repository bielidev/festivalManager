import React from "react";
import { Box, Typography, Paper, Divider, Grid, Button } from "@mui/material";
import qrPlaceholder from "../../assets/attachment_preview.png";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import InfoIcon from "@mui/icons-material/Info";

interface PreviewPanelProps {
  fields: { [key: string]: string };
  visibility: { [key: string]: boolean };
  customFields: {
    name: string;
    placeholder: string;
    position: string;
    type?: "text" | "image" | "link";
    variant?: "link" | "button";
  }[];
  defaultFields: string[];
  language: string;
  translations: { [key: string]: { [key: string]: string } };
  templateStyles: { [key: string]: string } | undefined;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  fields,
  visibility,
  customFields,
  language,
  translations,
  templateStyles,
}) => {
  const renderCustomFieldsInSection = (sectionFields: string[]) => {
    return customFields
      .filter((cf) => sectionFields.includes(cf.position))
      .map((field) => {
        if (!visibility[field.name]) return null;

        if (field.type === "link" && fields[field.name]) {
          return (
            <Typography
              key={field.name}
              variant="body1"
              sx={{
                mb: 1,
                fontFamily: templateStyles?.bodyFontFamily || "Roboto, serif",
              }}
            >
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {field.name}:
              </Box>{" "}
              {field.variant === "link" ? (
                <Box
                  component="a"
                  href={fields[field.name]}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#2563eb", textDecoration: "underline" }}
                >
                  {fields[field.name]}
                </Box>
              ) : (
                <Button
                  onClick={() => (window.location.href = fields[field.name])}
                >
                  {fields[field.name]}
                </Button>
              )}
            </Typography>
          );
        }

        if (field.type === "image" && fields[field.name]) {
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  fontFamily: templateStyles?.bodyFontFamily || "Roboto, serif",
                }}
              >
                {field.name}:
              </Typography>
              <Box
                component="img"
                src={fields[field.name]}
                alt={field.name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  borderRadius: 1,
                }}
              />
            </Box>
          );
        }

        return (
          <Typography
            key={field.name}
            variant="body1"
            sx={{
              mb: 1,
              fontFamily: templateStyles?.bodyFontFamily || "Roboto, serif",
            }}
          >
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {field.name}:
            </Box>{" "}
            <Box component="span">{fields[field.name]}</Box>
          </Typography>
        );
      });
  };

  const openGoogleMaps = (location?: string) => {
    if (!location) return;
    const query = encodeURIComponent(location);
    const mapUrl = `https://www.google.com/maps?q=${query}`;
    window.open(mapUrl, "_blank");
  };

  const openGoogleCalendar = ({
    eventName,
    startDate,
    endDate,
    location,
    description,
  }: {
    eventName?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    description?: string;
  }) => {
    if (!eventName || !startDate) return;

    const formatDate = (dateString: string) => {
      try {
        return new Date(dateString).toISOString().replace(/[-:]|\.\d{3}/g, "");
      } catch {
        return "";
      }
    };

    const start = formatDate(startDate);
    const end = formatDate(endDate || startDate);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventName
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      description || ""
    )}&location=${encodeURIComponent(location || "")}`;

    window.open(calendarUrl, "_blank");
  };

  return (
    <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 800,
          mx: "auto",
          bgcolor: templateStyles?.bodyBackgroundColor || "#ffffff",
          borderRadius: "2rem",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: templateStyles?.headerBackgroundColor || "#ffffff",
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
                mt: 2,
              }}
            />
          )}
          {visibility.header && (
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: templateStyles?.titleColor || "#1c1c1c",
                fontFamily: templateStyles?.titleFontFamily || "Roboto, serif",
              }}
            >
              {fields.header}
            </Typography>
          )}
          {renderCustomFieldsInSection(["logoUrl", "header"])}
        </Box>
        {/* Contact Details */}
        {(visibility.contactName ||
          visibility.contactEmail ||
          visibility.contactPhone) && (
          <Box sx={{ display: "flex", gap: 4, mt: 4, p: 3 }}>
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
                    color: templateStyles?.titleColor || "#1c1c1c",
                    fontFamily:
                      templateStyles?.titleFontFamily || "Roboto, serif",
                  }}
                >
                  {translations[language]?.contactDetails || "Contact Details"}
                </Typography>
                {visibility.contactName && (
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      color: templateStyles?.textColor || "#333333",
                      fontFamily:
                        templateStyles?.bodyFontFamily || "Roboto, serif",
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                      <PersonIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: templateStyles?.iconColor || "#333335",
                        }}
                      />
                    </Box>{" "}
                    {fields.contactName}
                  </Typography>
                )}
                {visibility.contactEmail && (
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      color: templateStyles?.textColor || "#333333",
                      fontFamily:
                        templateStyles?.bodyFontFamily || "Roboto, serif",
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                      <EmailIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: templateStyles?.iconColor || "#333335",
                        }}
                      />
                    </Box>{" "}
                    {fields.contactEmail}
                  </Typography>
                )}
                {visibility.contactPhone && (
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      color: templateStyles?.textColor || "#333333",
                      fontFamily:
                        templateStyles?.bodyFontFamily || "Roboto, serif",
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                      <PhoneIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: templateStyles?.iconColor || "#333335",
                        }}
                      />
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
                  color: templateStyles?.titleColor || "#1c1c1c",
                  fontFamily:
                    templateStyles?.titleFontFamily || "Roboto, serif",
                }}
              >
                {translations[language]?.eventName || "Event"}
              </Typography>
              {visibility.eventName && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    color: templateStyles?.textColor || "#333333",
                    fontFamily:
                      templateStyles?.bodyFontFamily || "Roboto, serif",
                  }}
                >
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    <ConfirmationNumberIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: templateStyles?.iconColor || "#333335",
                      }}
                    />
                  </Box>{" "}
                  {fields.eventName}
                </Typography>
              )}
              {visibility.eventDate && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    color: templateStyles?.textColor || "#333333",
                    fontFamily:
                      templateStyles?.bodyFontFamily || "Roboto, serif",
                  }}
                >
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    <CalendarTodayIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: templateStyles?.iconColor || "#333335",
                      }}
                    />
                  </Box>{" "}
                  {fields.eventDate}
                </Typography>
              )}

              {visibility.pickupLocation && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    color: templateStyles?.textColor || "#333333",
                    fontFamily:
                      templateStyles?.bodyFontFamily || "Roboto, serif",
                  }}
                >
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    <HotelIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: templateStyles?.iconColor || "#333335",
                      }}
                    />
                  </Box>
                  {fields.pickupLocation}
                </Typography>
              )}

              {visibility.eventLocation && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    color: templateStyles?.textColor || "#333333",
                    fontFamily:
                      templateStyles?.bodyFontFamily || "Roboto, serif",
                  }}
                >
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    <LocationOnIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: templateStyles?.iconColor || "#333335",
                      }}
                    />
                  </Box>
                  {fields.eventLocation}
                </Typography>
              )}

              {visibility.eventDescription && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    color: templateStyles?.textColor || "#333333",
                    fontFamily:
                      templateStyles?.bodyFontFamily || "Roboto, serif",
                    backgroundColor:
                      templateStyles?.infoBackgroundColor ||
                      templateStyles?.bodyBackgroundColor,
                    padding: templateStyles?.iconPadding || "0px",
                  }}
                >
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    <InfoIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: templateStyles?.iconColor2 || "#333335",
                      }}
                    />
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
                "pickupLocation",
                "eventDescription",
              ])}
            </Box>
          </Box>
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
        {/* Buttons */}
        <Box sx={{ px: 3, pb: 2 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => openGoogleMaps(fields.eventLocation)}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  borderColor: templateStyles?.buttonPrimaryColor || "#90caf9",
                  color: templateStyles?.buttonPrimaryTextColor || "#1976d2",
                  paddingY: 1.2,
                  "&:hover": {
                    backgroundColor:
                      templateStyles?.buttonPrimaryHover || "#e3f2fd",
                    borderColor: "#64b5f6",
                  },
                }}
              >
                View Event Map
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                  openGoogleCalendar({
                    eventName: fields.eventName,
                    startDate: fields.eventDate,
                    endDate: fields.eventEndDate,
                    location: fields.eventLocation,
                    description: fields.eventDescription,
                  })
                }
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  borderColor:
                    templateStyles?.buttonSecondaryColor || "#a5d6a7",
                  color: templateStyles?.buttonSecondaryTextColor || "#388e3c",
                  paddingY: 1.2,
                  "&:hover": {
                    backgroundColor:
                      templateStyles?.buttonSecondaryHover || "#e8f5e9",
                    borderColor: "#81c784",
                  },
                }}
              >
                Add to Calendar
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />
        {/* Footer */}
        <Box sx={{ textAlign: "center" }}>
          {visibility.footerText1 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                color: "red",
                fontWeight: 550,
                fontFamily: templateStyles?.bodyFontFamily || "Roboto, serif",
              }}
            >
              {fields.footerText1}
            </Typography>
          )}
          {visibility.footerText2 && (
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                color: templateStyles?.footerTextColor || "#78909c",
                fontFamily: templateStyles?.bodyFontFamily || "Roboto, serif",
              }}
            >
              {fields.footerText2}
            </Typography>
          )}
          {visibility.footerText2 && (
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                color: templateStyles?.footerTextColor || "#78909c",
                fontFamily: templateStyles?.bodyFontFamily || "Roboto, serif",
              }}
            >
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
