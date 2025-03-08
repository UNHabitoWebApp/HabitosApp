import Redis from "ioredis";

export const redisConfig = {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
};

const redisClient = new Redis(redisConfig);

export default redisClient;
