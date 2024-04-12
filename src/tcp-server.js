import net from 'node:net';

const port = 7896;

const server = net.createServer((socket) => {
  console.log('client connected');

  socket.on('data', (data) => {
    console.log(`server got: ${data}`);
    socket.write('hello tcp client!');
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });

  socket.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    socket.end();
  });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
