import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Link, Slide, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import Background from '../../utils/resources/images/background.svg';

export const Home = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  return (
    <Fragment>
      <Container
        sx={{
          height: '100vh',
          backgroundImage: `url(${Background})`,
          backgroundColor: '#2F3037',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
        maxWidth={false}
      >
        <Slide direction="down" in={true} timeout={750}>
          <Container component="section" sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              noWrap
              sx={{
                fontWeight: 500,
                textTransform: 'uppercase',
                p: { xs: 0, md: 15 },
                pt: { xs: 10 },
                fontSize: { xs: '3rem', md: '4rem' },
              }}
              color="primary.white"
            >
              {t('homepage.title')}
              <Typography variant="body1" color="primary.white" noWrap>
                {isAuthenticated ? (
                  <Button variant="text" component={Link} href="/attendance">
                    {t('homepage.loggedIn')}
                  </Button>
                ) : (
                  <Button variant="text" onClick={() => loginWithRedirect()}>
                    {t('homepage.loggedOut')}
                  </Button>
                )}
              </Typography>
            </Typography>
          </Container>
        </Slide>
      </Container>
    </Fragment>
  );
};
