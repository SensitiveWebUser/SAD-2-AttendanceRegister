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
import { useState } from 'react';
import PropTypes from 'prop-types';

const module = ['module1', 'module2', 'module3'];
const session = ['session1', 'session2', 'session3'];
const student = ['alice', 'alex', 'adam', 'silvia', 'nathan']; //TODO: get
const attendance = ['100', '35', '68']; // TODO: replace with user.getAttendance()
const user = { name: 'alice', type: 'Course Leader' }; //TODO: replace with user

function getEditButton() {
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
}

function getStudents() {
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
}

function ModuleRow(props) {
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
        <TableCell>{module[props.moduleKey]}</TableCell>
        <TableCell>{attendance[props.moduleKey]}</TableCell>
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
}

ModuleRow.propTypes = {
  moduleKey: PropTypes.number,
};

interface ModuleRow {
  moduleKey: number;
}

function SessionRow(props) {
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
                <TableBody>{getStudents()}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

SessionRow.propTypes = {
  sessionKey: PropTypes.number,
};

interface SessionRow {
  sessionKey: number;
}

export const TextReport = (): JSX.Element => {
  const { user } = useAuth0();
  return (
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
            {module.map((row, index) => (
              <ModuleRow key={index} moduleKey={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
