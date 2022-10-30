import express from "express";
const routes = express.Router();

import SessionController from "./app/controllers/session.controller";
import TriggerController from "./app/controllers/trigger.controller";
import ReportController from "./app/controllers/report.controller";
import authMiddleware from "./app/middlewares/auth.middleware";
import UserController from "./app/controllers/user.controller";


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
routes.post(
  "/trigger/delete",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.delete
);
routes.post(
  "/trigger/edit/:name",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.edit
);
routes.get(
  "/report/show",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  ReportController.show
);
routes.post(
  "/user/delete",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  UserController.delete
);
routes.post(
  "/user/edit",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  UserController.edit
);


export default routes;
