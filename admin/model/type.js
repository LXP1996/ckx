
module.exports= (sequelize, DataTypes) =>
  // define() 方法接受三个参数
  // 表名，表字段的定义和表的配置信息
  sequelize.define('type', {
    id: {
      // Sequelize 库由 DataTypes 对象为字段定义类型
      type: DataTypes.INTEGER(11),
      // 允许为空
      allowNull: false,
      // 主键
      primaryKey: true,
      // 自增
      autoIncrement: true,
    },
    tname: {
      validate:{
         //社区类型正则验证(自定义验证)
        isEven:function(value){
          if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))){
        throw new Error("{code:0,msg:'社区类型只能是中文或者英文'}");
          }
        }
      },
      type: DataTypes.STRING,
    }
  })