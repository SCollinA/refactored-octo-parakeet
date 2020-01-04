import Promise from "bluebird";
import redis from "redis";
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();

client.on("connect", () => {
    // tslint:disable-next-line
    console.log("Redis client connected");
    client.flushall();
});

client.on("error", (err: Error) => {
    // tslint:disable-next-line
    console.log("Something went wrong " + err);
});

export default client;
