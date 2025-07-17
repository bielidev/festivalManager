import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface AddLinkFieldModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, placeholder: string, position: string) => void;
  defaultFields: string[];
}

const AddLinkFieldModal: React.FC<AddLinkFieldModalProps> = ({
  open,
  onClose,
  onAdd,
  defaultFields,
}) => {
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("https://");
  const [position, setPosition] = useState(defaultFields[0] || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && position) {
      onAdd(name, placeholder, position);
      setName("");
      setPlaceholder("https://");
      setPosition(defaultFields[0] || "");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Link Field</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Field Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={defaultFields.includes(name)}
            helperText={
              defaultFields.includes(name)
                ? "This field name is already in use"
                : ""
            }
          />
          <TextField
            margin="dense"
            label="Default URL"
            fullWidth
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Position</InputLabel>
            <Select
              value={position}
              label="Position"
              onChange={(e) => setPosition(e.target.value)}
            >
              {defaultFields.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={!name || defaultFields.includes(name)}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLinkFieldModal;
