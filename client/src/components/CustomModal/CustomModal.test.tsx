import { Container, Typography } from '@mui/material';
import { CustomModal } from './CustomModal';

describe('<CustomModal />', () => {
  test('Should render the CustomModal component with required props', async () => {
    <CustomModal open={true} close={() => {}} layout={<></>} />;
  });
  test('Should render the CustomModal component with custom layout props', async () => {
    <CustomModal
      open={true}
      close={() => {}}
      layout={
        <Container>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Text in a modal
          </Typography>
        </Container>
      }
    />;
  });
});
