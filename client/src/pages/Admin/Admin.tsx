import { useAuth0 } from '@auth0/auth0-react';
import UploadIcon from '@mui/icons-material/Upload';
import { LoadingButton } from '@mui/lab';
import { Grid, Paper as UnstyledPaper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRequest } from '../../hooks/useRequest';
import { CreateUser } from './CreateUser';
import { ResetPassword } from './ResetPassword';
import { UserTable } from './UserTable';

const Paper = ({ children }: PaperComponentProps) => {
  return (
    <UnstyledPaper
      elevation={4}
      sx={{
        backgroundColor: '#2E3035',
        minHeight: '40vh',
      }}
    >
      {children}
    </UnstyledPaper>
  );
};

interface PaperComponentProps {
  children: React.ReactNode;
}

export const Admin = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [users, setUsers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (!isAuthenticated) return;
    if (file && file.type === 'text/csv') {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      const token: string = ((await getAccessTokenSilently()) as string) || '';
      axios({
        method: 'post',
        url: 'http://localhost:3001/api/users/bulk',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          enqueueSnackbar(t('admin.uploadSuccess'), {
            variant: 'success',
          });
          setIsUploading(false);
        })
        .catch(() => {
          enqueueSnackbar(t('admin.uploadError'), {
            variant: 'error',
          });
        });
    }
  };

  const [getUsers] = useRequest({
    url: 'http://localhost:3001/api/users',
    method: 'get',
    onSuccess: (data) => setUsers(data),
  });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <Container
        maxWidth={false}
        sx={{
          p: { xs: 10 },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container mb={2}>
              <Grid item xs>
                <Typography variant="h4" color="white">
                  {t('admin.title.users')}
                </Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <LoadingButton
                  loading={isUploading}
                  loadingPosition="start"
                  startIcon={<UploadIcon style={{ fontSize: '1.5rem' }} />}
                  variant="text"
                  onChange={handleOnChange}
                  sx={{
                    color: 'salmon',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                  }}
                  component="label"
                >
                  {isUploading ? t('admin.uploading') : t('admin.uploadCSV')}
                  <input type="file" hidden />
                </LoadingButton>
              </Grid>
            </Grid>
            <Paper>{users.length > 0 && <UserTable rows={users} />}</Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h4" color="white" mb={6}>
              {t('admin.title.createUsers')}
            </Typography>
            <Paper>
              <CreateUser />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h4" color="white" mb={6}>
              {t('admin.title.resetPassword')}
            </Typography>
            <Paper>
              <ResetPassword />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
