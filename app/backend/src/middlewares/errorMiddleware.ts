import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (err, _req, res, next) => {
  const { status, name, message } = err;

  if (name === 'JsonWebTokenError') {
    res.status(401).json({ message: 'Token must be a valid token' });
    return next();
  }
  if (name === 'ValidationError') {
    res.status(400).json({ message: 'All fields must be filled' });
    return next();
  }
  if (name === 'NotFoundError') {
    res.status(404).json({ message: 'There is no team with such id!' });
  }
  res.status(status || 500).json({ message });

  next();
};

export default errorMiddleware;
