/** @format */
const amqlib = require("amqplib");

const connectionString = "amqp://localhost:5672";
const exchange = "direct_testing";
const routing_key = "au.syd";

const consumer = async () => {
  try {
    const connection = await amqlib.connect(connectionString);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", { durable: false });
    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, exchange, routing_key);
    console.log("Waiting to get Messages");
    channel.consume(q.queue, (message) => {
      console.log("Message Received : ", message.content.toString());
    });
  } catch (error) {
    console.log("Error ", error);
  }
};

consumer();
