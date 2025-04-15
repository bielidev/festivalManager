import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';

interface QuotaAllocation {
  type: string;
  quantity: number;
}

interface Bundle {
  id: string;
  sponsorName: string;
  email: string;
  quotas: QuotaAllocation[];
  totalInvitations: number;
}

export const Bundles = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBundle, setCurrentBundle] = useState<Bundle | null>(null);

  const quotaTypes = ['GENERAL', 'VIP', 'COMPROMIS', 'BACKSTAGE'];

  const handleOpenDialog = (bundle?: Bundle) => {
    if (bundle) {
      setCurrentBundle(bundle);
    } else {
      setCurrentBundle({
        id: Date.now().toString(),
        sponsorName: '',
        email: '',
        quotas: quotaTypes.map(type => ({ type, quantity: 0 })),
        totalInvitations: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentBundle(null);
  };

  const handleSaveBundle = () => {
    if (currentBundle) {
      if (bundles.find(b => b.id === currentBundle.id)) {
        setBundles(bundles.map(b => b.id === currentBundle.id ? currentBundle : b));
      } else {
        setBundles([...bundles, currentBundle]);
      }
    }
    handleCloseDialog();
  };

  const handleDeleteBundle = (id: string) => {
    setBundles(bundles.filter(b => b.id !== id));
  };

  const handleShareBundle = (bundle: Bundle) => {
    // Here we'll implement sharing functionality
    console.log('Share bundle with:', bundle.email);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Sponsor Bundles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Bundle
        </Button>
      </Box>

      <Grid container spacing={3}>
        {bundles.map((bundle) => (
          <Grid item xs={12} md={6} key={bundle.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {bundle.sponsorName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {bundle.email}
                </Typography>
                
                <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bundle.quotas.map((quota) => (
                        <TableRow key={quota.type}>
                          <TableCell>{quota.type}</TableCell>
                          <TableCell align="right">{quota.quantity}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {bundle.totalInvitations}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenDialog(bundle)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleShareBundle(bundle)} size="small">
                  <ShareIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteBundle(bundle.id)} size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Bundle Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentBundle? 'Edit Bundle' : 'Create New Bundle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sponsor Name"
                value={currentBundle?.sponsorName || ''}
                onChange={(e) => setCurrentBundle(curr => curr ? {
                  ...curr,
                  sponsorName: e.target.value
                } : null)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sponsor Email"
                type="email"
                value={currentBundle?.email || ''}
                onChange={(e) => setCurrentBundle(curr => curr ? {
                  ...curr,
                  email: e.target.value
                } : null)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Quota Allocation
              </Typography>
              <Stack spacing={2}>
                {currentBundle?.quotas.map((quota, index) => (
                  <Box key={quota.type} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Chip label={quota.type} />
                    <TextField
                      type="number"
                      label="Quantity"
                      value={quota.quantity}
                      onChange={(e) => {
                        const newQuotas = [...(currentBundle?.quotas || [])];
                        newQuotas[index] = {
                          ...quota,
                          quantity: parseInt(e.target.value) || 0
                        };
                        setCurrentBundle(curr => curr ? {
                          ...curr,
                          quotas: newQuotas,
                          totalInvitations: newQuotas.reduce((sum, q) => sum + q.quantity, 0)
                        } : null);
                      }}
                      size="small"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveBundle} variant="contained">
            Save Bundle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bundles;
