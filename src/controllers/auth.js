import { registerUser, loginUser, refreshUsersSession, logoutUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const session = await loginUser(req.body);

    setupSession(res, session);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const refreshUserSessionController = async (req, res) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      return res.status(400).json({
        status: 400,
        message: 'No session found in cookies',
      });
    }

    await logoutUser({ sessionId });

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    return res.status(200).json({
      status: 200,
      message: 'Successfully logged out!',
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    });
  }
};
