import mongoose from "mongoose";
import { Issue } from "../models/issueModel.js";
import { User } from "../models/userModel.js";
import { Repository } from "../models/repoModel.js";

export const createRepository = async (req, res) => {
  const { name, description, content, visibility, owner, issues } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Repository name is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ message: "Invalid user " });
    }
    const repo = new Repository({
      name,
      description,
      content,
      visibility,
      owner,
      issues,
    });
    await repo.save();

    return res.status(201).json({
      message: "repository created successfully",
      RepositoyrId: repo._id,
    });
  } catch (error) {
    console.error("error while creating repository", error);
    res.status(400).json({ message: "error while creating repository" });
  }
};

export const getAllRepository = async (req, res) => {
  try {
    const repo = await Repository.find({});
    res.json(repo);
  } catch (error) {
    console.error("error while fetch repository", error);
    res.status(400).json({ message: "error while fetching repository" });
  }
};

export const fetchRepositoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const repo = await Repository.findOne({ _id: id });
    if (!repo) {
      return res.status(404).json({ message: "repository not found" });
    }
    return res.json(repo);
  } catch (error) {
    console.error("Error while fetching repository by id ");
    res.status(404).json({ message: "Error while fetching repository by id" });
  }
};

export const fetchRepositoryByName = async (req, res) => {
  const { name } = req.params;

  try {
    const repo = await Repository.findOne({ name: name });
    if (!repo) {
      return res.status(404).json({ message: "repository not found" });
    }
    return res.json(repo);
  } catch (error) {
    console.error("Error while fetching repository by name ");
    res
      .status(404)
      .json({ message: "Error while fetching repository by name" });
  }
};

export const fetchRespositoresForCurrentUser = async (req, res) => {
  const id = req.params.userID;
  try {
    const repo = await Repository.find({ owner: id });
    return res.json(repo);
  } catch (error) {
    console.error("Error while fetching repository for current user");
    res.status(404).json({ message: "Error while fetching repository " });
  }
};

export const deleteRespositoresById = async (req, res) => {
  const { id } = req.params;
  try {
    const repo = await Repository.findByIdAndDelete({ _id: id });
    if (!repo) {
      return res.status(404).json({ message: "repository could not delete" });
    }
    return res.json(repo);
  } catch (error) {
    console.error("Error while delete repository for current user");
    return res.status(404).json({ message: "Error while delete repository " });
  }
};

export const updateRepositry = async (req, res) => {
  const {id} = req.params;
  const { content, description } = req.body;
  console.log("content,description", content, description);
  try {
    const repo = await Repository.findOne({_id:id});
    console.log("repo found", repo);
    if (!repo) {
      return res.status(404).json({ message: "repository not found" });
    }
    repo.content = content;
    repo.description = description;
    await repo.save();
    return res.status(200).json({ owner: repo.owner, repoId: repo._id });
  } catch (error) {
    console.error("Error while delete repository for current user");
    return res.status(404).json({ message: "Error while delete repository " });
  }
};

export const togglVisibiliyById = async (req, res) => {
 const {id} = req.params;
  
  console.log("id", id);
  try {
    const repo = await Repository.findById({_id:id});

    if (!repo) {
      return res.status(404).json({ message: "repository not found" });
    }
    repo.visibility = !repo.visibility;
    await repo.save();
    return res.status(200).json({ message:"Repository toggled successfully", owner: repo.owner, repoId: repo._id });
  } catch (error) {
    console.error("Error while toggling repository for current user");
    return res.status(404).json({ message: "Error while toggling repository" });
  }
};
