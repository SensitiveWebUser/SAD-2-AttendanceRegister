import { useRequest } from '../../hooks/useRequest';
import { Button, Container } from '@mui/material';
import { Fragment, useState } from 'react';

export const Home = (): JSX.Element => {
  const id = '1';

  const [, setUserData] = useState({});
  const [doRequest, errors] = useRequest({
    url: `/api/users/${id}`,
    method: 'get',
    onSuccess: (data: unknown) => setUserData(data),
  });

  return (
    <Fragment>
      <Container maxWidth={false}>
        <Button
          sx={{ mt: 10 }}
          variant="outlined"
          onClick={() => {
            doRequest();
          }}
        >
          Get User Data
        </Button>
        <Container>{errors}</Container>
      </Container>
    </Fragment>
  );
};
