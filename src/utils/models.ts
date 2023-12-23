export interface RouteObject {
  handle?: {
    crumb: string;
  };
}

export interface LoggedInUser {
  id: string;
  personalDetails: {
    name: {
      first: string;
      middle?: string;
      last: string;
    };
    emailID: string;
    phoneNumber: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
