const Project = require("../db/project");
const ApiError = require("../helper/apiError");

function projectExists(req, res, next) {
  try {
    const { id } = req.params;

    const projectExists = Project.find(el => el.id === id);

    if (!projectExists)
      throw new ApiError(
        "Project does not exist.",
        400,
        `The project you are trying access does not exist with id: ${id}.`
      );

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = projectExists;
