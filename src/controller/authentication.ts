import express from 'express';
import { UserModel, getUserByEmail } from 'db/users';

export const register = async (req:express.Request, res: express.Response) => {
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
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
}