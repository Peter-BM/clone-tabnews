import database from "infra/database.js";
import { version } from "react";

async function getDatabaseVersion() {
  const dataBaseVersion = await database.query("SHOW server_version;");
  return dataBaseVersion.rows[0].server_version;
}

async function getDatabaseMaxConnections() {
  const dataBaseMaxConnections = await database.query("SHOW max_connections;");
  return parseInt(dataBaseMaxConnections.rows[0].max_connections);
}

async function getDatabaseOpenConnections() {
  const databaseName = process.env.POSTGRES_DB;
  const text = "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;";
  const query = { text: text, values: [databaseName] };
  const databaseOpenedConnections = await database.query(query);

  return databaseOpenedConnections.rows[0].count;
}

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dataBaseVersionValue = await getDatabaseVersion();
  const databaseMaxConnecitonsValue = await getDatabaseMaxConnections();
  const databaseOpenConnectionsValue = await getDatabaseOpenConnections();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: databaseMaxConnecitonsValue,
        open_connections: databaseOpenConnectionsValue,
        version: dataBaseVersionValue,
      },
    },
  });
}

export default status;
