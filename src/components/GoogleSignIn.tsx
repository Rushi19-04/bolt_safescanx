import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const GoogleSignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (user) {
    return <div>Signed In: {user.user.displayName}</div>;
  }

  return (
    <button onClick={() => signInWithGoogle()} className="google-signin-btn">
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;