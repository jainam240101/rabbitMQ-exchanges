/** @format */

const amqlib = require("amqplib");

const connectionString = "amqp://localhost:5672";
const exchange = "topic_testing";

const publish = async (routing_key, message) => {
  try {
    // Creating a Connection and channel
    const connection = await amqlib.connect(connectionString);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "topic", { durable: false });
    channel.publish(exchange, routing_key, Buffer.from(message));
    setTimeout(() => {
      console.log("Message Published to Exchange");
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log("Error ", error);
  }
};

// publish("users.registred", "A New User Registered");
// publish("users.update", "A User Updated his info");
// publish("payments.success", "The Payment Was Successful");
publish("payments.failure", "The Payment failed");
