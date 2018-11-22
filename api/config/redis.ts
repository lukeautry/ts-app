import Redis from "ioredis";

const createClient = () => {
  return new Redis(6379, "localhost", {});
};

const clients: { [key: string]: Redis.Redis | undefined } = {};

export const getRedisClient = (key = "default") => {
  let client = clients[key];
  if (!client) {
    client = clients[key] = createClient();
  }

  client.setMaxListeners(100);

  return client;
};
