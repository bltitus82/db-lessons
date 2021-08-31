require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING
    }
})

/*
One to One Relationships
- one direct relationship from one table to another. Each user only has 1 profile, each profile only relates to one user.
- will use "hasOne" and "belongsTo"

*/

const Profile = sequelize.define("Profile", {
    birthday: {
        type: DataTypes.DATE
    }
})

User.hasOne(Profile);
Profile.belongsTo(User);
/* 
One to Many Relationships

*/

/*

Many To Many Relationships

*/

;(async() => {
    await sequelize.sync({force: true});

})();