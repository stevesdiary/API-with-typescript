import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
   try{
      const { email, password, username } = req.body;

      if (!email || !password || !username ) {
         console.log("Oops! Email, password and username is required!")
         return res.status(400).json('Email, password and username is required!');
      }
      const existingUser = await getUserByEmail(email);
      if ( existingUser ) {
         return res.status(400).json('User already exists!');
      }
      const salt = random();
      const user = await createUser({
         email,
         username,
         authentication: {
            salt,
            password: authentication(salt, password),
         },
       });
       return res.status(200).json(user).end();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
}