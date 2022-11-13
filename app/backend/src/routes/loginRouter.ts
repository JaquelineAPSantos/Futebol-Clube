import * as express from 'express';
// import userController from '../controllers/userController';

const loginRoute = express.Router();
const adminValid = { email: 'admin@admin.com', password: 'secret_admin' };
// const adminNoPwd = { email: 'admin@admin.com', password: '' };

loginRoute.post('/', (req, res) => {
  res.status(200).json(adminValid);
  // res.status(400).json(adminNoPwd);
});
// loginRoute.get('/validate', userController.validateLogin);

export default loginRoute;
