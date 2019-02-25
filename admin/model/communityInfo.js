module.exports = (sequelize, DataTypes) =>
    sequelize.define('communityInfo', {
        id: {//社区编号
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
            validate: {//小区名称只能包含英文和中文
                isEven: function (value) {
                    if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))) {
                        throw new Error('{"code":0,"msg":"小区名称只能包含英文和中文"}');
                    }
                }
            }
        },
        address: {//社区地址
            type: DataTypes.STRING,
        },
        charge: {
            type: DataTypes.STRING,
            validate: {//费用只能是数字
                //父级ID正则验证
                isInt: {
                    isNumeric: true,
                    msg: '{"code":0,"msg":"费用只能是数字"}'
                }
            }
        },
        type: {//社区类型
            type: DataTypes.STRING,
        }
    })