import { useState } from 'react';
import { Box, Grid, Typography, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 600, mx: 'auto', pt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Event Schedule
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <DateTimePicker
              label="Start Date & Time"
              value={startDate}
              onChange={(newValue: Date | null) => setStartDate(newValue)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateTimePicker
              label="End Date & Time"
              value={endDate}
              onChange={(newValue: Date | null) => setEndDate(newValue)}
              minDateTime={startDate || undefined}
              sx={{ width: '100%' }}
            />
          </Grid>
          
          {/* Additional Schedule Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
              Additional Schedule Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Doors Open Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Schedule Notes"
              placeholder="Add any additional schedule information or special timing instructions..."
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
