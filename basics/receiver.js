/** @format */

const amqlib = require("amqplib");

const queue = "basics";
const connectionString = "amqp://localhost:5672";

const receive = async () => {
  try {
    // Creating a Connection and channel
    const connection = await amqlib.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    console.log("Listening For Messages");
    channel.consume(queue, (message) => {
      console.log("Message from Receiver ", message.content.toString());
      channel.ack(message);
    });
  } catch (error) {
    console.log("Error ", error);
  }
};

receive();
