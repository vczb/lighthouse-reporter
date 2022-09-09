import express from "express";
const routes = express.Router();

import SessionController from "./app/controllers/session.controller";
import TriggerController from "./app/controllers/trigger.controller";
import ReportController from "./app/controllers/report.controller";
import authMiddleware from "./app/middlewares/auth.middleware";


routes.post("/signup", SessionController.signup);
routes.post("/signin", SessionController.signin);

routes.post(
  "/trigger/create",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.create
);
routes.get(
  "/trigger/show",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.show
);
routes.post(
  "/trigger/dispatch",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.dispatch
);
routes.get(
  "/report/show",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  ReportController.show
);


export default routes ;