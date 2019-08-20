const Project = require("../db/project");
const ApiError = require("../helper/apiError");

exports.index = (req, res) => {
  return res.json(Project);
};

exports.store = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const newProject = { id: `${id}`, title: title, tasks: [] };

    Project.push(newProject);

    return res.status(201).json(Project);
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const index = Project.findIndex(el => el.id === id);

    Project[index].title = title;

    return res.json(Project);
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;

    const index = Project.findIndex(el => el.id === id);

    Project.splice(index, 1);

    return res.json(Project);
  } catch (error) {
    next(error);
  }
};

exports.storeTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const index = Project.findIndex(el => el.id === id);

    Project[index].tasks.push(title);

    return res.json(Project);
  } catch (error) {
    next(error);
  }
};
