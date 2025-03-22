import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface QuotaType {
  id: string;
  name: string;
  quantity: number;
  color: string;
  description?: string;
}

const defaultQuotas: QuotaType[] = [
  { id: '1', name: 'GENERAL', quantity: 0, color: '#2196f3', description: 'Standard admission' },
  { id: '2', name: 'VIP', quantity: 0, color: '#f50057', description: 'VIP access and benefits' },
  { id: '3', name: 'COMPROMIS', quantity: 0, color: '#9c27b0', description: 'Reserved for partners' },
  { id: '4', name: 'BACKSTAGE', quantity: 0, color: '#ff9800', description: 'Backstage access' },
];

export const Quotas = () => {
  const [quotas, setQuotas] = useState<QuotaType[]>(defaultQuotas);
  const [totalInvitations, setTotalInvitations] = useState<number>(0);

  const handleQuotaChange = (id: string, value: number) => {
    setQuotas(quotas.map(quota => 
      quota.id === id ? { ...quota, quantity: value } : quota
    ));
  };

  const handleTotalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTotal = parseInt(event.target.value) || 0;
    setTotalInvitations(newTotal);
  };

  const getQuotasSum = () => quotas.reduce((sum, quota) => sum + quota.quantity, 0);
  const getRemainingQuota = () => totalInvitations - getQuotasSum();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', pt: 2 }}>
      {/* Total Invitations Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Total Event Capacity
        </Typography>
        <TextField
          type="number"
          label="Total Invitations"
          value={totalInvitations}
          onChange={handleTotalChange}
          fullWidth
          InputProps={{ inputProps: { min: 0 } }}
          helperText="Set the total number of invitations for this event"
        />
      </Paper>

      {/* Quotas Distribution Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Invitation Types & Quotas
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotas.map((quota) => (
                <TableRow key={quota.id}>
                  <TableCell>
                    <Chip
                      label={quota.name}
                      sx={{
                        bgcolor: quota.color,
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{quota.description}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={quota.quantity}
                      onChange={(e) => handleQuotaChange(quota.id, parseInt(e.target.value) || 0)}
                      InputProps={{ inputProps: { min: 0 } }}
                      size="small"
                      sx={{ width: 100 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary Section */}
        <Box sx={{ mt: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2">Total Capacity</Typography>
              <Typography variant="h6">{totalInvitations}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2">Allocated</Typography>
              <Typography variant="h6" color={getQuotasSum() > totalInvitations ? 'error' : 'inherit'}>
                {getQuotasSum()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2">Remaining</Typography>
              <Typography 
                variant="h6" 
                color={getRemainingQuota() < 0 ? 'error' : 'inherit'}
              >
                {getRemainingQuota()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Quotas;
