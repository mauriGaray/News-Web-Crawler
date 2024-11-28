import { createClient } from "redis";

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST, // Cambia si el servidor Redis está en otra IP o dominio
    port: process.env.REDIS_PORT, // Asegúrate de que el puerto es correcto
  },
});

client.on("error", (err) => console.error("Redis Client Error", err));

await client.connect();
