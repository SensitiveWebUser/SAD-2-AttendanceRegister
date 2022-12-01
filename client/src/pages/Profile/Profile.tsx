import {
  Grid,
  Avatar,
  Box,
  Container,
  Divider,
  List,
  Typography,
  Button,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';
import { roles } from '../../utils/constants';

export const Profile = (): JSX.Element => {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const role = isAuthenticated
    ? user['http://sad.assignment.com/userData'].app.role
    : roles.GUEST;

  const detail = [role];

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundColor: '#404A86',
          position: 'absolute',
        }}
      />
      <Container sx={{ width: 'auto', pt: '100px', flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          rowSpacing={2}
          columnSpacing="auto"
        >
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: '#464954',
              color: 'white',
              borderRadius: '8px',
              p: '30px',
              pb: '200px',
              zIndex: 1,
              minWidth: '320px',
            }}
          >
            <Avatar
              alt="User Profile Image"
              src={user?.picture}
              sx={{ width: 150, height: 150, mb: '20px', mt: '20px' }}
            />
            <List>
              <Typography variant="h1" sx={{ pt: '10px', pb: '10px' }}>
                Hello {user?.name}
              </Typography>
              <Typography variant="h2" sx={{ pt: '10px', pb: '10px' }}>
                {user?.email}
              </Typography>
              <Divider
                sx={{ bgcolor: '#CACACA', mt: '30px', mb: '30px' }}
                variant="fullWidth"
              />
              {detail.map((value, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ pt: '10px', pb: '10px' }}
                >
                  {value}
                </Typography>
              ))}
              <Divider
                sx={{ bgcolor: '#CACACA', mt: '30px', mb: '30px' }}
                variant="fullWidth"
              />
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
