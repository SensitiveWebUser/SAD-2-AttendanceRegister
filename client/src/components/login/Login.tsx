import React from 'react';
import { useTranslation } from 'react-i18next';
import useRequest from '../../hooks/useRequest';
type _react = typeof React;

export const Login = ({}) => {
  const { t } = useTranslation();
  const {} = useRequest;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      LOGIN TEST PAGE DOES STUFF FOR LOGIN
      {/* sign up form */}
      {/* checks the info against restrictions */}
      {/* creates a new user on submit */}
      <form>
        <div></div>
      </form>
    </div>
  );
};
