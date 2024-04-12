import net from 'node:net';

if (process.argv.length < 4) {
  console.error('Usage: node tcp-client.js <message> <host>');
  process.exit(1);
}

const message = process.argv[2];
const host = process.argv[3];
const port = 7896;

const client = net.createConnection({ port, host });

client.on('error', (err) => {
  console.error(`client error:\n${err.stack}`);
  client.end();
});

client.on('connect', () => {
  console.log('connected to server');
  client.write(message);
});

client.on('data', (data) => {
  console.log(`client got: ${data}`);
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
}); 
