const expressAsyncHandler = require("express-async-handler");
const Deet = require("../models/deetModel");

const getDeets = expressAsyncHandler(async (req, res) => {
  const deets = await Deet.find( req.user._id );
  res.json(deets);
});

const createDeet = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const deet = new Deet({ user: req.user._id, title, content, category });

    const createdDeet = await deet.save();

    res.status(201).json(createdDeet);
  }
});

const getDeetById = expressAsyncHandler(async (req, res) => {
  const deet = await Deet.findById(req.params.id);

  if (deet) {
    res.json(deet);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(deet);
});

const UpdateDeet = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const deet = await Deet.findById(req.params.id);

  if (deet.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (deet) {
    deet.title = title;
    deet.content = content;
    deet.category = category;

    const updatedDeet = await deet.save();
    res.json(updatedDeet);
  } else {
    res.status(404);
    throw new Error("Deet not found");
  }
});

  const DeleteDeet = expressAsyncHandler(async (req, res) => {
    const deet = await Deet.findById(req.params.id);
  
    if (deet.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (deet) {
      await deet.remove();
      res.json({ message: "Deet Removed" });
    } else {
      res.status(404);
      throw new Error("Deet not Found");
    }
  });



module.exports = { getDeets, createDeet, getDeetById, UpdateDeet, DeleteDeet };
