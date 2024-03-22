const Koa = require("koa");
const Router = require('koa-router')

const app = new Koa();
const router = new Router()

app.use(router.routes())

router.get('/', (ctx) => {ctx.body = "app is working"})

app.listen(9090, function () {
  console.log("Server running on https://localhost:9090");
});
