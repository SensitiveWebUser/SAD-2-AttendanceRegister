import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';

export const AccountBtns = () => {
  const [loginBtnText, setLoginBtnText] = useState('LOG IN');
  const currentUser = null;

  if (currentUser !== null) {
    setLoginBtnText('LOG OUT');
  }

  function handleSignUp() {
    //go to create account page/modal/whatever
  }

  function handleLogIn() {
    // Go to login page/modal/whatever
  }

  return (
    <>
      <ButtonGroup variant="contained" aria-label="contained button group">
        <Button onClick={handleLogIn}>{loginBtnText}</Button>
        <Button onClick={handleSignUp}>SIGN UP</Button>
      </ButtonGroup>
    </>
  );
};
