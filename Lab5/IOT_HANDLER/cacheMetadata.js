require('dotenv').config();
const sql = require('mssql');
const redis = require('redis');


const sqlConfig = {
    user: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DB,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

const redisClient = redis.createClient({
    url: `rediss://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD
});

async function cacheMetadata() {
    try {
        console.log("Connecting to Azure SQL...");
        await sql.connect(sqlConfig);

        const turbines = await sql.query`SELECT * FROM Turbines`;
        const sensors = await sql.query`SELECT * FROM Sensors`;

        console.log("Connecting to Redis...");
        await redisClient.connect();

        console.log("Caching Turbines...");
        for (const t of turbines.recordset) {
            await redisClient.hSet(`turbine:${t.id}`, {
                name: t.name,
                latitude: t.latitude,
                longitude: t.longitude,
                location: t.location
            });
        }

        console.log("Caching Sensors...");
        for (const s of sensors.recordset) {
            await redisClient.hSet(`sensor:${s.id}`, {
                turbine_id: s.turbine_id,
                sensor_type: s.sensor_type,
                parameter: s.parameter,
                unit: s.unit,
                manufacturer: s.manufacturer
            });
        }

        console.log("Metadata cached successfully.");
        await redisClient.quit();
        await sql.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

cacheMetadata();
