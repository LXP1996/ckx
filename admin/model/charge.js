module.exports = (sequelize, DataTypes) =>
    sequelize.define('charge', {
        id: {//收费编号
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        time: {//收费时间
            type: DataTypes.STRING
        },
        content: {//收费内容
            type: DataTypes.STRING
        },
        type: {//收费类别
            type: DataTypes.STRING
        },
        userID:{//用户ID
            type: DataTypes.STRING
        }
    })