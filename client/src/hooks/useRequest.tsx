import { useAuth0 } from '@auth0/auth0-react';
import { Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: useRequestProps) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState(null);
  const { t } = useTranslation();

  // This function is used to make the request to the API
  // The function can be used as if it like a useHook function
  // It will return the data from the API or an error as JSX elements
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      // Set the Authorization header with the access token from Auth0 for the current user
      // If the user is not logged in, authorization will not be set
      if (isAuthenticated) {
        const token: string =
          ((await getAccessTokenSilently()) as string) || '';
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
        enqueueSnackbar(t('request.success'), {
          variant: 'success',
        });
      }
    } catch (err) {
      err.response.data.errors.map((err) => {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      });
      setErrors(
        <Alert
          severity="error"
          sx={{ mt: 2, bgcolor: '#160B0B', color: '#F4C7C7' }}
        >
          <AlertTitle sx={{ fontWeight: '600' }}>
            {t('request.error.message')}
          </AlertTitle>
          {t('request.error.message', { url: url })}
        </Alert>
      );
    }
  };

  return [doRequest, errors];
};

interface useRequestProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function;
}
