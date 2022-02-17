/** @format */

const amqlib = require("amqplib");

const connectionString = "amqp://localhost:5672";
const message = "This is a Fanout Message from Publisher";
const exchange = "notification";
const routing_key = "fanout_routing";

const publish = async () => {
  try {
    // Creating a Connection and channel
    const connection = await amqlib.connect(connectionString);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, routing_key, Buffer.from(message));
    console.log("Message Published to Exchange");
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log("Error ", error);
  }
};

publish();
