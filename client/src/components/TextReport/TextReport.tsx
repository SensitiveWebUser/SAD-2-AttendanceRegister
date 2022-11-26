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
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const modules = ['HF', 'SAAD', 'MITP'];
const attendance = ['100', '35', '68'];

function Row() {
  const { user } = useAuth0();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>row.module</TableCell>
        <TableCell>row.attendance</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Module Name
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Module</TableCell>
                    <TableCell>Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modules.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row}</TableCell>
                      <TableCell>{attendance[index]}</TableCell>
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
  return (
    <>
      <Typography variant="h1">user.name Attendance</Typography>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Module</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((row, index) => (
              <Row key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
