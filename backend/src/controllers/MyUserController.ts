import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createCurrentUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send({ message: 'User Already Exist!' });
    }

    const newUser = new User(req.body);
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1d' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
    });

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating user' });
  }
};

const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1d' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
    });

    return res.status(200).json({ success: true, userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error with user login' });
  }
};

const validateToken = async (req: Request, res: Response): Promise<any> => {
  try {
    res.status(200).send({ userId: req.userId });
  } catch (error) {
    res.status(500).send({ message: 'Error validating user' });
  }
};

const userLogout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.cookie('auth_token', '', { expires: new Date(0) });
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error logging out user' });
  }
};

export default {
  createCurrentUser,
  loginUser,
  validateToken,
  userLogout,
};
