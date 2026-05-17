import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

router.post("/", profileController.createProfile);
//single get
//all get only access admin
//update
//delete
export const profileRoute = router;
