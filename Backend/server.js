import { hideBin } from "yargs/helpers";
import { initRepo } from "./controller/init.js";
import { addRepo } from "./controller/add.js";
import { commitRepo } from "./controller/commit.js";
import { pullRepo } from "./controller/pull.js";
import { pushRepo } from "./controller/push.js";
import { revertRepo } from "./controller/revert.js";
import yargs from "yargs";
import { mongoConenct } from "./config/db-config.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { mainRouter } from "./routes/mainRoute.js";

yargs(hideBin(process.argv))
  .command("start", "Start  new server", {}, StartServer)
  .command("init", "initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        description: "file to add to the stagging area",
        type: "String",
      });
    },
    (argv) => addRepo(argv.file),
  )

  .command(
    "commit <message>",
    "Commit the stagged file ",
    (yargs) => {
      yargs.positional("file", {
        description: "Commit message",
        type: "String",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    },
  )
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "pull commits to S3", {}, pullRepo)
  .command(
    "revert <commitID",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("CommitID", {
        description: "commit ID to revert to",
        type: "String",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    },
  )
  .demandCommand(1, "you need at least one command")
  .help().argv;

async function StartServer() {
  const app = express();
  const port = process.env.PORT || 3000;
  const server = http.createServer(app);

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    }),
  );
  
  app.use(express.json());

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(mainRouter);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  const db = mongoose.connection;
  db.once("open", async () => {
    console.log("CRUD OPERATIONS");
  });
  server.listen(port, mongoConenct(port));
}
