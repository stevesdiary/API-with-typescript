import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
   try{
      const salt = random();
      const { email, password } = req.body;
      if (!email && !password) {
         return res.status(400).json('Email and password are required!')
      }
      const user = await getUserByEmail(email) //.selected(+authentication.salt +authentication.password);
      if (!user ) {
         return res.status(404).json('User ' + email + ' is not found, registration is required before you login!')
      }
      //Authentication of the user without knowing their password
      const encrypted =authentication(user.authentication.salt, password)
      const expectedHash = encrypted;
      if (encrypted != expectedHash ) {
         return res.status(403).json('Incorrect password!')
      }
      
      user.authentication.sessionToken = authentication(salt, user._id.toString());
      await user.save();

      res.cookie('STEVE-AUTH', user.authentication.sessionToken), {domain: 'localhost', path: '/'};
      return res.status(200).json(user).end();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
}
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