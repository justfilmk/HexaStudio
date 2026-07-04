export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: "postgres",
      port: 5432,
      database: "hexastudio_db",
      username: "hexa_admin",
      password: "staging_pwd_2026",
      ssl: false,
    },
    pool: {
      min: 0,
      max: 10,
    },
  },
});
