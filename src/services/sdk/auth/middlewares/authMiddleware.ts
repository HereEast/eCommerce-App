import { type AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { projectKey } from '../../index';
import { tokenData } from '../token';

import { VITE_CTP_CLIENT_SECRET, VITE_CTP_AUTH_URL, VITE_CTP_CLIENT_ID } from '../../../../constant/metaData';

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: VITE_CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
  },
  tokenCache: tokenData,
  fetch,
};
