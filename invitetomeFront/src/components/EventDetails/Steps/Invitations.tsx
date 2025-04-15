import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import invitationData from "./InvitationData";

const InvitationAnalytics: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sending, setSending] = useState(false);
  const [selectedBundles, setSelectedBundles] = useState<Set<string>>(
    new Set()
  );
  const [selectedInvitations, setSelectedInvitations] = useState<Set<string>>(
    new Set()
  );

  const bundles = [
    "bundle#01#nike",
    "bundle#02#coke",
    "bundle#03#adidas",
    "bundle#04#pepsi",
    "bundle#05#marketing",
    "bundle#06#sales",
    "bundle#07#hr",
    "bundle#08#finance",
    "bundle#09#vip",
  ];

  const handleToggleBundle = (bundle: string) => {
    setSelectedBundles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bundle)) {
        newSet.delete(bundle);
      } else {
        newSet.add(bundle);
      }
      setPage(0); // Reset to first page on filter change
      return newSet;
    });
  };

  const handleSelectInvitation = (codeInvitation: string) => {
    setSelectedInvitations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(codeInvitation)) {
        newSet.delete(codeInvitation);
      } else {
        newSet.add(codeInvitation);
      }
      return newSet;
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const visibleInvitations = filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setSelectedInvitations((prev) => {
      const newSet = new Set(prev);
      visibleInvitations.forEach((inv) => {
        if (event.target.checked) {
          newSet.add(inv.codeInvitation);
        } else {
          newSet.delete(inv.codeInvitation);
        }
      });
      return newSet;
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendInvitations = () => {
    if (selectedInvitations.size === 0) return;
    setSending(true);
    setTimeout(() => {
      setSelectedInvitations((prev) => {
        const newSet = new Set(prev);
        invitationData.forEach((inv) => {
          if (newSet.has(inv.codeInvitation)) {
            inv.statusCode = "SENT"; // Update status in-memory
          }
        });
        return new Set(); // Clear selections after sending
      });
      setSending(false);
    }, 2000);
  };

  const filteredData =
    selectedBundles.size === 0
      ? invitationData
      : invitationData.filter((inv) => selectedBundles.has(inv.bundle));

  const isAllSelected =
    filteredData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .every((inv) => selectedInvitations.has(inv.codeInvitation)) &&
    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .length > 0;

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Invitation Analytics
        </Typography>
        {/* Bundle Filter Buttons */}
        <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {bundles.map((bundle) => (
            <Button
              key={bundle}
              variant={selectedBundles.has(bundle) ? "contained" : "outlined"}
              onClick={() => handleToggleBundle(bundle)}
              sx={{ textTransform: "none" }}
              aria-pressed={selectedBundles.has(bundle)}
            >
              {bundle.split("#")[2]}
            </Button>
          ))}
        </Box>
        <TableContainer>
          <Table aria-label="invitation analytics table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    indeterminate={
                      selectedInvitations.size > 0 &&
                      !isAllSelected &&
                      filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .some((inv) =>
                          selectedInvitations.has(inv.codeInvitation)
                        )
                    }
                    disabled={filteredData.length === 0}
                    aria-label="select all visible invitations"
                  />
                </TableCell>
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
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invitation) => (
                  <TableRow key={invitation.codeInvitation}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedInvitations.has(
                          invitation.codeInvitation
                        )}
                        onChange={() =>
                          handleSelectInvitation(invitation.codeInvitation)
                        }
                        aria-label={`select invitation ${invitation.codeInvitation}`}
                      />
                    </TableCell>
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
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
          disabled={sending || selectedInvitations.size === 0}
          sx={{ px: 4, py: 1.5 }}
        >
          {sending
            ? "Sending..."
            : `Send ${selectedInvitations.size} Checked Invitation${
                selectedInvitations.size !== 1 ? "s" : ""
              }`}
        </Button>
      </Box>
    </Box>
  );
};

export default InvitationAnalytics;
