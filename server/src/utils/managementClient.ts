import Auth0 from 'auth0';

const clientId = process.env.AUTH0_CLIENT_ID || 'jest.client.com';
const clientSecret = process.env.AUTH0_CLIENT_SECRET || 'jest.secret.com';
const domain = process.env.AUTH0_ISSUER_BASE_URL || 'jest.eu.auth0.com';

const managementClient = new Auth0.ManagementClient({
  clientId: clientId,
  clientSecret: clientSecret,
  domain: domain,
});

export default managementClient;