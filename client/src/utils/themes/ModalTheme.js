export const ModalTheme = (size) => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '75vw', xl: '45vw' },
    border: '1px solid #000',
    boxShadow: 24,
    p: 6,
    backgroundColor: '#24252a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    overflowY: 'auto',
    height: size,
    display: 'block',
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      backgroundColor: 'transparent',
      width: 16,
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundClip: 'content-box',
      border: '6px solid transparent',
    },
  };
};
