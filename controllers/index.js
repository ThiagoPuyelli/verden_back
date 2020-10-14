const authentication = require("./AuthenticationControllers"),
      crudCourses = require("./CrudCoursesControllers"),
      crudUsers = require("./CrudUsersControllers"),
      filterCourses = require("./FilterCourses")

module.exports = { authentication, crudCourses, crudUsers, filterCourses };