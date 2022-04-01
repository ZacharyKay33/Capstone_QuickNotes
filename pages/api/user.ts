// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createUserWithEmailAndPassword,
  updateProfile,
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
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

/*API Methond
Name - authUser
Input - Payload in the above Data format
Output - a Response object
Purpose - Used when logging into system
*/
const authUser = (payload: Data): Response => {
  let response = { user: {}, message: "", code: 200 };
  const auth = payload.auth;
  signInWithEmailAndPassword(auth, payload.user.email, payload.user.password)
    .then((userCredential) => {
      //Signed In
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

/*API Methond
Name - createUser
Input - Payload in the above Data format
Output - a Response object
Purpose - Used when creating a user
*/
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
      if (userCredential.user !== null) {
        updateProfile(userCredential.user, {
          // Updating the firebase username
          displayName: payload.user.username,
        });
        //Sending the user back as a response
        populateDB(userCredential);
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

/*Service Method
Name - populateDb
Input - Usercredential
Output- None
Side Effect - Scaffold a document for the new user
*/
const populateDB = (userCredential: UserCredential):void => {
  console.log("Full User Credentials\n", userCredential);
}

//Recieves all requests, routes them to the correct method, returns a response
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    let response = createUser(req.body);
    res.status(response.code).json(response.user);
  } else if (req.method === "GET") {
    let response = authUser(req.body);
    res.status(response.code).json(response.user);
  }
  res.status(400).json({ user: {} });
}
