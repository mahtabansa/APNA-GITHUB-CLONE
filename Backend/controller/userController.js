import jwt from "jsonwebtoken";
import { MongoClient, ObjectId, ReturnDocument } from "mongodb";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
configDotenv();

const client = new MongoClient(process.env.MONGO_URL);

export const signUp = async (req, res) => {
  try {
    await client.connect();
    const dbName = "gitHubClone";
    const db = client.db(dbName);
    const userCollection = db.collection("users");

    const { username, email, password } = req.body;

    let user = await userCollection.findOne({ username });
    if (user) {
      return res.send({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = await userCollection.insertOne({
      username: username,
      password: hashPassword,
      email: email,
      repositories: [],
      followedUser: [],
      StarRepo: [],
    });

    console.log("newuser", user);
    const token = jwt.sign(
      { id: user.insertedId },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    res.send({ token: token, userId: user.insertedId });
  } catch (err) {
    console.error("Error while signup ", err);
    res.status(500).json({ message: err });
  }
};

export const login = async (req, res) => {
  try {
    await client.connect();
    const dbName = "gitHubClone";
    const db = client.db(dbName);
    const userCollection = db.collection("users");

    const { email, password } = req.body;

    let user = await userCollection.findOne({ email: email });

    console.log("user", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ token: token, userId: user._id });
  } catch (err) {
    res.status(400).json({ message: err });
    console.log("invalid username and password");
  }
};

export const getAllUser = async (req, res) => {
  try {
    const dbName = "gitHubClone";
    await client.connect();
    const db = client.db(dbName);
    const userCollection = db.collection("users");
    const users = await userCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error while fetch users", error);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const currentId = req.params.id;
    await client.connect();
    const dbName = "gitHubClone";
    const collectionName = "users";
    const db = client.db(dbName);
    const userCollections = db.collection(collectionName);

    const user = await userCollections.findOne({
      _id: new ObjectId(currentId),
    });
    if (!user) {
      return res.status(404).json({ message: "user not  found " });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("could not find user profile!", error);
    res.status(500).json({ message: "could not find user profile!", error });
  }
};

export const UpdateUser = async (req, res) => {
  const currentId = req.params.id;
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db("gitHubClone");
    const userCollections = db.collection("users");

    const toBeUpdate = { email, password }; // Uses ES6 shorthand

    const updatedUser = await userCollections.findOneAndUpdate(
      { _id: new ObjectId(currentId) },
      { $set: toBeUpdate },
      { returnDocument: "after" },
    );

    // 1. ADDED 'return' HERE to stop code execution if update fails
    if (!updatedUser) {
      return res.status(400).json({ message: "user profile did not update" });
    }

    // 2. ADDED 'return' HERE for consistency and clean execution
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error while update user", error);

    // 3. Prevent crashing if headers were somehow already sent earlier
    if (res.headersSent) return;

    return res.status(500).json({ message: "error while update user" });
  }
};

export const deleteUser = async (req, res) => {
  const currentId = req.params.id;

  try {
    await client.connect();
    const db = client.db("gitHubClone");
    const userCollection = db.collection("users");
    const user = await userCollection.deleteOne({
      _id: new ObjectId(currentId),
    });

    if (!user) {
      return res.status(404).json({ message: "user did not delete" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error while deleting user profile", error);
    res.status(500).json({ message: "did not delete profile" });
  }
};
