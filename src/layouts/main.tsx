import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Anime Search App
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1200px',
          flex: 1, 
          mt: 4,
          mb: 4,
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          py: 2,
          borderTop: '1px solid #ddd',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Anime Search App
        </Typography>
      </Box>
    </Box>
  );
}
