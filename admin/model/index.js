let Sequelize =require("sequelize");
let config =require("../config/database.config");

let sequelize=new Sequelize(config);

  //引入User实体表
 const User = sequelize.import(__dirname + '/user');
 const type=sequelize.import(__dirname+'/type')
 const admin=sequelize.import(__dirname+'/admin')
 const repair=sequelize.import(__dirname+'/repair')
 const charge=sequelize.import(__dirname+'/charge')
 const communityInfo=sequelize.import(__dirname+'/communityInfo')
sequelize.sync();//同步数据库
module.exports={
    User,
    type,
    admin,
    repair,
    charge,
    communityInfo
}
