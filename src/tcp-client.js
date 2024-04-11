import net from 'node:net';

if (process.argv.length < 4) {
  console.error('Usage: node tcp-client.js <message> <host>');
  process.exit(1);
}

const message = process.argv[2];
const host = process.argv[3];
const serverPort = 7896;

const client = net.createConnection({
  port: serverPort,
  host,
});

client.on('connect', () => {
  console.log('Connected to server!');
  client.write(message);
});

client.on('data', (data) => {
  console.log(`Received reply: ${data.toString()}`);
  client.end();
});

client.on('error', (err) => {
  console.error(`Client error: ${err.message}`);
  client.end();
});
