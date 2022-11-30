import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CardActions,
  Collapse,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { SnackbarContent, SnackbarKey, useSnackbar } from 'notistack';
import { forwardRef, useCallback, useState } from 'react';

export const ErrorSnackbar = forwardRef<HTMLDivElement, ComponentProps>(
  ({ errors, id }: ComponentProps, ref) => {
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref} role="alert">
        <Card
          sx={{
            backgroundColor: '#d32f2f',
            width: '100%',
            color: '#fff',
            maxWidth: '288px',
          }}
        >
          <CardActions>
            <Typography fontWeight={600} sx={{ ml: 1 }}>
              {errors.length > 1 ? 'Errors' : 'Error'}!
            </Typography>
            <Stack direction="row" sx={{ ml: 'auto' }}>
              <IconButton
                aria-label="Show more"
                style={expanded ? { transform: 'rotate(180deg)' } : null}
                onClick={handleExpandClick}
              >
                <ExpandMoreIcon />
              </IconButton>
              <IconButton onClick={handleDismiss}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: 'transparent',
                p: 2,
              }}
            >
              {errors.map((error: Error) => {
                return (
                  <Typography
                    key={error.message}
                    variant="body1"
                    color="white"
                    gutterBottom
                  >
                    {error.message}
                  </Typography>
                );
              })}
            </Paper>
          </Collapse>
        </Card>
      </SnackbarContent>
    );
  }
);

ErrorSnackbar.displayName = 'ErrorSnackbar';

interface Error {
  message: string;
}

interface ComponentProps {
  id: SnackbarKey;
  errors: Array<Error>;
}
