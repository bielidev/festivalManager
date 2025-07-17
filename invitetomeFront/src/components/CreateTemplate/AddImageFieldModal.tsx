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

interface AddImageFieldModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, position: string) => void;
  defaultFields: string[];
}

const AddImageFieldModal: React.FC<AddImageFieldModalProps> = ({
  open,
  onClose,
  onAdd,
  defaultFields,
}) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(defaultFields[0] || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && position) {
      onAdd(name, position);
      setName("");
      setPosition("content");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Image Field</DialogTitle>
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

export default AddImageFieldModal;
