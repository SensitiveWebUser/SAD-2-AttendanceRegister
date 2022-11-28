import Auth0 from 'auth0';
import debug from 'debug';

const logger = debug('backend:management-client');

const clientId = process.env.AUTH0_CLIENT_ID;
const clientSecret = process.env.AUTH0_CLIENT_SECRET;
const domain = process.env.AUTH0_ISSUER_BASE_URL || '';

const managementClient = new Auth0.ManagementClient({
  clientId,
  clientSecret,
  domain,
});

logger(`started man client with ${clientId} and ${clientSecret} and ${domain}`);

export default managementClient;
