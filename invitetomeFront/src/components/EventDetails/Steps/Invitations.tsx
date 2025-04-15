import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
CircularProgress
} from "@mui/material";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import  invitationData  from "./InvitationData"; // Assuming you have a mock data file




const InvitationAnalytics: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sending, setSending] = useState(false);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendInvitations = () => {
    setSending(true);
    // Simulate sending process
    setTimeout(() => {
      setSending(false);
    }, 2000);
  };


  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Invitation Analytics
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Bundle</TableCell>
                <TableCell>Invitation Code</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Template</TableCell>
                <TableCell>QR ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invitationData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invitation) => (
                  <TableRow key={invitation.codeInvitation}>
                    <TableCell>{invitation.name}</TableCell>
                    <TableCell>{invitation.email}</TableCell>
                    <TableCell>{invitation.bundle}</TableCell>
                    <TableCell>{invitation.codeInvitation}</TableCell>
                    <TableCell>{invitation.statusCode}</TableCell>
                    <TableCell>{invitation.templateId}</TableCell>
                    <TableCell>{invitation.qrId}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={invitationData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Send Invitations Button */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={
            sending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <EmailIcon />
            )
          }
          onClick={handleSendInvitations}
          disabled={sending}
          sx={{ px: 4, py: 1.5 }}
        >
          {sending ? "Sending..." : "Send Checked Invitations"}
        </Button>
      </Box>
    </Box>
  );
};

export default InvitationAnalytics;