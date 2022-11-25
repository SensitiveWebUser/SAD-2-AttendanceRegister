import { useRequest } from '../../hooks/useRequest';
import { Button, Container } from '@mui/material';
import { Fragment, useState } from 'react';
import { useSnackbar } from 'notistack';

export const Home = (): JSX.Element => {
  const id = '07d6a03b-172a-4539-814b-4d43d08b3e9d';
  const { enqueueSnackbar } = useSnackbar();

  const [, setUserData] = useState({});
  const [doRequest, errors] = useRequest({
    url: `http://localhost:3001/api/user/${id}`,
    method: 'get',
    onSuccess: (data: any) => setUserData(data),
  });

  return (
    <Fragment>
      <Container maxWidth={false}>
        <Button
          sx={{ mt: 10 }}
          variant="outlined"
          onClick={() => {
            doRequest();
            enqueueSnackbar('Successfully requested data', {
              variant: 'success',
            });
          }}
        >
          Get User Data
        </Button>
        {errors}
      </Container>
    </Fragment>
  );
};
