import { useTranslation } from 'react-i18next';

import { Login } from '../Login';

import { useRequest } from '../../hooks/useRequest';
import { Header } from '../../components/Header';

export const Home = (): JSX.Element => {
  const id = '07d6a03b-172a-4539-814b-4d43d08b3e9d';

  const { t } = useTranslation();
  const [doRequest, errors] = useRequest({
    url: `http://localhost:3001/api/users?user_id=${id}`,
    method: 'get',
    onSuccess: (data: unknown) => console.log(data),
  });

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginTop: '200px',
        }}
      >
        <button onClick={() => doRequest()}>Get User</button>
        TEST PAGE <br />
        {t('translation.hello')}
        {errors}
        <Login />
      </div>
    </>
  );
};
