import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { useRequest } from '../../../hooks/useRequest';

export const CreateUser = () => {
  const [chipData, setChipData] = useState([]);
  const [userEnteredChipKey, setUserEnteredChipKey] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const handleAddChip = () => {
    if (chipData.includes(userEnteredChipKey)) {
      enqueueSnackbar('Session ID already added', { variant: 'error' });
      return;
    }
    setChipData([...chipData, userEnteredChipKey]);
  };

  const handleDelete = (chipToDelete: string) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleOnChange = (e) => {
    setUserEnteredChipKey(e.target.value);
  };

  const [createUser, errors] = useRequest({
    url: 'http://localhost:3001/api/user',
    method: 'post',
    onSuccess: () => {
      return;
    },
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newData = {
      firstName: data.get('firstName').toString(),
      middleName: data.get('middleName').toString(),
      lastName: data.get('lastName').toString(),
      email: data.get('email').toString(),
      academicAdvisorId: data.get('advisorId').toString(),
      sessionIds: chipData,
    };
    await createUser(newData);
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleCreateUser}>
        <Grid container spacing={4} mb={2}>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="firstName" label="First Name" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="middleName" label="Middle Name" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="lastName" label="Last Name" required />
          </Grid>
        </Grid>
        <Grid container mb={2} spacing={4}>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="email" label="Email" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="advisorId" label="Advisor ID" required />
          </Grid>
        </Grid>
        <Typography variant="h5" color="white">
          SessionID list
        </Typography>
        <Grid container spacing={1} mb={2}>
          {chipData.length === 0 ? (
            <Typography variant="h6" color="white" m="auto">
              No SessionID&apos;s added
            </Typography>
          ) : (
            chipData.map((data) => {
              return (
                <Grid item key={data}>
                  <Chip
                    key={data}
                    label={data}
                    onDelete={handleDelete(data)}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: 'lightgrey',
                      filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                      borderRadius: '8px',
                      '& .MuiChip-deleteIcon:hover': {
                        fill: 'darkgray',
                        cursor: 'pointer',
                      },
                    }}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="sessionID"
              name="sessionID"
              label="Session ID"
              variant="outlined"
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddChip}
              sx={{
                mt: 2,
                color: '#4D4D4D',
                marginTop: '8px',
                fontWeight: 600,
                backgroundColor: 'lightgrey',
                mb: 2,
                '&:hover': {
                  backgroundColor: 'darkgray',
                },
              }}
            >
              Add Session ID
            </Button>
          </Grid>
        </Grid>
        <Divider color="black" sx={{ m: 2 }} />
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
            Create User
          </Button>
        </Grid>
        <Box pb={2}>{errors}</Box>
      </Box>
    </Container>
  );
};
