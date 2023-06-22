import mongoose from "mongoose";
import PropertyData from "../models/propertyData.js";

export const getAllProperties = async (req, res) => {
  try {
    const allProperties = await PropertyData.find();
    res.status(200).json(allProperties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProperty = async (req, res) => {
  const {
    ownerAddress,
    contractAddress,
    dataURI,
    rent,
    security,
    images,
    completeLocation,
    state,
    description,
    highlights,
    terms,
    duration,
  } = req.body;
  const newProperty = new PropertyData({
    ownerAddress,
    contractAddress,
    dataURI,
    rent,
    security,
    images,
    completeLocation,
    state,
    description,
    highlights,
    terms,
    duration,
  });
  try {
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const applyInterested = async (req, res) => {
  const { id } = req.params;
  const { userAddress } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No message with that id");
  const property = await PropertyData.findById(id);
  const updatedPropertyData = await PropertyData.findByIdAndUpdate(id, {
    interestedUsers: [...property.interestedUsers, userAddress],
  });
  res.json(updatedPropertyData);
};

export const clearInterested = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No message with that id");
  const updatedPropertyData = await PropertyData.findByIdAndUpdate(id, {
    interestedUsers: [],
    onRent: true,
  });
  res.json(updatedPropertyData);
};

export const getProperty = async (req, res) => {
  try {
    const { dataURI } = req.params;
    const httpsURI = `https://ipfs.io/ipfs/${dataURI}`;
    const property = await PropertyData.findOne({
      dataURI: httpsURI,
    });
    console.log(property);
    res.status(200).json(property);
  } catch (error) {
    res.status(404).message({ message: error.message });
  }
};

export const endTenantTime = async (req, res) => {
  try {
    const { dataURI } = req.params;
    const httpsURI = `https://ifps.io/ipfs/${dataURI}`;
    const updatedPropertyData = await PropertyData.findOneAndUpdate(
      { dataURI: httpsURI },
      {
        onRent: false,
      }
    );
    res.status(202).json(updatedPropertyData);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};
