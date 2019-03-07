module.exports=(sequelize,DataTypes)=>
sequelize.define('repair',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    time:{//报修时间
        type:DataTypes.STRING,
    },
    
    content:{//报修内容
        type:DataTypes.STRING,
    },
    userID:{//报修的用户
        type:DataTypes.STRING,
    },
    state:{//维修状态默认为0
        type:DataTypes.STRING,
    }
    
})