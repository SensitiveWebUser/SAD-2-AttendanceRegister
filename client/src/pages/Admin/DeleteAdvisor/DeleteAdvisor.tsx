import { Box, Button, Container, Divider, Grid } from '@mui/material';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { useRequest } from '../../../hooks/useRequest';

export const DeleteAdvisor = () => {
  const [deleteAdvisor, errors] = useRequest({
    url: '',
    method: 'delete',
    onSuccess: () => {
      return;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newData = {
      id: data.get('advisorId'),
    };
    await deleteAdvisor({
      ...newData,
      url: `http://localhost:3001/api/users/${data.get('advisorId')}`,
    });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <OutlinedTextField id="advisorId" label="Advisor ID" required />
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
            Delete Advisor
          </Button>
        </Grid>
        <Box pb={2}>{errors}</Box>
      </Box>
    </Container>
  );
};
