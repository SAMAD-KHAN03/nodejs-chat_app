const net = require("node:net");

const IP = "::";
const PORT = 3000;
const sockets = [];

const server = net.createServer();

server.on("connection", (socket) => {
  const id = sockets.length + 1;
  const datetime = new Date();

  socket.write(`id-${id}`);
  sockets.push({ id: id.toString(), sock: socket });

  // Notify other users of a new connection
  sockets.forEach((element) => {
    if (element.sock !== socket)
      element.sock.write(
        `A new user connected with id ${id} at time ${datetime.toDateString()}`
      );
  });

  socket.on("data", (chunk) => {
    const dashIndex = chunk.toString().indexOf("-");
    const message = chunk.toString().substring(dashIndex + 9); // 'message-' offset
    const senderId = chunk.toString().substring(0, dashIndex);

    sockets.forEach((element) => {
      if (element.sock !== socket) {
        element.sock.write(`Message from user ${senderId}: ${message}`);
      }
    });
  });

  // Notify others if a user disconnects
  socket.on("end", () => {
    sockets.forEach((clientsocket) => {
      if (clientsocket.sock !== socket) {
        clientsocket.sock.write(`User ${id} has disconnected`);
      }
    });
    sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on("error", () => {
    sockets.forEach((client) => {
      if (client.sock !== socket) {
        client.sock.write(`User ${id} left due to an error!`);
      }
    });
    sockets.splice(sockets.indexOf(socket), 1);
  });
});

server.listen(PORT, IP, () => {
  console.log("Server started on", server.address());
});
