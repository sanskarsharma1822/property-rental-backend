import express from "express";

//Controllers

import {
  getAllActiveProperties,
  createActiveProperty,
  checkIfTenant,
  getPropertyFromURI,
  deleteDealing,
} from "../controllers/activeproperties.js";

const router = express.Router();

router.get("/", getAllActiveProperties);
router.get("/:dataURI", getPropertyFromURI);
router.get("/:address/checkIfTenant", checkIfTenant);
router.post("/", createActiveProperty);
router.delete("/:id", deleteDealing);

export default router;
