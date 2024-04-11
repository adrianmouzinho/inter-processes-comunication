import dgram from 'node:dgram';

const serverPort = 6789;

const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP Server listening on port ${address.port}`);
});

server.on('message', (receivedData, remoteInfo) => {
  console.log(`Received message: ${receivedData.toString()}`);

  const reply = receivedData;
  server.send(reply, remoteInfo.port, remoteInfo.address, (err) => {
    if (err) {
      console.error(`Error sending reply: ${err.message}`);
    }
  });
});

server.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
  server.close();
});

server.bind(serverPort);