import { useEffect, useState } from 'react';
import firebase from '../config/firebase';

import { useRedirectToNewsOnUpdates } from '../src/apps/news/news.hooks';

import SignInPage from './signin';
import ChatPage from './chat';

export default function IndexPage() {
  // show the News page if there are unseen updates
  useRedirectToNewsOnUpdates();

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return <SignInPage />
  }
  return (
    <ChatPage />
  );
}