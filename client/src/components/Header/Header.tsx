import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { AccountBtns } from '.';

export const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
              UoPS
            </Typography>
            <AccountBtns />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
