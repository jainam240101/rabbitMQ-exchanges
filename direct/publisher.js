/** @format */

const amqlib = require("amqplib");

const connectionString = "amqp://localhost:5672";
const exchange = "direct_testing";

const publish = async (routing_key) => {
  try {
    // Creating a Connection and channel
    const connection = await amqlib.connect(connectionString);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", { durable: false });

    const msg = `This is Indian Embassy sending visa applicent for user xyz123 to ${routing_key} Embassy`;
    channel.publish(exchange, routing_key, Buffer.from(msg));
    setTimeout(() => {
      console.log("Message Published with routing key ", routing_key);
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log("Error ", error);
  }
};

publish("us.nyc");
// publish("au.syd");
