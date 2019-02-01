const path = require('path');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');

global.config = require(path.resolve('config.json'));

const router = require('./src/router');
const app = new Koa();

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  extendTypes: {
    text: ['text/plain'] 
  }
}));
app.use(router.routes());
app.use(serve(path.resolve(config.static.path)));

app.listen(config.http.port, config.http.host);