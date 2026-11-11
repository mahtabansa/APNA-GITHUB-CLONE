import { Issue } from "../models/issueModel.js";

export const createIssue = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    if (!title || !description) {
      return res.staus(400).json({ message: "all field required" });
    }
    const issue = new Issue({
      title: title,
      description: description,
      repository: id,
    });
    if (!issue) {
      return res.status(400).json({ message: "could not create issue" });
    }
    await issue.save();
    return res.status(200).json({ message: issue });
  } catch (error) {
    console.log("Error while creating issue");
    return res.status(400).json({ message: "could not create issue" });
  }
};
export const udpateIssueById = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    if (!title || !description) {
      return res.staus(400).json({ message: "at least one field required" });
    }
    const issue = await Issue.findById({ _id: id });
  
    if (!issue) {
      return res.staus(404).json({ message: "issue not found" });
    }

    issue.title = title;
    issue.description = description;
    await issue.save();

    return res.status(200).json({ message: issue });
  } catch (error) {
    console.log("Error while updating issue");
    return res.status(400).json({ message: "could not update issue" });
  }
};

export const deleteIssueById = async (req, res) => {

  const { id } = req.params;
  try {

    const issue = await Issue.findByIdAndDelete({ _id: id });
    
    if (!issue) {
      return res.staus(404).json({ message: "issue not found" });
    }

    return res.status(200).json({ message:"issue deleted successfully" });
  } catch (error) {
    console.log("Error while updating issue");
    return res.status(400).json({ message: "could not update issue" });
  }
};

export const getIssueById = async (req, res) => {
  const { id } = req.params;
  try {

    const issue = await Issue.findOne({ _id: id });
    
    if (!issue) {
      return res.staus(404).json({ message: "issue not found" });
    }

    return res.status(200).json({ message:issue});
  } catch (error) {
    console.log("Error while finding issue");
    return res.status(400).json({ message: "Error while finding issue" });
  }
};

export const getAllIssues = async (req, res) => {
 const { id } = req.params;
  try {

    const issues = await Issue.find({});
    
    if (!issues) {
      return res.staus(404).json({ message: "issue not found" });
    }

    return res.status(200).json({ message:issues});
  } catch (error) {
    console.log("Error while finding issues");
    return res.status(400).json({ message: "Error while finding issues" });
  }
};
