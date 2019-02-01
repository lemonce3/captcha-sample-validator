const path = require('path');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');
const Sequelize = require('sequelize');
const Router = require('koa-router');

global.config = require(path.resolve('config.json'));

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
  dialect: 'mysql',
  host: config.database.host,
});

const Captcha = module.exports = sequelize.define('training', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: Sequelize.STRING(4),
    allowNull: false
  },
  captcha: {
    type: Sequelize.BLOB,
    allowNull: false,
    get() {
      return this.getDataValue('captcha').toString('base64');
    }
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

const router = new Router({
  prefix: '/captcha'
});

router.get('/:captchaId', async ctx => {
  ctx.body = await Captcha.findByPk(ctx.params.captchaId)
}).patch('/:captchaId', async ctx => {
  const captcha = await Captcha.findByPk(ctx.params.captchaId)
  captcha.value = ctx.request.body.value;
  await captcha.save({
    fields: ['value']
  })

  ctx.body = captcha;
})

const app = new Koa();
app.use(bodyparser());
app.use(router.routes());
app.use(serve(path.resolve(config.static.path)));
app.listen(config.http.port, config.http.host);