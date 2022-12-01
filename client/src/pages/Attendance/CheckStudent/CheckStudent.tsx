import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CheckStudent = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-around"
      direction="row"
      p={3}
    >
      <Grid item xs={12}>
        <Typography
          variant="h2"
          sx={{
            p: '1rem',
            color: 'white',
          }}
        >
          {t('checkStudent.title')}
        </Typography>
      </Grid>
    </Grid>
  );
};
