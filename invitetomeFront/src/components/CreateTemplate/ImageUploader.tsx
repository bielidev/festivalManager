import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label,
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      {label && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {label}
        </Typography>
      )}
      <Box
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
        component="label"
      >
        {preview ? (
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              maxWidth: "100%",
              maxHeight: 200,
              objectFit: "contain",
            }}
          />
        ) : (
          <ImageIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <Button variant="outlined" component="span">
          {preview ? "Change Image" : "Upload Image"}
        </Button>
      </Box>
    </Box>
  );
};

export default ImageUploader;
