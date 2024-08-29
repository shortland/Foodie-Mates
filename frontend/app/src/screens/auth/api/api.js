// api.js


import { IS_TESTING } from '@/app/_layout';

import dummySignInData from '@/app/test/screens/auth/api/signin.json';
import dummySignUpData from '@/app/test/screens/auth/api/signup.json';

const AUTH_API_URL = 'https://your-api-endpoint.com/auth';

export const authService = {
  signInWithEmailAndPassword: async (email, password) => {
    if (IS_TESTING) {
      // Return dummy data when testing
      return new Promise((resolve) => {
        resolve(dummySignInData);
      });
    } else {
      try {
        // Make a POST request to the authentication API
        const response = await fetch(AUTH_API_URL + '/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        // Parse the JSON response
        const data = await response.json();

        // Return the authentication data
        return data;
      } catch (error) {
        console.error('Error in signInWithEmailAndPassword:', error);
        throw error; // Rethrow the error for the caller to handle
      }
    }
  },

  signUpWithEmailAndPassword: async (email, password, userName) => {
    if (IS_TESTING) {
      // Return dummy data when testing
      return new Promise((resolve) => {
        resolve(dummySignUpData);  
      });
    } else {
      try {
        // Make a POST request to the sign-up API
        const response = await fetch(AUTH_API_URL + '/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name: userName }),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Sign-up failed');
        }

        // Parse the JSON response
        const data = await response.json();

        // Return the sign-up data
        return data;
      } catch (error) {
        console.error('Error in signUpWithEmailAndPassword:', error);
        throw error; // Rethrow the error for the caller to handle
      }
    }
  },
};
