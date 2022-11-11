import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: useRequestProps) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      // Set the Authorization header with the access token from Auth0 for the current user
      // If the user is not logged in, authorization will set to an empty string
      if (isAuthenticated) {
        const token: string =
          ((await getAccessTokenSilently()) as string) || '';
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return [doRequest, errors];
};

interface useRequestProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: {};
  onSuccess?: Function;
}
