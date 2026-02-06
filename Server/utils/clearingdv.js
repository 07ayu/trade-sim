const { pub, connectRedis } = require("./redis");


async function run() {
    connectRedis()
    try {
        console.log("Connected to Redis");

        // See how bad it is
        const info = await pub.info("memory");
        console.log(info);

        // Nuclear cleanup (safe because Redis is cache/event bus)
        await pub.flushAll();
        console.log("FLUSHALL done. Redis memory cleared.");

        const after = await pub.info("memory");
        console.log(after);

    } catch (err) {
        console.error(err);
    } finally {
        pub.disconnect();
    }
}

run();
