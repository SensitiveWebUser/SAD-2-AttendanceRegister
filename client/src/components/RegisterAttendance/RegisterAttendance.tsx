import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  Container,
  Chip,
  Divider,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { OutlinedTextField } from '../OutlinedTextField';

import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { useRequest } from '../../hooks/useRequest';
import Background from '../../utils/resources/images/background.svg';

export const RegisterAttendance = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState([]);
  const [userEneteredCode, setUserEnteredCode] = useState<string>('');

  const [registerAttendance, errors] = useRequest({
    url: ' ',
    method: 'post',
    onSuccess: () => {
      return;
    },
  });

  // useEffect(() => {
  //   getUsers();
  // }, []);

  //TODO: error if session has began/has ended already
  //TODO: enquesSnackbar with success/error message

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //const userID = data.get('userId').toString();
    const { isAuthenticated, user } = useAuth0();
    const userID = user.sub;
    const code = data.get('code').toString();

    const newData = {
      id: userID,
      code: code,
    };
    await registerAttendance({
      ...newData,
      url: `http://localhost:3001/api/user/${userID}/register/session/${code}/attendance`,
    });
  };

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
            Register Attendance
          </Typography>
        </Grid>
        <Box
          component="form"
          onSubmit={handleCodeSubmit}
          sx={{
            mt: 0,
            ml: 'auto',
            width: '20%',
            mr: 'auto',
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
              mt: 0,
              ml: 'auto',
              mr: 'auto',
            }}
          >
            <OutlinedTextField id="code" label="Register Code" required />
            <Button
              sx={{
                mt: 4,
                color: 'white',
                marginTop: '8px',
                fontWeight: 500,
                backgroundColor: '#52545F',
                '&:hover': {
                  backgroundColor: '#757889',
                },
              }}
              variant="contained"
              type="submit"
            >
              SUBMIT
            </Button>
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          sm={11}
          sx={{
            height: 'auto',
            width: 'auto',
            color: 'primary-white',
            backgroundColor: '#33353f',
            borderRadius: '4px',
            mb: '2rem',
            p: '1rem',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ml: 'auto',
            mr: 'auto',
            mt: 20,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'whitesmoke',
            }}
          >
            Disclaimer
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
