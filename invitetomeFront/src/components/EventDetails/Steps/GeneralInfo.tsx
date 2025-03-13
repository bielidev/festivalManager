import { Box, TextField, Grid, Typography, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export const GeneralInfo = () => {
  const [artists, setArtists] = useState<string[]>([]);
  const [newArtist, setNewArtist] = useState('');

  const handleAddArtist = () => {
    if (newArtist.trim()) {
      setArtists([...artists, newArtist.trim()]);
      setNewArtist('');
    }
  };

  const handleDeleteArtist = (artistToDelete: string) => {
    setArtists(artists.filter(artist => artist !== artistToDelete));
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={3}>
        {/* Event Basic Info */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Event Name"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Event Tag"
            variant="outlined"
            helperText="Short identifier for your event"
          />
        </Grid>

        {/* Venue Information */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Venue Details</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Venue Name"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            type="tel"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            required
            multiline
            rows={2}
          />
        </Grid>

        {/* Artists Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Artists/Performers</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Add Artist"
              variant="outlined"
              value={newArtist}
              onChange={(e) => setNewArtist(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddArtist();
                }
              }}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleAddArtist}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {artists.map((artist, index) => (
              <Chip
                key={index}
                label={artist}
                onDelete={() => handleDeleteArtist(artist)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>

        {/* Event Logo Upload */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Event Logo</Typography>
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 1 }}
          >
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
            />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInfo;
