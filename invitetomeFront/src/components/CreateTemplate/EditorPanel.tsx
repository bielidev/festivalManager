import React from 'react';
import { Box, TextField, Switch, FormControlLabel } from '@mui/material';

interface EditorPanelProps {
  fields: { [key: string]: string };
  visibility: { [key: string]: boolean };
  customFields: { name: string; placeholder: string; position: string }[];
  defaultFields: string[];
  language: string;
  translations: any;
  onInputChange: (field: string, value: string) => void;
  onToggleVisibility: (field: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  fields,
  visibility,
  customFields,
  defaultFields,
  onInputChange,
  onToggleVisibility,
}) => {
  // Combine defaultFields and customFields into an ordered list
  const orderedFields = [...defaultFields]; // Start with default fields in their order

  // Insert custom fields after their specified position
  customFields.forEach(({ name, position }) => {
    const positionIndex = orderedFields.indexOf(position);
    if (positionIndex !== -1) {
      // Insert after the position field
      orderedFields.splice(positionIndex + 1, 0, name);
    } else {
      // Fallback: append if position not found (shouldn’t happen with valid data)
      orderedFields.push(name);
    }
  });

  return (
    <Box sx={{ p: 2 }}>
      {orderedFields.map((field) => (
        <Box key={field} sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={visibility[field] || false}
                onChange={() => onToggleVisibility(field)}
              />
            }
            label={field}
          />
          {visibility[field] && (
            <TextField
              fullWidth
              label={field}
              value={fields[field] || ''}
              onChange={(e) => onInputChange(field, e.target.value)}
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default EditorPanel;