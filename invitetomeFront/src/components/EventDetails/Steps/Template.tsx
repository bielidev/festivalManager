import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';

interface EmailTemplate {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  tags: string[];
}

const sampleTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Modern Minimal',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop',
    description: 'Clean and modern design with emphasis on typography and whitespace',
    tags: ['minimal', 'modern', 'professional'],
  },
  {
    id: '2',
    name: 'Event Spotlight',
    thumbnail: 'https://images.unsplash.com/photo-1561488111-5d800fd56b8a?w=800&auto=format&fit=crop',
    description: 'Bold design featuring large event imagery and clear call-to-actions',
    tags: ['bold', 'colorful', 'featured'],
  },
  {
    id: '3',
    name: 'Corporate Classic',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop',
    description: 'Professional template suitable for corporate events and conferences',
    tags: ['corporate', 'professional', 'classic'],
  },
  {
    id: '4',
    name: 'Creative Arts',
    thumbnail: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&auto=format&fit=crop',
    description: 'Artistic template perfect for cultural and creative events',
    tags: ['creative', 'artistic', 'colorful'],
  },
];

export const Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [customizations, setCustomizations] = useState({
    subject: '',
    headerText: '',
    bodyText: '',
  });

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handleCustomize = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setCustomizeOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Choose Email Template
      </Typography>
      
      <Grid container spacing={3}>
        {sampleTemplates.map((template) => (
          <Grid item xs={12} key={template.id}>
            <Card 
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                height: { xs: 'auto', sm: '220px' },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ width: { xs: '100%', sm: '280px' }, flexShrink: 0 }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: '200px', sm: '200px' },
                    objectFit: 'cover'
                  }}
                  image={template.thumbnail}
                  alt={template.name}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 3, pb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {template.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {template.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {template.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ 
                          textTransform: 'capitalize',
                          bgcolor: 'rgba(37, 99, 235, 0.1)',
                          color: 'primary.main',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <Box sx={{ 
                  px: 3, 
                  pb: 3, 
                  pt: 0, 
                  mt: 'auto',
                  display: 'flex', 
                  gap: 1, 
                  justifyContent: 'flex-end',
                  bgcolor: 'background.paper',
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Button
                    startIcon={<PreviewIcon />}
                    onClick={() => handlePreview(template)}
                    size="small"
                    sx={{ minWidth: 100 }}
                  >
                    Preview
                  </Button>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleCustomize(template)}
                    variant="contained"
                    size="small"
                    sx={{ minWidth: 140 }}
                  >
                    Use & Customize
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Template Preview: {selectedTemplate?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <img
              src={selectedTemplate?.thumbnail}
              alt={selectedTemplate?.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setPreviewOpen(false);
              if (selectedTemplate) handleCustomize(selectedTemplate);
            }}
          >
            Use This Template
          </Button>
        </DialogActions>
      </Dialog>

      {/* Customize Dialog */}
      <Dialog
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Customize Template: {selectedTemplate?.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Subject"
                value={customizations.subject}
                onChange={(e) => setCustomizations({
                  ...customizations,
                  subject: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Header Text"
                value={customizations.headerText}
                onChange={(e) => setCustomizations({
                  ...customizations,
                  headerText: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Email Body"
                value={customizations.bodyText}
                onChange={(e) => setCustomizations({
                  ...customizations,
                  bodyText: e.target.value
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomizeOpen(false)}>Cancel</Button>
          <Button variant="contained">
            Save Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Template;
