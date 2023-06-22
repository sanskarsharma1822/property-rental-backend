import express from "express";

//Controllers

import {
  getAllProperties,
  createProperty,
  applyInterested,
  clearInterested,
  getProperty,
  endTenantTime,
} from "../controllers/property.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:dataURI/onRent", getProperty);
router.patch("/:dataURI", endTenantTime);
router.post("/", createProperty);
router.patch("/:id/applyInterested", applyInterested);
router.patch("/:id/clearInterested", clearInterested);

export default router;
