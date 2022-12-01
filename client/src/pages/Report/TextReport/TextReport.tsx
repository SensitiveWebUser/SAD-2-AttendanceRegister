import { useAuth0 } from '@auth0/auth0-react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { useRequest } from '../../../hooks/useRequest';
import { roles } from '../../../utils/constants';

export const TextReport = (): JSX.Element => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [moduleData, setModuleData] = useState([]);
  const [moduleAttendanceData, setmoduleAttendanceData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const isStudent =
    isAuthenticated &&
    user['http://sad.assignment.com/userData'].app.role === roles.STUDENT;

  const [getData] = useRequest({
    url: `http://localhost:3001/api/users/${user.sub}/courses`,
    method: 'get',
    onSuccess: (data) => {
      setModuleData(data.modules);
      const tempData = {};
      for (const module of data.modules) {
        const total = module.sessions.length;
        let count = 0;
        for (const session of module.sessions) {
          for (const atendee of session.sessionAttendances.attendances) {
            if (atendee.student === user.sub) {
              count++;
            }
          }
        }
        tempData[module.name] = Math.round((count / total) * 100) + '%';
      }
      setmoduleAttendanceData(tempData);
    },
  });

  useEffect(() => {
    if (isStudent) {
      getData();
    }
  }, []);

  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const fileData = [];
    for (const [key, value] of Object.entries(moduleAttendanceData)) {
      fileData.push(`${key}: ${value}`);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const file = new Blob([fileData], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'attendance.txt';
    document.body.appendChild(element);
    element.click();
  };

  const downloadCourseFile = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const courseID = data.get('courseID');
    const token: string = ((await getAccessTokenSilently()) as string) || '';
    axios({
      method: 'get',
      url: `http://localhost:3001/api/courses/${courseID}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const element = document.createElement('a');
        const file = new Blob([JSON.stringify(res.data, null, 2)], {
          type: 'application/json',
        });
        element.href = URL.createObjectURL(file);
        element.download = 'course.json';
        document.body.appendChild(element);
        element.click();
        enqueueSnackbar('Success!', { variant: 'success' });
      })
      .catch(() => enqueueSnackbar('Invalid Request!', { variant: 'error' }));
  };

  return !isStudent ? (
    <Grid container>
      <Grid item xs>
        <Box component="form" onSubmit={downloadCourseFile}>
          <OutlinedTextField id="courseID" label="Course ID" required />
          <Grid container item>
            <Button
              data-testid="download"
              startIcon={<FileDownloadIcon style={{ fontSize: '1.5rem' }} />}
              sx={{
                color: 'salmon',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1.1rem',
              }}
              type="submit"
            >
              Download Data
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  ) : isEmpty(moduleData) ? (
    <Fragment></Fragment>
  ) : (
    <Grid container>
      <Grid item xs textAlign="right">
        <Button
          onClick={downloadTxtFile}
          startIcon={<FileDownloadIcon style={{ fontSize: '1.5rem' }} />}
          sx={{
            color: 'salmon',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1.1rem',
          }}
        >
          Download Data
        </Button>
      </Grid>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Module</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moduleData.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '& > *': { borderBottom: 'unset' } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{moduleAttendanceData[row.name]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
