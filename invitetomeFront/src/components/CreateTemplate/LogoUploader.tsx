import React, { useRef, useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, UploadFile } from "@mui/icons-material";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

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
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlValue, setUrlValue] = useState(value);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  const isValidImageUrl = (url: string) => {
    if (url.startsWith("data:image/")) {
      return true;
    }

    try {
      const parsed = new URL(url);
      return /\.(jpg|jpeg|png|gif|svg)$/i.test(parsed.pathname);
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setUrlValue(url);
    setFileName("");
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
      setPreview(null);
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

    if (!IMAGE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) {
      setError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreview(result);
      setUrlValue("");
      setFileName(file.name);
      setError(false);
      onChange("logoUrl", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <TextField
        fullWidth
        label={
          translations[language].logoUrl.logotypePlaceholder ||
          "Invitation Logo"
        }
        value={urlValue}
        onChange={handleUrlChange}
        error={error}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setVisible(!visible)} edge="end">
                {visible ? (
                  <Visibility fontSize="small" sx={{ color: "#2563eb" }} />
                ) : (
                  <VisibilityOff fontSize="small" sx={{ color: "grey.500" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
      <TextField
        fullWidth
        placeholder={
          translations[language].logoUrl.uploadFromPC ||
          "Upload logotype from your PC"
        }
        value={fileName}
        onClick={() => fileInputRef.current?.click()}
        readOnly
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => fileInputRef.current?.click()}
                edge="end"
              >
                <UploadFile fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          cursor: "pointer",
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
        <>
          <Typography variant="body2" sx={{ mb: 1, color: "grey.600" }}>
            {translations[language].logoUrl.logotypePreview || "Vista previa"}
          </Typography>
          <img
            src={preview}
            alt="preview"
            style={{
              maxWidth: "100%",
              maxHeight: 150,
              borderRadius: 8,
              border: "1px solid #eee",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              display: "block",
              marginBottom: 16,
            }}
          />
        </>
      )}
    </>
  );
};

export default LogoUploader;
