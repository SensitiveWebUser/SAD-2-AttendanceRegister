import { OutlinedTextField } from './OutlinedTextField';

describe('<OutlinedTextField />', () => {
  test('Should render the OutlinedTextField component with basic props', async () => {
    <OutlinedTextField id="basic" label="basic" />;
  });
  test('Should render the OutlinedTextField component with the required prop', async () => {
    <OutlinedTextField id="required" label="required" required />;
  });
  test('Should render the OutlinedTextField component with the defaultValue prop', async () => {
    <OutlinedTextField id="value" label="value" defaultValue="value" />;
  });
  test('Should render the OutlinedTextField component with the onChange prop', async () => {
    <OutlinedTextField id="onChange" label="onChangeg" onChange={() => {}} />;
  });
  test('Should render the OutlinedTextField component with the variant prop', async () => {
    <OutlinedTextField id="variant" label="variant" variant="outlined" />;
  });
  test('Should render the OutlinedTextField component with type prop', async () => {
    <OutlinedTextField id="type" label="type" type="filled" />;
  });
  test('Should render the OutlinedTextField component with all props', async () => {
    <OutlinedTextField
      id="firstName"
      label="First Name"
      defaultValue="value"
      onChange={() => {}}
      variant="outlined"
      type="filled"
      required
    />;
  });
});
