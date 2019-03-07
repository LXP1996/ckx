module.exports = (sequelize, DataTypes) =>
  // define() 方法接受三个参数
  // 表名，表字段的定义和表的配置信息
  sequelize.define('user', {
    id: {
      // Sequelize 库由 DataTypes 对象为字段定义类型
      type: DataTypes.INTEGER(11),
      // 允许为空
      allowNull: false,
      // 设置主键
      primaryKey: true,
      // 设置自增
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      validate: {//正则验证 用户名必须是邮箱
        isEmail: {
          msg: '{"code":0,"msg":"用户名不符合邮箱"}'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {//密码正则验证 密码必须以英文开头并且包含数字或者英文 并且6-15位
        isEven: function (value) {
          if (!(/^[a-zA-Z][\d||[a-zA-Z]{5,14}$/.test(value))) {
            throw new Error('{"code":0,"msg":"密码必须以英文开头并且包含数字或者英文&6-15位"}')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {//姓名正则验证 
        isEven: function (value) {
          if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))) {
            throw new Error('{"code":0,"msg":"姓名必须中文或者英文"}');
          }
        }
      }
    },
    sex: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING
    },
    address: {//存社区ID
      type: DataTypes.STRING
    }
  })
