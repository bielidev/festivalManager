import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import contactsData from '../data/contacts.json'; // Adjust path as needed

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  tag: string | null;
  createdBy: string | null;
  modifiedBy: string | null;
  type: 'PERSONAL' | 'BUSINESS' | 'FAMILY' | 'FRIEND' | 'OTHER';
  company: string | null;
  jobTitle: string | null;
  address: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  description: string | null;
  socialUrls: string[];
}

const Contacts: React.FC = () => {
  // Assert the type of contactsData to match Contact[]
  const contacts = contactsData as Contact[];

  // Generate avatar initials from name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        p: 2,
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          bgcolor: 'background.paper',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h4">Contacts</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ flex: 1, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Avatar>{getInitials(contact.name)}</Avatar>
                </TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Contacts;