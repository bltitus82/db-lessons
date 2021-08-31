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

User.hasOne(Profile, {
    onDelete: "CASCADE"
});
Profile.belongsTo(User);
/* 
One to Many Relationships
- one entry relates to multiple fields in another table
- for example, a user has multiple orders
- will use "hasMany" and "belongsTo"
*/

const Order = sequelize.define("Order", {
    shipDate: {
        type: DataTypes.DATE
    }
})

User.hasMany(Order);
Order.belongsTo(User);
/*
Many To Many Relationships
- multiple fields in one table can relate to multiple fields in another table
- for example, Twitter - I follow many and have many follow me
- will use "belongsToMany" both ways, and use "{through: "Table Name"}"
*/

const Class = sequelize.define("Class", {
    className: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATE
    }
})

User.belongsToMany(Class, { through: "Users_Classes"});
Class.belongsToMany(User, { through: "Users_Classes"});

;(async() => {
    await sequelize.sync({force: true});
})();