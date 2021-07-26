"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = require("./Users");
const AntdAuth_1 = require("./AntdAuth");
// User-route
const userRouter = express_1.Router();
userRouter.get('/all', Users_1.getAllUsers);
userRouter.post('/add', Users_1.addOneUser);
userRouter.put('/update', Users_1.updateOneUser);
userRouter.delete('/delete/:id', Users_1.deleteOneUser);
// AntdUser-route
const antdUserRouter = express_1.Router();
antdUserRouter.get('/currentUser', AntdAuth_1.currentUser);
antdUserRouter.post('/login/account', AntdAuth_1.login);
antdUserRouter.post('/login/outLogin', AntdAuth_1.outLogin);
antdUserRouter.get('/login/captcha', AntdAuth_1.getFakeCaptcha);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/antd-auth', antdUserRouter);
exports.default = baseRouter;
