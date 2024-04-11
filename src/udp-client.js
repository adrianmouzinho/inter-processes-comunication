import dgram from 'node:dgram';

if (process.argv.length < 4) {
  console.error('Usage: node upd-client.js <message> <host>');
  process.exit(1);
}

const message = process.argv[2];
const host = process.argv[3];
const serverPort = 6789;

const client = dgram.createSocket('udp4');

const messageBuffer = Buffer.from(message);

client.send(messageBuffer, 0, messageBuffer.length, serverPort, host, (err) => {
  if (err) {
    console.error(`Error sending message: ${err.message}`);
    client.close();
    return;
  }

  client.on('message', (receivedData, remoteInfo) => {
    console.log(`Received reply: ${receivedData.toString()}`);
    client.close();
  });
});