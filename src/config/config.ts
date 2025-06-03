import * as process from 'process';

export const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
    databaseUrl: process.env.DATABASE_URL,
    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
  },
};
