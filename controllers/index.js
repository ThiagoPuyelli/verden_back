const authentication = require("./AuthenticationControllers"),
      crudCourses = require("./CrudCoursesControllers"),
      crudUsers = require("./CrudUsersControllers"),
      filterCourses = require("./FilterCourses"),
      crudSections = require("./CrudSectionsControllers"),
      submitFiles = require("./SubmitFilesControllers"),
      rating = require("./RatingControllers")

module.exports = { 
    authentication, 
    crudCourses, 
    crudUsers, 
    filterCourses, 
    crudSections,
    submitFiles ,
    rating
};