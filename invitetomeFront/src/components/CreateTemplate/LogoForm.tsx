import React, { useState } from "react";
import { Box, Typography, TextField, Paper } from "@mui/material";
import LogoUploader from "./LogoUploader";

const LogoForm: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");

  return (
    <Paper elevation={1} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Formulario de invitación
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="Nombre del evento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <LogoUploader onChange={setLogo} />
        {logo && (
          <Typography variant="body2" color="success.main">
            Logo listo para enviar
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default LogoForm;
