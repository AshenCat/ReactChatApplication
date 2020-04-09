const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let conf = require("./conf/dbconf");

let userModel = require("./models/user");
let chatHistoryModel = require("./models/chat");
let eventHistoryModel = require("./models/event");

mongoose.connect(
  conf,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    else console.log("Successfully connected to remote DB");
  }
);
mongoose.set('useCreateIndex', true);
userList = {
  general: [],
  gaming: [],
  nsfw: [],
  politics: [],
  anime: [],
  startrek: [],
  chinaflu: [],
};

io.on("connection", (socket) => {
  eventHistoryModel.create(
    {
      type: "CONNECTION",
      PPID: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5),
    },
    (err, doc) => {
      if (err)
        console.log(
          "Internal server error: I don`t even know what to do anymore"
        );
    }
  );

  socket.on("message", (data) => {
    room = data.room;
    msg = data.msg;
    by = data.by;
    //console.log(data);
    chatHistoryModel.create(
      {
        msg,
        by,
        room,
      },
      (err, doc) => {
        if (err) {
          console.log(`System error when saving message: ${err}`);
          eventHistoryModel.create(
            {
              type: "ERROR",
              user: data.by,
              PPID: Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 5),
            },
            (err, doc) => {
              if (err)
                console.log(
                  "Internal server error: I don`t even know what to do anymore"
                );
            }
          );
        }
      }
    );
    io.to(`${room}`).emit("response", data);
  });

  socket.on("usersListUpdate", (data) => {
    room = data.room;
    socket.join(`${room}`);
    eventHistoryModel.create(
      {
        type: "JOINED",
        user: data.name,
        PPID: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5),
      },
      (err, doc) => {
        if (err)
          console.log(
            "Internal server error: I don`t even know what to do anymore"
          );
      }
    );
    userList[room] = [...userList[room], data.name];
    console.log(`Users in ${room} : ${userList[room]}`);
    io.to(`${room}`).emit("updateList", userList[data.room]);
  });

  socket.on("user-disconnect", (data) => {
    //console.log(`receiving emit ${data.name} disconnect from ${data.room}`);
    if (typeof data.room !== "undefined" || typeof data.name !== "undefined") {
      //console.log(`${data.name} has left ${data.room}`);
      room = data.room;
      socket.leave(room);
      eventHistoryModel.create(
        {
          type: "DISCONNECT",
          user: data.name,
          PPID: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5),
        },
        (err, doc) => {
          if (err)
            console.log(
              "Internal server error: I don`t even know what to do anymore"
            );
        }
      );
      // console.log(userList);
      userList[room] = userList[room].filter((usr) => usr !== data.name);
      console.log(`${data.name} has left ${room}`);
      console.log(`Users in ${room} : ${userList[room]}`);
      io.to(`${room}`).emit("updateList", userList[room]);
    } else {
    }
  });
});

var writeStream = fs.createWriteStream(path.join(__dirname, "http.log"), {
  flags: "a",
});

const messageRoute = require("./routes/messages");
const eventRoute = require("./routes/events");
const roomRoute = require("./routes/rooms");
const userRoute = require("./routes/users");

app.use(express.static(path.resolve(__dirname, "../build")));
app.use(cors());
app.use(morgan("common", { stream: writeStream }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/chatlog", messageRoute);
app.use("/api/events", eventRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.use((req, res, next) => {
  if (res.status === 200) res.status = 404
  next()
});

app.use((err, req, res, next) => {
  let error = new Error("Unable to fetch requested data...");
  res.json(error)
})

server.listen(port, () => console.log(`API running @ port ${port}`));
