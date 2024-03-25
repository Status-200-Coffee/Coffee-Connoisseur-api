const Koa = require("koa");
const Router = require('koa-router')
const { getShopsByCity, getShopById } = require("./controllers/coffee.controller");
const app = new Koa();
const router = new Router();

app.use(router.routes());

router.get("/", (ctx) => {
  ctx.body = "app is working";
});

router.get("/api/shops/:city/:shop_id", getShopById);
router.get("/api/shops/:city", getShopsByCity);

router.use((err, ctx, next) => {
  ctx.status = err.response.status;
  ctx.body = err.response.message;
});


app.listen(9090, function () {
  console.log("Server running on http://localhost:9090");
});

module.exports = app



