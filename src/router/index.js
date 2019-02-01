const Router = require('koa-router');
const captchaRouter = require('./captcha');

const router = module.exports = new Router();

router.use(captchaRouter.routes())