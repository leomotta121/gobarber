const express = require("express");
const router = express.Router();

const projectExists = require("./middlewares/projectExists");
const projectDoesNotExists = require("./middlewares/projectDoesNotExists");
const appController = require("./controllers/app.controller");

router.get("/projects", appController.index);
router.post("/projects/:id", projectExists, appController.store);
router.put("/projects/:id", projectDoesNotExists, appController.update);
router.delete("/projects/:id", projectDoesNotExists, appController.delete);
router.post(
  "/projects/:id/tasks",
  projectDoesNotExists,
  appController.storeTask
);

module.exports = router;
