import { useAuth0 } from '@auth0/auth0-react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useRequest } from '../../../hooks/useRequest';

export const TextReport = (): JSX.Element => {
  const { user } = useAuth0();
  const [moduleData, setModuleData] = useState([]);
  const [moduleAttendanceData, setmoduleAttendanceData] = useState({});

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
    getData();
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
    element.download = 'report.txt';
    document.body.appendChild(element);
    element.click();
  };

  return isEmpty(moduleData) ? (
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
