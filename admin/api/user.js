let router = require("koa-router")();
let server = require("./../server/index");
router.prefix("/api/user");
//添加用户
router.post("/add_user", async (ctx) => {
  let obj = ctx.request.body
  await server.add_user(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})
//用户登录
router.post("/user_login", async (ctx) => {
  let obj = ctx.request.body
  await server.user_login(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})
//修改密码
router.post("/update_pwd", async (ctx) => {
  let obj = ctx.request.body
  await server.update_pwd(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})

//修改信息
router.post("/update_userinfo", async (ctx) => {
  let obj = ctx.request.body
  await server.update_userinfo(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})
//加入黑名单
router.post("/add_back", async (ctx) => {
  let obj = ctx.request.body
  await server.add_back(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})
//查询用户数据
router.get("/query_user", async (ctx) => {
  let obj = ctx.request.query//获取请求参数
  await server.query_user(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})

//添加社区
router.post("/add_community", async (ctx) => {
  let obj = ctx.request.body//获取请求参数
  await server.add_community(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})
//查询社区
router.get("/query_community", async (ctx) => {
  let obj = ctx.request.query//获取请求参数
  await server.query_Community(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})

//删除社区
router.post("/delete_Community", async (ctx) => {
  let obj = ctx.request.body//获取请求参数
  await server.delete_Community(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})
//修改社区信息
router.post("/updata_community", async (ctx) => {
  let obj = ctx.request.body//获取请求参数
  await server.updata_community(obj).then(res => {
    ctx.body = res;//向页面响应信息
  }).catch(err => {
    ctx.body = err.errors[0].message;
  });
})
module.exports = router;