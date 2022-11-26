import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Box>
      <Typography variant="h1">Nothing on this page!</Typography>
      <Typography component={Link} variant="h3" to="/">
        Go to the home page
      </Typography>
    </Box>
  );
};
