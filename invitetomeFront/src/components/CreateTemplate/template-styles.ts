import { Theme } from '@mui/material/styles';

export interface TemplateStyle {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    titleFontFamily: string;
    bodyFontFamily: string;
  };
  spacing: {
    padding: number;
    gap: number;
  };
  decorations: {
    borderRadius: number;
    backgroundPattern?: string;
    icon?: string;
  };
}

export const templateStyles: Record<string, TemplateStyle> = {
  corporate: {
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      background: '#ecf0f1',
      text: '#2c3e50',
      accent: '#3498db'
    },
    typography: {
      titleFontFamily: '"Roboto", "Arial", sans-serif',
      bodyFontFamily: '"Open Sans", "Helvetica", sans-serif'
    },
    spacing: {
      padding: 24,
      gap: 16
    },
    decorations: {
      borderRadius: 4,
      backgroundPattern: 'linear-gradient(45deg, #f5f6fa 25%, transparent 25%, transparent 75%, #f5f6fa 75%, #f5f6fa)'
    }
  },
  birthday: {
    colors: {
      primary: '#ff6b6b',
      secondary: '#ff8e8e',
      background: '#fff5f5',
      text: '#4a4a4a',
      accent: '#ffd93d'
    },
    typography: {
      titleFontFamily: '"Pacifico", cursive',
      bodyFontFamily: '"Quicksand", sans-serif'
    },
    spacing: {
      padding: 32,
      gap: 20
    },
    decorations: {
      borderRadius: 20,
      backgroundPattern: 'radial-gradient(circle at 50% 50%, #ffe0e0 1px, transparent 1px)'
    }
  },
  wedding: {
    colors: {
      primary: '#c9a7a7',
      secondary: '#d4b9b9',
      background: '#faf3f3',
      text: '#3e2c2c',
      accent: '#ce7777'
    },
    typography: {
      titleFontFamily: '"Playfair Display", serif',
      bodyFontFamily: '"Cormorant Garamond", serif'
    },
    spacing: {
      padding: 40,
      gap: 24
    },
    decorations: {
      borderRadius: 8,
      backgroundPattern: 'linear-gradient(120deg, #faf3f3 0%, #f5e6e6 100%)'
    }
  },
  conference: {
    colors: {
      primary: '#1a237e',
      secondary: '#283593',
      background: '#f5f6fa',
      text: '#121858',
      accent: '#5c6bc0'
    },
    typography: {
      titleFontFamily: '"Montserrat", sans-serif',
      bodyFontFamily: '"Source Sans Pro", sans-serif'
    },
    spacing: {
      padding: 28,
      gap: 16
    },
    decorations: {
      borderRadius: 6,
      backgroundPattern: 'linear-gradient(90deg, #f8f9ff 0%, #f5f6fa 100%)'
    }
  },
  workshop: {
    colors: {
      primary: '#2ecc71',
      secondary: '#27ae60',
      background: '#f0fff4',
      text: '#1a472a',
      accent: '#16a085'
    },
    typography: {
      titleFontFamily: '"Ubuntu", sans-serif',
      bodyFontFamily: '"Roboto", sans-serif'
    },
    spacing: {
      padding: 24,
      gap: 16
    },
    decorations: {
      borderRadius: 12,
      backgroundPattern: 'linear-gradient(135deg, #f0fff4 25%, #e8f8ed 25%, #e8f8ed 50%, #f0fff4 50%, #f0fff4 75%, #e8f8ed 75%, #e8f8ed 100%)'
    }
  }
};
