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
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

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
  const [urlError, setUrlError] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!IMAGE_TYPES.includes(file.type)) {
        setFileError("Formato de archivo no soportado.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError("El archivo supera el tamaño máximo de 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setPreview(result);
        setFileName(file.name);
        setUrlInput("");
        setUrlError(false);
        setFileError(null);
        if (onChange) onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setUrlInput(url);
    setFileName("");
    setFileError(null);
    setPreview(null);

    if (url === "") {
      setUrlError(false);
      if (onChange) onChange(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setPreview(url);
      setUrlError(false);
      if (onChange) onChange(url);
    };
    img.onerror = () => {
      setPreview(null);
      setUrlError(true);
      if (onChange) onChange(null);
    };
    img.src = url;
  };

  const handleClear = () => {
    setPreview(null);
    setUrlInput("");
    setFileName("");
    setUrlError(false);
    setFileError(null);
    if (onChange) onChange(null);
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
          aria-label="Subir imagen desde tu pc"
        >
          Subir imagen desde tu pc
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

        {fileError && (
          <Typography variant="body2" color="error" sx={{ ml: 1 }}>
            {fileError}
          </Typography>
        )}

        <Divider sx={{ my: 1 }}>o</Divider>

        <TextField
          label="URL de una imagen"
          type="url"
          placeholder="https://ejemplo.com/logo.png"
          value={urlInput}
          onChange={handleUrlChange}
          variant="outlined"
          size="small"
          fullWidth
          error={urlError}
          helperText={
            urlError
              ? "No se pudo cargar la imagen desde la URL proporcionada."
              : "Pega la URL directa de una imagen"
          }
        />

        {preview && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              gap: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
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
            <Button
              variant="text"
              color="error"
              size="small"
              onClick={handleClear}
            >
              Quitar logo
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default LogoUploader;
