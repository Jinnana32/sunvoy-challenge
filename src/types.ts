export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type TokenData = {
  access_token: string;
  openId: string;
  userId: string;
  apiuser: string;
  operateId: string;
  language: string;
};

export type SignedRequest = {
  fullPayload: string;
};
