import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  TableContainer,
  Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth0, User } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRequest } from '../../hooks/useRequest';
import { isEmpty } from 'lodash';
import { roles } from '../../utils/constants';

const module = ['module1', 'module2', 'module3'];
const session = ['session1', 'session2', 'session3'];
const student = ['alice', 'alex', 'adam', 'silvia', 'nathan']; //TODO: get
const attendance = ['100', '35', '68']; // TODO: replace with user.getAttendance()
const user = { name: 'alice', type: 'Course Leader' }; //TODO: replace with user

// a staff member will be able to edit a students attendance
const getEditButton = () => {
  if (user.type !== 'Student') {
    return (
      <TableCell align="right" sx={{ border: 'none', p: '0px', width: '50px' }}>
        <Button variant="outlined" size="small">
          <EditIcon sx={{ p: '5px' }} />
          Edit
        </Button>
      </TableCell>
    );
  }
};

const getStudents = () => {
  if (user.type !== 'Student') {
    return student.map((row, index) => (
      <TableRow key={index}>
        <TableCell sx={{ border: 'none', p: '20px' }}>
          {student[index]}
        </TableCell>
        <TableCell sx={{ border: 'none', p: '20px' }}>
          {attendance[index] + '%'}
        </TableCell>
      </TableRow>
    ));
  }
};

const ModuleRow = ({ moduleName }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell sx={{ p: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{moduleName}</TableCell>
        <TableCell>{'attendance'}</TableCell>
        <TableCell align="right" sx={{ p: '20px' }} />
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="modules-sessions-students">
                <TableBody>
                  {session.map((row, index) => (
                    <SessionRow key={index} sessionKey={index} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

ModuleRow.propTypes = {
  moduleName: PropTypes.string,
};

interface ModuleRow {
  moduleName: string;
}

const SessionRow = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        {user.type === 'Student' ? (
          <></>
        ) : (
          <TableCell sx={{ p: 0 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}

        <TableCell>{session[props.sessionKey]}</TableCell>
        <TableCell>{attendance[props.sessionKey]}</TableCell>
        <TableCell align="right" sx={{ p: '20px' }} />
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="modules-sessions-students">
                <TableBody>
                  {getStudents()} {getEditButton()}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

SessionRow.propTypes = {
  sessionKey: PropTypes.number,
};

interface SessionRow {
  sessionKey: number;
}

export const TextReport = (): JSX.Element => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState([]);
  const [tutorData, setTutorData] = useState([]);
  const [users, setUsers] = useState([]);

  const role = isAuthenticated
    ? user['http://sad.assignment.com/userData'].app.role
    : roles.GUEST;

  // get current users course/module data
  const [getUserCourses] = useRequest({
    url: `http://localhost:3001/api/users/${user.sub}/courses`,
    method: 'get',
    onSuccess: (data) => {
      setUserData(data);
      console.log(data);
    },
  });

  // get list of all users
  const [getUsers] = useRequest({
    url: ' /api/users',
    method: 'get',
    onSuccess: (data) => {
      setUsers(data);
      console.log(data);
    },
  });

  // get session list for students/module leader
  //???

  // get session list tutor
  const [getTutorSessions] = useRequest({
    url: `http://localhost:3001/api/tutors/${user.sub}/sessions`,
    method: 'get',
    onSuccess: (data) => {
      setTutorData(data);
      console.log(data);
    },
  });

  //userData[0].modules.module_name

  let rowData;

  useEffect(() => {
    switch (role) {
    case roles.ADMIN:
      break;
    case roles.ACADEMIC_ADVISOR:
      break;
    case roles.COURSE_LEADER:
      break;
    case roles.MODULE_LEADER:
      break;
    case roles.STUDENT:
      getUserCourses();
      rowData = userData[0].modules;
      break;
    case roles.TUTOR:
      getTutorSessions();
      break;
    default:
      break;
    }
  }, []);

  return isEmpty(userData) ? (
    <></>
  ) : (
    <>
      <Typography variant="h1" sx={{ p: '1rem' }}>
        {user.nickname} Attendance
      </Typography>
      <TableContainer sx={{ p: '1rem' }}>
        <Table aria-label="collapsible module infomation">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50px' }} />
              <TableCell>
                <b>Module</b>
              </TableCell>
              <TableCell>
                <b>% Attendance</b>
              </TableCell>
              <TableCell align="right" sx={{ p: '20px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, index) => (
              <ModuleRow key={index} moduleName={row.module_name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
