const Sequelize = require("sequelize");
const sequelize = new Sequelize("pgdb", "dbadmin", "rds-postgres12", {
  host: "mydbinstance.cbojipsq8az2.us-east-1.rds.amazonaws.com",
  dialect: "postgres",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established");
  })
  .catch(err => {
    console.log(err);
  });

  const User = sequelize.define('user',{
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        }
  });

//   User.sync({force:true})
//     .then(() => {
//         return User.create({
//             firstName:'Sachin',
//             lastName:'Doshi'
//         });
//     })

User.findAll()
.then((users) => {
    console.log(JSON.stringify(users) );
})
