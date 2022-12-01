import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { useRequest } from '../../../hooks/useRequest';

export const RegisterAttendance = () => {
  const { user } = useAuth0();
  const { t } = useTranslation();

  const [registerAttendance, errors] = useRequest({
    url: '',
    method: 'post',
    onSuccess: () => {
      return;
    },
  });

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const code = data.get('code').toString();
    const newData = {
      id: user.sub,
      code: code,
    };
    await registerAttendance({
      ...newData,
      url: `http://localhost:3001/api/users/${user.sub}/register/sessions/${code}/attendances`,
    });
  };

  return (
    <Fragment>
      <Typography variant="h2" color="white">
        {t('registerAttendance.title')}
      </Typography>
      <Box component="form" onSubmit={handleCodeSubmit}>
        <OutlinedTextField id="code" label="Register Code" required />
        <Grid container justifyContent="center" alignItems="center">
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
            Submit
          </Button>
        </Grid>
        {errors}
      </Box>
    </Fragment>
  );
};
