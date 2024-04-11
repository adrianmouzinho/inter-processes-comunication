import net from 'node:net';

const serverPort = 7896;

const server = net.createServer((clientSocket) => {
  console.log('New client connected!');

  clientSocket.on('data', (data) => {
    const message = data.toString();
    console.log(`Received message: ${message}`);
    clientSocket.write(`Echo: ${message}`);
  });

  clientSocket.on('end', () => {
    console.log('Client disconnected!');
  });

  clientSocket.on('error', (err) => {
    console.error(`Client error: ${err.message}`);
  });
});

server.listen(serverPort, () => {
  console.log(`TCP Server listening on port ${serverPort}`);
});
