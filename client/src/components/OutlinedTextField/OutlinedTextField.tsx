import { TextField } from '@mui/material';

export const OutlinedTextField = ({
  id,
  label,
  defaultValue,
  required,
  onChange = () => {
    return;
  },
  variant = 'outlined',
  type = 'text',
}: ComponentProps) => {
  return (
    <TextField
      id={id}
      name={id}
      label={label}
      variant={variant}
      type={type}
      sx={{
        color: 'white',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
      defaultValue={defaultValue}
      required={required}
      onChange={(value) => onChange(value)}
      autoComplete="off"
    />
  );
};

interface ComponentProps {
  id: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange?: Function;
  variant?: 'standard' | 'filled' | 'outlined';
  type?: string;
}
