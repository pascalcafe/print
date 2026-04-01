import pg from "pg";

const { Client } = pg;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  process.exit(0);
}

const client = new Client({
  connectionString: databaseUrl
});

try {
  await client.connect();
  await client.query(`
    SELECT pg_terminate_backend(a.pid)
    FROM pg_locks l
    JOIN pg_stat_activity a ON a.pid = l.pid
    WHERE l.locktype = 'advisory'
      AND l.objid = 72707369
      AND a.state = 'idle'
  `);
} finally {
  await client.end();
}
