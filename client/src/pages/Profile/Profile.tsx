import {
  Grid,
  Avatar,
  Box,
  Container,
  Divider,
  List,
  Typography,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export const Profile = (): JSX.Element => {
  const { user } = useAuth0();

  const detail = ['userType', 'module1', 'module2', 'module3'];
  const percentage = '100%';

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundColor: '#68b3d6',
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
            </List>
          </Grid>
          <Grid
            item
            xs={'auto'}
            sx={{
              backgroundColor: '#464954',
              color: 'white',
              borderRadius: '8px',
              p: '30px',
              position: 'relative',
              mt: '30px',
              minWidth: '320px',
            }}
          >
            <Typography
              component="h2"
              variant="h2"
              sx={{ pt: '10px', pb: '10px' }}
            >
              Semester Overview
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '100px' }}>
              {percentage}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
