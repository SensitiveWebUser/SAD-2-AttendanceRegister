import {
  Box,
  Button,
  Divider,
  Grid,
  outlinedInputClasses,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { isEmpty, map } from 'lodash';
import { useState } from 'react';
import { CustomModal } from '../../../components/CustomModal';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { useRequest } from '../../../hooks/useRequest';
import { ModalTheme } from '../../../utils/themes/ModalTheme';

const StyledTextField = styled(TextField)(`
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: white !important;
  }
  .${outlinedInputClasses.notchedOutline} {
    border-color: white !important;
  }
`);

interface Data {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  type: string;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = map(array, (el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'middleName',
    numeric: true,
    disablePadding: false,
    label: 'Middle Name',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const UserTable = ({ rows }: ComponentProps) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('email');
  const [page, setPage] = useState(0);
  const [dense] = useState(false);
  const [rowData, setRowData] = useState(rows);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<Data>(null);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, userData) => {
    setModalData(userData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [updateUser, errors] = useRequest({
    url: `http://localhost:3001/api/user/${modalData?.id}`,
    method: 'patch',
    onSuccess: () => {
      return;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newData: Data = {
      id: modalData?.id,
      firstName: data.get('firstName').toString(),
      middleName: data.get('middleName').toString(),
      lastName: data.get('lastName').toString(),
      email: data.get('email').toString(),
      type: data.get('type').toString(),
    };
    const updated = await updateUser(newData);
    if (!updated) return;
    const newRows = rowData.filter((row) => row.id !== newData.id);
    setRowData([...newRows, newData]);
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

  const requestSearch = (e) => {
    const { value } = e.target;
    if (value === '') {
      setRowData(rows);
      return;
    }
    const tempArr = [];
    for (const x in rows) {
      const data = rows[x];
      for (const y in data) {
        const data2 = data[y];
        if (data2.toString().toLowerCase().includes(value)) {
          tempArr.push(data);
          break;
        }
      }
    }
    setRowData(tempArr);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          mb: 2,
          backgroundColor: '#2E3035',
          color: 'white',
        }}
      >
        <TextField
          label="Search for a user"
          type="search"
          variant="filled"
          onInput={requestSearch}
          fullWidth
          inputProps={{
            style: {
              fontSize: '1.25rem',
            },
          }}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rowData.length}
            />
            <TableBody>
              {stableSort(rowData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                      sx={{
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.middleName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {modalData && !isEmpty(modalData) && (
        <CustomModal
          open={open}
          close={handleClose}
          layout={
            <Box
              sx={ModalTheme('75%')}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              boxShadow={5}
              color="white"
              component="form"
              onSubmit={handleSubmit}
            >
              <Typography variant="h4" mb={1}>
                {modalData.firstName} {modalData.lastName}
                {modalData.lastName.endsWith('s') ? (
                  <>&apos; </>
                ) : (
                  <>&apos;s </>
                )}
                Profile
              </Typography>
              <Divider color="black" sx={{ mb: 2 }} />
              <Grid container mb={2} spacing={3}>
                <Grid item xs={12} md={4}>
                  <OutlinedTextField
                    id="firstName"
                    label="First Name"
                    defaultValue={modalData.firstName}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <OutlinedTextField
                    id="middleName"
                    label="Middle Name"
                    defaultValue={modalData.middleName}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <OutlinedTextField
                    id="lastName"
                    label="Last Name"
                    defaultValue={modalData.lastName}
                    required
                  />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={12} md={4}>
                  <OutlinedTextField
                    id="email"
                    label="Email"
                    defaultValue={modalData.email}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    id="type"
                    name="type"
                    label="Type"
                    variant="outlined"
                    defaultValue={modalData.type}
                    fullWidth
                    required
                    disabled
                  />
                </Grid>
              </Grid>
              <Divider color="black" />
              <Button
                sx={{
                  color: 'white',
                  marginTop: '8px',
                  fontWeight: 500,
                  backgroundColor: '#52545F',
                  '&:hover': {
                    backgroundColor: '#757889',
                  },
                }}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
              {errors}
            </Box>
          }
        />
      )}
    </Box>
  );
};

interface ComponentProps {
  rows: Array<Data>;
}
