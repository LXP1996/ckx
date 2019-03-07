let model = require("./../model/index");

//添加住户
async function add_user(obj) {
    let t = await model.User.findAll({
        where: {
            username: obj.username
        }
    })
    //如果账号存在不允许在注册
    if (t.length > 0) {

        return { code: 0, msg: "账号已存在" }

    } else {
        let temp = await model.User.create({
            username: obj.username,
            password: obj.password,
            sex: obj.sex,
            name: obj.name,
            state: "true",
            address: obj.address
        })

        if (temp) {//成功返回数据
            return { code: 1, msg: "success" }
        } else {//返回错误信息
            return { code: 0, msg: "error" }
        }
    }
}
//用户登录
async function user_login(obj) {

    if(obj.username=="root"&&obj.password=="123456"){
      //成功返回数据--->管理员账号
    return { code: 1, msg: "success", data:{username:"root",id:0} }
        
    }else{
 let temp = await model.User.findOne({
        where: {
            username: obj.username,
            password: obj.password
        }
    })

    if (temp) {//成功返回数据
        return { code: 1, msg: "success", data: temp }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
    }
   

   
}
//用户修改密码
async function update_pwd(obj) {
    let temp = await model.User.update({
        password: obj.password,
    }, {
            where: {
                id: obj.userID
            }
        })
    if (temp) {//成功返回数据
        return { code: 1, msg: "success" }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}

//用户修改自己信息
async function update_userinfo(obj) {
    let temp = await model.User.update({
        sex: obj.sex,
        name: obj.name,
        address: obj.address
    }, {
            where: {
                id: obj.userID
            }
        })

    if (temp) {//成功返回数据
        return { code: 1, msg: "success" }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}
//管理员将用户加入黑名单
async function add_back(obj) {
    console.log(obj)
    let temp = await model.User.update({
        state: obj.state,
    }, {
            where: {
                id: obj.userID
            }
        })
    if (temp) {//成功返回数据
        return { code: 1, msg: "success" }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}

//用户列表
async function query_user(obj) {
    model.User.belongsTo(model.communityInfo, { foreignKey: "address", targetKey: "id" })
    let temp = await model.User.findAll({
        include: [{
            model: model.communityInfo
        }]
    })

    if (temp) {//成功返回数据
        return { code: 1, msg: "success", data: temp }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}

//添加社区
async function add_community(obj) {
    let temp = await model.communityInfo.create({
        Name: obj.name,
        address: obj.address,
        charge: obj.charge,
        type: obj.type
    })
    if (temp) {//成功返回数据
        return { code: 1, msg: "success" }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}

//查询社区信息
async function query_Community() {
    let temp = await model.communityInfo.findAll();
    if (temp) {//成功返回数据
        return { code: 1, msg: "success", data: temp }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}
//删除社区信息
async function delete_Community(obj) {
    let temp = await model.communityInfo.destroy({
        where: {
            id: obj.userID
        }
    });
    if (temp) {//成功返回数据
        return { code: 1, msg: "success" }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}
//修改社区信息
async function updata_community(obj) {
    let temp = await model.communityInfo.update({
        Name: obj.name,
        address: obj.address,
        charge: obj.charge,
        type: obj.type
    }, {
            where: {
                id: obj.userID
            }
        })
    if (temp) {//成功返回数据
        return { code: 1, msg: "success" }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}
//报修
async function therepair(obj) {
    let data = new Date();

    let temp = await model.repair.create({
        time: data.getFullYear() + data.getMonth() + data.getDay() + data.getHours(),
        userID: obj.userID,
        content: obj.content,
        state: 0
    })
    if (temp) {//成功返回数据
        return { code: 1, msg: "success" }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}
//查询报修内容
async function queryrepair(obj) {
    model.repair.belongsTo(model.User, { foreignKey: "userID", targetKey: "id" })
    model.User.belongsTo(model.communityInfo, { foreignKey: "address", targetKey: "id" })
    let temp = await model.repair.findAll({
        include: [{
            model: model.User,
            include:[{
                model:model.communityInfo
            }]
        }]
    })
    if (temp) {//成功返回数据
        return { code: 1, msg: "success", data: temp }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}
//修改报修状态
async function updatarepair(obj) {
  
    let temp = await model.repair.update({
      state:obj.state
    },{
        where:{
            id:obj.id
        }
    })
    if (temp) {//成功返回数据
        return { code: 1, msg: "success", data: temp }
    } else {//返回错误信息
        return { code: 0, msg: "error" }
    }
}

module.exports = {
    updatarepair,
    queryrepair,
    therepair,
    add_user,
    update_pwd,
    update_userinfo,
    add_back,
    query_user,
    user_login,
    add_community,
    query_Community,
    delete_Community,
    updata_community

}