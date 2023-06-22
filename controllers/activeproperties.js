import mongoose from "mongoose";
import ActiveProperties from "../models/activeProperties.js";

export const getAllActiveProperties = async (req, res) => {
  try {
    const allProperties = await ActiveProperties.find();
    res.status(200).json(allProperties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createActiveProperty = async (req, res) => {
  const {
    ownerAddress,
    tenantAddress,
    dataURI,
    startDate,
    endDate,
    dueDates,
    duration,
    contractAddress,
    rent,
    security,
  } = req.body;
  const newProperty = new ActiveProperties({
    ownerAddress,
    tenantAddress,
    dataURI,
    startDate,
    endDate,
    dueDates,
    duration,
    contractAddress,
    rent,
    security,
  });
  try {
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const checkIfTenant = async (req, res) => {
  const { address } = req.params;
  try {
    const tenantProperty = await ActiveProperties.findOne({
      tenantAddress: address,
    });
    res.status(200).json(tenantProperty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPropertyFromURI = async (req, res) => {
  const { dataURI } = req.params;
  const httpsURI = `https://ipfs.io/ipfs/${dataURI}`;
  try {
    const propertyData = await ActiveProperties.findOne({
      dataURI: httpsURI,
    });
    res.status(200).json(propertyData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteDealing = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await ActiveProperties.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
};
