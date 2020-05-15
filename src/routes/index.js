const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

router.get("/profile/:usename", async (ctx, next) => {
  const { usename } = ctx.params;
  ctx.body = {
    title: "koa2 json",
    usename,
  };
});

router.post("/login", async (ctx, next) => {
  const { useName, password } = ctx.request.body;
  ctx.body = {
    useName,
    password,
  };
});

module.exports = router;
