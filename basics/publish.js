/** @format */

const amqlib = require("amqplib");

const queue = "basics";
const connectionString = "amqp://localhost:5672";
const message = "Hello World";

const publish = async () => {
  try {
    // Creating a Connection and channel
    const connection = await amqlib.connect(connectionString);
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log("Message Sent");
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log("Error ", error);
  }
};

publish();
