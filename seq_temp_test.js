const Sequelize = require("sequelize");

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
