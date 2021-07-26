import { Router } from 'express';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import { currentUser, login, outLogin, getFakeCaptcha } from './AntdAuth';


// User-route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);

// AntdUser-route
const antdUserRouter = Router();
antdUserRouter.get('/currentUser', currentUser);
antdUserRouter.post('/login/account', login);
antdUserRouter.post('/login/outLogin', outLogin);
antdUserRouter.get('/login/captcha', getFakeCaptcha);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/antd-auth', antdUserRouter);
export default baseRouter;
