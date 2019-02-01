const Router = require('koa-router');
const Captcha = require('../domain/captcha');

const captchaRouter = module.exports = new Router({
  prefix: '/captcha'
});

captchaRouter.get('/:captchaId', async ctx => {
  const captchaId = ctx.params.captchaId;

  await Captcha.findByPk(captchaId)
    .then(captcha => ctx.body = captcha)
})

captchaRouter.patch('/:captchaId', async ctx => {
  const captchaId = ctx.params.captchaId;
  const captchaValue = ctx.request.rawBody;

  await Captcha.update({
      value: captchaValue
    }, {
      where: {
        id: captchaId
      }
    })
    .then(async row => {
      if (row[0] === 1) {
        await Captcha.findByPk(captchaId)
        .then(captcha => ctx.body = captcha);
      } else {
        ctx.state = 500;
      }
    })
})