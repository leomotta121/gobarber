const Project = require("../db/project");
const ApiError = require("../helper/apiError");

function projectExists(req, res, next) {
  try {
    const { id } = req.params;

    const projectExists = Project.find(el => el.id === id);

    if (projectExists)
      throw new ApiError(
        "Project exists.",
        400,
        `The project you are trying to create already exists with id: ${id}.`
      );

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = projectExists;
