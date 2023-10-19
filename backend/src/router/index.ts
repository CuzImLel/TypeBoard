import express from "express";

import boards from "./board";
import tasks from "./task";

const router = express.Router();

export default (): express.Router => {
  boards(router);
  tasks(router);

  return router;
};
