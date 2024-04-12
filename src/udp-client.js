import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

if (process.argv.length < 4) {
  console.error('Usage: node upd-client.js <message> <host>');
  process.exit(1);
}

const message = Buffer.from(process.argv[2]);
const address = process.argv[3];
const port = 6789;

const client = dgram.createSocket('udp4');

client.connect(port, address, () => {
  client.send(message, (err) => {
    if (err) {
      console.error(`error sending message: ${err.stack}`);
      client.close();
    }

    client.on('message', (msg, rinfo) => {
      console.log(`client got: ${msg}`);
      client.close();
    });
  });
});