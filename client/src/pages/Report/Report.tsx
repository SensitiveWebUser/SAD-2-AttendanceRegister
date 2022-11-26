import { Box, Container, Grid } from '@mui/material';
import { TextReport } from '../../components/TextReport';
import { BarReport } from '../../components/BarReport';
import { PieReport } from '../../components/PieReport';

export const Report = (): JSX.Element => {
  return (
    <Container sx={{ width: 'auto', pt: '100px', flexGrow: 1 }}>
      <Grid container>
        <Grid item>
          <Box id="text-container" sx={{ width: '100%' }}>
            <TextReport />
          </Box>
        </Grid>
        <Grid item>
          <Box id="bar-container" sx={{ width: '50%' }}>
            {/* <BarReport/> */}
          </Box>
        </Grid>
        <Grid item>
          <Box id="pie-container" sx={{ width: '50%' }}>
            {/* <PieReport/> */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
