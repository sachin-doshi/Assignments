'use strict'
const Assignment = require("../api/Assignment/Assignment_Model");
const _ = require("lodash");
const logger = require("./logger");

logger.log("Seeding the Database");

const assignment = [
  {
    Type: "Cloud",
    Title: "Introduction to AWS",
    Duration: "30Min",
    Tags: ["AWS", "Cloud"],
    Name: "Introduction to AWS",
    Desc: "Learn AWS and Migrate workloads from your data center to AWS Cloud!"
  },
  {
    Type: "Cloud",
    Title: "Introduction to Azure",
    Duration: "30Min",
    Tags: ["Azure", "Cloud"],
    Name: "Introduction to Azure",
    Desc: "Learn Azure and Migrate workloads from your data center to AWS Cloud!"
  },
  {
    Type: "Art",
    Title: "Sound of Music",
    Duration: "40Min",
    Tags: ["Music", "Art"],
    Name: "Sound of Music",
    Desc: "Learn music for ears"
  },
  {
    Type: "Tech",
    Title: "Learn React today",
    Duration: "60Min",
    Tags: ["React", "Javascript"],
    Name: "Learn React today",
    Desc: "React makes it painless to create interactive UIs. Design simple views for each state in your application."
  },
  {
    Type: "Tech",
    Title: "Learn Vue js today",
    Duration: "60Min",
    Tags: ["Vue", "Javascript"],
    Name: "Learn Vue js today",
    Desc: "Vue.js - The Progressive, Simple and Fast JavaScript Framework"
  }
  
];

const createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

const cleanDB = function() {
  logger.log("... cleaning the DB");
  const cleanPromises = [Assignment].map(function(model) {
    return model.remove().exec();
  });
  return Promise.all(cleanPromises);
};

const createAssignment = function(data) {
  const promises = assignment.map(function(assignment) {
    return createDoc(Assignment, assignment);
  });

  return Promise.all(promises).then(function(assignments) {
    return _.merge({ assignments: assignments }, data || {});
  });
};

const createUsers = function(data) {
  const promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises).then(function(users) {
    return _.merge({ users: users }, data || {});
  });
};

var createCategories = function(data) {
  const promises = categories.map(function(category) {
    return createDoc(Category, category);
  });

  return Promise.all(promises).then(function(categories) {
    return _.merge({ categories: categories }, data || {});
  });
};

const createPosts = function(data) {
  const addCategory = function(post, category) {
    post.categories.push(category);

    return new Promise(function(resolve, reject) {
      post.save(function(err, saved) {
        return err ? reject(err) : resolve(saved);
      });
    });
  };

  const newPosts = posts.map(function(post, i) {
    post.author = data.users[i]._id;
    return createDoc(Post, post);
  });

  return Promise.all(newPosts)
    .then(function(savedPosts) {
      return Promise.all(
        savedPosts.map(function(post, i) {
          return addCategory(post, data.categories[i]);
        })
      );
    })
    .then(function() {
      return "Seeded DB with 5 Assignments";
    });
};

var createCategories = function(data) {
  var promises = categories.map(function(category) {
    return createDoc(Category, category);
  });

  return Promise.all(promises).then(function(categories) {
    return _.merge({ categories: categories }, data || {});
  });
};

cleanDB()
  .then(createAssignment)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));