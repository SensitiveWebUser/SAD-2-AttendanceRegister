import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { AccountBtns } from './AccountBtns';
type _react = typeof React;

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
