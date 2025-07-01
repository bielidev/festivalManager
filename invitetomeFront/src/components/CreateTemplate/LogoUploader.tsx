import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

interface LogoUploaderProps {
  onChange: (field: string, value: string | null) => void;
  language: string;
  translations: any;
  value?: string | null;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  onChange,
  language,
  translations,
  value = null,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value || "");
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [visible, setVisible] = useState(true);

  const isValidImageUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return /\.(jpg|jpeg|png|gif|svg)$/i.test(parsed.pathname);
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setInputValue(url);
    setError(false);

    if (!url) {
      setPreview(null);
      onChange("logoUrl", null);
      return;
    }

    if (!isValidImageUrl(url)) {
      setError(true);
      setPreview(null);
      onChange("logoUrl", null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setPreview(url);
      setError(false);
      onChange("logoUrl", url);
    };
    img.onerror = () => {
      setError(true);
      setPreview(null);
      onChange("logoUrl", null);
    };
    img.src = url;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) {
      setError(true);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreview(result);
      setInputValue("");
      setError(false);
      onChange("logoUrl", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label={translations[language].logoUrl.title || "Invitation Logo"}
        placeholder={
          translations[language].logoUrl.logotypePlaceholder ||
          "Pega la URL o sube una imagen"
        }
        value={inputValue}
        onChange={handleUrlChange}
        error={error}
        helperText={
          error
            ? translations[language].logoUrl.upLoadError || "URL inválida"
            : translations[language].logoUrl.pasteDirectURL ||
              "Pega una URL directa o usa el botón para subir una imagen"
        }
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="small"
              >
                {translations[language].logoUrl.uploadFromPC || "Archivo"}
              </Button>
              <IconButton onClick={() => setVisible(!visible)} edge="end">
                {visible ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            "& fieldset": {
              borderColor: visible ? "#2563eb" : "grey.300",
            },
            "&:hover fieldset": {
              borderColor: visible ? "#1d4ed8" : "grey.500",
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
      />

      {preview?.startsWith("data:image") && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, color: "grey.600" }}>
            {translations[language].logoUrl.logotypePreview || "Vista previa"}
          </Typography>
          <Box
            component="img"
            src={preview}
            alt="preview"
            sx={{
              maxWidth: "100%",
              maxHeight: 150,
              borderRadius: 2,
              border: "1px solid #eee",
              boxShadow: 1,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LogoUploader;
