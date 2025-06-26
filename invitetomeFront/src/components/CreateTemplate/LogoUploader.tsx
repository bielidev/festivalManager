import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];

const isValidImageUrl = (url: string) =>
  /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(url);

interface LogoUploaderProps {
  onChange?: (logo: string | null) => void;
  alt?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  onChange,
  alt = "Vista previa del logo",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cuando se sube archivo, limpia el campo URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && IMAGE_TYPES.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target?.result as string);
        setFileName(file.name);
        setUrlInput("");
        if (onChange) onChange(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cuando se ingresa URL, limpia el archivo
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setUrlInput(url);
    setFileName("");
    if (isValidImageUrl(url)) {
      setPreview(url);
      if (onChange) onChange(url);
    } else if (url === "") {
      setPreview(null);
      if (onChange) onChange(null);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 3, maxWidth: 400, mx: "auto", mt: 2 }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Logo de la invitación
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          component="label"
          sx={{ alignSelf: "flex-start" }}
        >
          Subir imagen desde tu computadora
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.svg"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {fileName && (
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            Archivo seleccionado: {fileName}
          </Typography>
        )}
        <Divider sx={{ my: 1 }}>o</Divider>
        <TextField
          label="URL de una imagen (.jpg, .png, .gif, .svg)"
          type="url"
          placeholder="https://ejemplo.com/logo.png"
          value={urlInput}
          onChange={handleUrlChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        {preview && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Vista previa:
            </Typography>
            <Box
              component="img"
              src={preview}
              alt={alt}
              sx={{
                maxHeight: 160,
                maxWidth: "100%",
                borderRadius: 2,
                border: "1px solid #eee",
                boxShadow: 1,
              }}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default LogoUploader;
