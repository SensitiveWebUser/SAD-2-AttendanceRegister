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
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const modules = ['1', '2', '3'];
const attendance = ['100', '35', '68'];

function ModuleRow() {
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
        <TableCell>HF</TableCell>
        <TableCell>200%</TableCell>
        <TableCell align="right" sx={{ p: '20px' }} />
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="modules-sessions-students">
                <TableBody>
                  {modules.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ border: 'none', p: '20px' }}>
                        {row}
                      </TableCell>
                      <TableCell sx={{ border: 'none', p: '20px' }}>
                        {attendance[index]}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: 'none', p: '0px', width: '50px' }}
                      >
                        <Button variant="outlined" size="small">
                          <EditIcon sx={{ p: '5px' }} />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
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

export const TextReport = (): JSX.Element => {
  const { user } = useAuth0();
  return (
    <>
      <Typography variant="h1" sx={{ p: '1rem' }}>
        {user.name} Attendance
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
            {modules.map((row, index) => (
              <ModuleRow key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
