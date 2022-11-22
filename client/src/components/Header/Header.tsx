import { useState, Fragment } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  Fab,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import logo from '../../utils/resources/images/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { ExternalLink } from '../ExternalLink';
import { useAuth0 } from '@auth0/auth0-react';

const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 250,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999,
        }}
      >
        <Fab
          color="secondary"
          size="small"
          aria-label="scroll back to top"
          sx={{
            backgroundColor: '#E5E5E5',
            transition: '0.5s ease-in-out',
            color: 'black',
            '&:hover': { backgroundColor: '#BDBDBD' },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};

export const Header = (): JSX.Element => {
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();
  const tooltipMessage = isAuthenticated ? 'Profile' : 'Login';
  const pages = ['home', 'attendance', 'report'];
  const icons = [
    <DashboardIcon key={'dashboardIcon'} />,
    <ArticleOutlinedIcon key={'articleIcon'} />,
    <AssessmentOutlinedIcon key={'tempIcon'} />,
  ];
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setSideBarOpen(open);
  };

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
      return;
    }
    loginWithRedirect();
  };

  return (
    <Fragment>
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Fade in={true} timeout={1000}>
          <Container maxWidth={false} component="section">
            <Toolbar disableGutters id="back-to-top-anchor">
              <Box
                sx={{
                  flexGrow: { xs: 1 },
                  display: { xs: 'flex' },
                }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="open drawer"
                  sx={{
                    color: 'primary.white',
                  }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={tooltipMessage}>
                  <IconButton sx={{ gap: 2 }} onClick={handleClick}>
                    <Avatar alt="Default Image" src={user?.picture} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </Fade>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={isSidebarOpen}
        onClose={toggleDrawer(false)}
        elevation={0}
        PaperProps={{ sx: { backgroundColor: '#24252a', color: 'white' } }}
      >
        <Box
          sx={{ width: { xs: 175, md: 250 } }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <Box margin="auto">
                <img src={logo} alt="logo" width={95} />
              </Box>
            </ListItem>
          </List>
          <Divider sx={{ bgcolor: '#CACACA' }} variant="middle" />
          <List>
            {pages.map((value, index) => (
              <ListItem
                button
                key={value}
                component={NavLink}
                to={value === 'home' ? '/' : value}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={value}
                  sx={{ textTransform: 'capitalize' }}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: '#CACACA' }} variant="middle" />
          <List>
            {isAuthenticated ? (
              <Fragment>
                <ListItem
                  button
                  key={'Profile'}
                  component={NavLink}
                  to={'/profile'}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Profile'} />
                </ListItem>
                <ListItem
                  button
                  key={'Logout'}
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Logout'} />
                </ListItem>
              </Fragment>
            ) : (
              <Fragment>
                <ListItem
                  button
                  key={'Login'}
                  onClick={() => loginWithRedirect()}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Login'} />
                </ListItem>
              </Fragment>
            )}
          </List>
          <List
            style={{
              position: 'fixed',
              bottom: 0,
              textAlign: 'center',
              paddingBottom: 10,
            }}
          >
            <ListItem>
              <ListItemText>
                Made with love
                <br />
                By{' '}
                <ExternalLink href="https://github.com/SensitiveWebUser/SAD-2-AttendanceRegister">
                  Group 2
                </ExternalLink>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <ScrollTop />
    </Fragment>
  );
};
