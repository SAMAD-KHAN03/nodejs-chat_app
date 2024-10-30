const net = require("net");
const readline = require("readline/promises");
const PORT = 3000;
const HOST = "::1"; //also connect using dns

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};
const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
let id;
const socket = net.createConnection({ port: PORT, host: HOST }, async () => {
  const ask = async () => {
    answer = await r.question("Write Something >");
    //-1 means move curson up
    await moveCursor(0, -1);
    await clearLine(0);
    socket.write(`${id}-message-${answer}`);
  };
  ask();
  socket.on("data", async (data) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);

    if (data.toString().substring(0,3) === "id-") {
      id = data.toString().substring(3);
      console.log(`You are Connected To Server and Your Id is ${id}`);
    } else {
      console.log(`User: ${data.toString()}`);
    }
    ask();
  });
});
socket.on("end", () => {
  console.log(`server has disconnected`);
});
socket.on("close", () => {
  console.log("server closed");
});
