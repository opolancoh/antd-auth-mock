"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFakeCaptcha = exports.outLogin = exports.login = exports.currentUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// import UserDao from "@daos/User/UserDao.mock";
// import { paramMissingError } from "@shared/constants";
// const userDao = new UserDao();
const { OK, UNAUTHORIZED } = http_status_codes_1.default;
/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
/* export async function getAllUsers(req: Request, res: Response) {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
} */
/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
/* export async function addOneUser(req: Request, res: Response) {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
} */
/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
/* export async function updateOneUser(req: Request, res: Response) {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
} */
/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
/* export async function deleteOneUser(req: Request, res: Response) {
    const { id } = req.params;
    await userDao.delete(Number(id));
    return res.status(OK).end();
} */
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site" ? "admin" : "";
const getAccess = () => {
    return access;
};
function currentUser(req, res) {
    if (!getAccess()) {
        return res.status(UNAUTHORIZED).json({
            data: {
                isLogin: false,
            },
            errorCode: "401",
            errorMessage: "请先登录！",
            success: true,
        });
    }
    const user = {
        name: "Sheldon Cooper",
        avatar: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        userid: "00000001",
        email: "antdesign@alipay.com",
        signature: "海纳百川，有容乃大",
        title: "交互专家",
        group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
        tags: [
            {
                key: "0",
                label: "很有想法的",
            },
            {
                key: "1",
                label: "专注设计",
            },
            {
                key: "2",
                label: "辣~",
            },
            {
                key: "3",
                label: "大长腿",
            },
            {
                key: "4",
                label: "川妹子",
            },
            {
                key: "5",
                label: "海纳百川",
            },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: "China",
        access: getAccess(),
        geographic: {
            province: {
                label: "浙江省",
                key: "330000",
            },
            city: {
                label: "杭州市",
                key: "330100",
            },
        },
        address: "西湖区工专路 77 号",
        phone: "0752-268888888",
    };
    return res.status(OK).json(user);
}
exports.currentUser = currentUser;
function login(req, res) {
    const { password, username, type } = req.body;
    if (password === "ant.design" && username === "admin") {
        access = "admin";
        return res.status(OK).json({
            status: "ok",
            type,
            currentAuthority: "admin",
        });
    }
    if (password === "ant.design" && username === "user") {
        access = "user";
        return res.status(OK).json({
            status: "ok",
            type,
            currentAuthority: "user",
        });
    }
    if (type === "mobile") {
        access = "admin";
        return res.status(OK).json({
            status: "ok",
            type,
            currentAuthority: "admin",
        });
    }
    access = "guest";
    return res.status(OK).json({
        status: "error",
        type,
        currentAuthority: "guest",
    });
}
exports.login = login;
function outLogin(req, res) {
    access = "";
    return res.status(OK).json({ data: {}, success: true });
}
exports.outLogin = outLogin;
function getFakeCaptcha(req, res) {
    return res.status(OK).json("captcha-xxx");
}
exports.getFakeCaptcha = getFakeCaptcha;
