import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Background from '../../utils/resources/images/background.svg';

export const CheckStudent = () => {
  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        p={3}
        justifyContent="space-around"
        direction="row"
        sx={{
          pt: '100px',
          flexGrow: 1,
          height: '100vh',
          backgroundImage: `url(${Background})`,
          backgroundColor: '#2F3037',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      >
        <Grid
          item
          xs={12}
          sm={11}
          sx={{
            height: 'auto',
            color: 'primary-white',
            backgroundColor: '#33353f',
            borderRadius: '4px',
            mb: '2rem',
            p: '1rem',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              p: '1rem',
              color: 'white',
            }}
          >
            Please Log In to register attendance.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
