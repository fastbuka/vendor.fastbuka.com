import cookie from 'cookie';

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'none' | 'strict' | 'lax';
  maxAge: number;
  path: string;
};

export const setTokenCookie = (res: any, token: string) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', 
    maxAge: 24 * 60 * 60,
    path: '/',
  };

  res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));
};

export const removeTokenCookie = (res: any) => {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', { maxAge: -1, path: '/auth/login' }));
};
