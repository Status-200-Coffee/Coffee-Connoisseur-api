const Koa = require("koa");
const Router = require("koa-router");
const { getShopsByCity, getShopById, patchShopById } = require("./controllers/coffee.controller");
const {getUsers, getUserByUsername} = require("./controllers/users.controller")
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new Router();

app.use(router.routes());

router.use(bodyParser())

router.get("/", (ctx) => {
  ctx.body = "app is working";
});

router.get("/api/shops/:city/:shop_id", getShopById);

router.patch("/api/shops/:city/:shop_id", patchShopById)

router.get("/api/shops/:city", getShopsByCity);

router.get("/api/users", getUsers);

router.get("/api/users/:username",getUserByUsername);

router.use((err, ctx, next) => {
  ctx.status = err.response.status;
  ctx.body = err.response.message;
});


app.listen(9090, function () {
  console.log("Server running on http://localhost:9090");
});

module.exports = app



