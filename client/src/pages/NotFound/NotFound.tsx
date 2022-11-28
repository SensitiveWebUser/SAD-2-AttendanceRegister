import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" style={{ color: '#FA8072' }}>
        {t('error.404.title')}
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        {t('error.404.message')}
      </Typography>

      <Link to="/" style={{ textDecoration: 'none', marginTop: 8 }}>
        <Button variant="contained" sx={{ fontWeight: 600 }}>
          {t('error.404.backMessage')}
        </Button>
      </Link>
    </Box>
  );
};
