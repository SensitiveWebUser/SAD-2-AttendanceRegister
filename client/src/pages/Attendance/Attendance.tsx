import React from 'react';

import { useRequest } from '../../hooks//useRequest';
import { Button, Container, Link, Slide, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { RegisterAttendance } from '../../components/RegisterAttendance/RegisterAttendance';
import Background from '../../utils/resources/images/background.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { CheckStudent } from '../../components/CheckStudent';
import { roles } from '../../utils/constants';

export const Attendance = () => {
  const { isAuthenticated, user } = useAuth0();
  //TODO: get current user role
  //const userID = user.sub;

  return isAuthenticated ? <RegisterAttendance /> : <CheckStudent />;
};
