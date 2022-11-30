import { Backdrop, Fade, Modal } from '@mui/material';

export const CustomModal = ({ open, close, layout }: ComponentProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{layout}</Fade>
    </Modal>
  );
};

interface ComponentProps {
  open: boolean;
  close: () => void;
  layout: JSX.Element;
}
