import React, { FunctionComponent } from 'react';

import { useAuthContext } from '@providers/AuthProvider';

const Register: FunctionComponent = () => {
  const { setLoggedInUser } = useAuthContext();

  const register = (): void => {
    setLoggedInUser({
      id: 'id-123-abc',
      personalDetails: {
        name: {
          first: 'John',
          middle: 'Samuel',
          last: 'Smith'
        },
        emailID: 'john.smith@domain.com',
        phoneNumber: '+1-123-456-7890'
      },
      tokens: {
        accessToken: 'at-qwerty',
        refreshToken: 'rt-abcde'
      }
    });
  };

  return <button onClick={register}>Register</button>;
};

export default Register;
