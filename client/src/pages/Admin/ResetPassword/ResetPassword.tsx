import { Box, Button, Divider, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { useRequest } from '../../../hooks/useRequest';

export const ResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [resetPassword, errors] = useRequest({
    url: '',
    method: 'patch',
    onSuccess: () => {
      return;
    },
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userID = data.get('userId').toString();
    const password = data.get('password').toString();
    const confirmPassword = data.get('passwordConfirm').toString();
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }
    const newData = {
      id: userID,
      password: password,
    };
    await resetPassword({
      ...newData,
      url: `http://localhost:3001/api/user/${userID}/reset/password`,
    });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleResetPassword}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="userId" label="User ID" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="password" label="Password" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField
              id="passwordConfirm"
              label="Confirm Password"
              required
            />
          </Grid>
        </Grid>
        <Divider color="black" sx={{ my: 2 }} />
        <Grid container justifyContent="center" alignItems="center">
          <Button
            sx={{
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
            Reset Password
          </Button>
        </Grid>
        <Box pb={2}>{errors}</Box>
      </Box>
    </Container>
  );
};
