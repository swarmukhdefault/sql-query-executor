import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '@providers/AuthProvider';

const Login: FunctionComponent = () => {
  const { setLoggedInUser } = useAuthContext();

  const login = (): void => {
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

  return (
    <div>
      <button onClick={login}>Login</button>
      <p>
        Don&apos;t have an account? <Link to='/auth/register'>Register</Link>
      </p>
      <p>
        <Link to='/auth/forgot-password'>Forgot password?</Link>
      </p>
    </div>
  );
};

export default Login;
