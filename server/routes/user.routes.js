// the Express app's user API endpoints enable CRUD operations on user data. To implement these endpoints, the routes and corresponding controllers are defined.

import express from "express";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("api/users/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;
