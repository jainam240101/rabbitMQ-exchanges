/** @format */

const amqlib = require("amqplib");

const connectionString = "amqp://localhost:5672";
const message = "This is a Direct Exchange Message";
const exchange = "direct_testing";
// const routing_key = "berlin";

const publish = async (routing_key) => {
  try {
    // Creating a Connection and channel
    const connection = await amqlib.connect(connectionString);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", { durable: false });
    channel.publish(exchange, routing_key, Buffer.from(message));
    setTimeout(() => {
      console.log("Message Published to Exchange");
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log("Error ", error);
  }
};

publish("argentina");
