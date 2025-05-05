import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { set } from "date-fns";

export interface Zone {
  id: string;
  zoneName: string;
  subZones: SubZone[];
}

export interface SubZone {
  id: string;
  zoneName: string;
}

interface VenueZonesProps {
  zonesForm: Zone[];
  setZonesForm: React.Dispatch<React.SetStateAction<Zone[]>>;
}

export const VenueZones: React.FC<VenueZonesProps> = ({
  zonesForm,
  setZonesForm,
}) => {
  const [newZoneName, setNewZoneName] = useState("");
  const [newSubZoneName, setNewSubZoneName] = useState("");
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null);
  const [editingSubZoneId, setEditingSubZoneId] = useState<string | null>(null);
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null);

  // Zone management functions
  const handleAddZone = () => {
    if (newZoneName.trim() !== "") {
      const newZone: Zone = {
        id: `zone#${Date.now()}`,
        zoneName: newZoneName,
        subZones: [],
      };

      const updatedZones = [...zonesForm, newZone];
      setZonesForm(updatedZones);
      setExpandedZoneId(newZone.id);
      setNewZoneName("");
    }
  };

  const handleAddSubZone = (zoneId: string) => {
    if (newSubZoneName.trim() !== "") {
      const newSubZone: SubZone = {
        id: `subzone#${Date.now()}`,
        zoneName: newSubZoneName,
      };

      const updatedZones = zonesForm.map((zone) =>
        zone.id === zoneId
          ? { ...zone, subZones: [...zone.subZones, newSubZone] }
          : zone
      );

      setZonesForm(updatedZones);
      setNewSubZoneName("");
    }
  };

  const handleDeleteZone = (zoneId: string) => {
    const updatedZones = zonesForm.filter((zone) => zone.id !== zoneId);
    setZonesForm(updatedZones);
  };

  const handleDeleteSubZone = (zoneId: string, subZoneId: string) => {
    const updatedZones = zonesForm.map((zone) =>
      zone.id === zoneId
        ? {
            ...zone,
            subZones: zone.subZones.filter(
              (subZone) => subZone.id !== subZoneId
            ),
          }
        : zone
    );
    setZonesForm(updatedZones);
  };

  const handleEditZoneName = (zoneId: string, newName: string) => {
    const updatedZones = zonesForm.map((zone) =>
      zone.id === zoneId ? { ...zone, zoneName: newName } : zone
    );
    setZonesForm(updatedZones);
    setEditingZoneId(null);
  };

  const handleEditSubZoneName = (
    zoneId: string,
    subZoneId: string,
    newName: string
  ) => {
    const updatedZones = zonesForm.map((zone) =>
      zone.id === zoneId
        ? {
            ...zone,
            subZones: zone.subZones.map((subZone) =>
              subZone.id === subZoneId
                ? { ...subZone, zoneName: newName }
                : subZone
            ),
          }
        : zone
    );
    setZonesForm(updatedZones);
    setEditingSubZoneId(null);
  };

  const handleAccordionChange = (zoneId: string) => {
    setExpandedZoneId(expandedZoneId === zoneId ? null : zoneId);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
          Zones
        </Typography>
      </Grid>

      {/* Add new zone */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                fullWidth
                label="Add"
                variant="outlined"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
                placeholder="E.g. Backstage, VIP Area, Main Stage"
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddZone}
              >
                Add
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* List of zones */}
      {zonesForm.map((zone) => (
        <Grid item xs={12} key={zone.id}>
          <Accordion
            expanded={expandedZoneId === zone.id}
            onChange={() => handleAccordionChange(zone.id)}
            sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%", pr: 2 }}
              >
                {editingZoneId === zone.id ? (
                  <TextField
                    value={zone.zoneName}
                    onChange={(e) =>
                      handleEditZoneName(zone.id, e.target.value)
                    }
                    variant="outlined"
                    size="small"
                    autoFocus
                    onBlur={() => setEditingZoneId(null)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleEditZoneName(
                          zone.id,
                          (e.target as HTMLInputElement).value
                        );
                      }
                    }}
                  />
                ) : (
                  <Typography variant="subtitle1">{zone.zoneName} - Zone</Typography>
                )}
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingZoneId(zone.id);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteZone(zone.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </AccordionSummary>

            <AccordionDetails>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Sub-zones
              </Typography>

              {/* Display subzones as chips */}
              <Box sx={{ mb: 2 }}>
                {zone.subZones.length > 0 ? (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {zone.subZones.map((subZone) => (
                      <Chip
                        key={subZone.id}
                        label={
                          editingSubZoneId === subZone.id ? (
                            <TextField
                              value={subZone.zoneName}
                              onChange={(e) =>
                                handleEditSubZoneName(
                                  zone.id,
                                  subZone.id,
                                  e.target.value
                                )
                              }
                              variant="standard"
                              size="small"
                              autoFocus
                              onBlur={() => setEditingSubZoneId(null)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleEditSubZoneName(
                                    zone.id,
                                    subZone.id,
                                    (e.target as HTMLInputElement).value
                                  );
                                }
                              }}
                              sx={{ width: "100px" }}
                            />
                          ) : (
                            subZone.zoneName
                          )
                        }
                        sx={{
                          bgcolor: "#7799CC",
                          color: "white",
                          fontWeight: "bold",
                          mb: 1,
                        }}
                        onDelete={() =>
                          handleDeleteSubZone(zone.id, subZone.id)
                        }
                        onClick={() => setEditingSubZoneId(subZone.id)}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No sub-zones defined yet
                  </Typography>
                )}
              </Box>

              {/* Add new subzone */}
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  label="Add new sub-zone"
                  variant="outlined"
                  size="small"
                  value={newSubZoneName}
                  onChange={(e) => setNewSubZoneName(e.target.value)}
                  placeholder="E.g. Section A, Green Room"
                />
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddSubZone(zone.id)}
                  size="medium"
                >
                  Add
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </>
  );
};

export default VenueZones;
