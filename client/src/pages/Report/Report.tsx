import {
  Container,
  Grid,
  Paper as UnstyledPaper,
  Typography,
} from '@mui/material';
import { TextReport } from './TextReport';

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

export const Report = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        p: { xs: 10 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container mb={2}>
            <Grid item xs={12} mb={2}>
              <Typography variant="h4" color="white">
                Report
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <TextReport />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
