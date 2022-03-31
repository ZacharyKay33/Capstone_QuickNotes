// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createUserWithEmailAndPassword,
  updateProfile,
  Auth,
} from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  auth: Auth;
  user: {
    email: string;
    password: string;
    username: string;
  };
};

type Response = { user: {}; message: string; code: number };

const createUser = (payload: Data): Response => {
  let response = { user: {}, message: "", code: 200 };
  const auth = payload.auth;
  createUserWithEmailAndPassword(
    auth,
    payload.user.email,
    payload.user.password
  )
    .then((userCredential) => {
      //Signed In
      if (auth.currentUser !== null) {
        updateProfile(auth.currentUser, {
          // Updating the firebase username
          displayName: payload.user.username,
        });
      }
      if (userCredential.user !== null) {
        //Sending the user back as a response
        response.user = userCredential.user;
        response.code = 200;
      }
      return response;
    })
    .catch((error) => {
      // Catching errors if there are any
      response.message = error.message;
      response.code = error.code;
      return response;
    });
  return (response = {
    user: {},
    code: 400,
    message: "Bad request, atrocious even.",
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    let response = createUser(req.body);
    res.status(response.code).json(response.user);
  }
  res.status(400).json({ user: {} });
}
