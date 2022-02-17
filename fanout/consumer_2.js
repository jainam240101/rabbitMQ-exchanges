/** @format */

const amqlib = require("amqplib");

const connectionString = "amqp://localhost:5672";
const exchange = "notification";
const routing_key = "fanout_routing";

const receive = async () => {
  try {
      const connection = await amqlib.connect(connectionString);
      const channel = await connection.createChannel();
      await channel.assertExchange(exchange, "fanout", { durable: false });
      const q = await channel.assertQueue("", { exclusive: true });
      console.log("Waiting to get Messages");
    await channel.bindQueue(q.queue, exchange, routing_key);
    channel.consume(q.queue, (message) => {
      console.log("Message got from Queue ", message.content.toString());
      channel.ack(message);
    });
  } catch (error) {
    console.log("Error ", error);
  }
};

receive();
