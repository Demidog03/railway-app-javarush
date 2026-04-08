require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db");
const { apiRouter } = require("./routes");

const PORT = Number(process.env.PORT ?? 3001);
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // eslint-disable-next-line no-console
  console.error("Missing MONGODB_URI in environment. Copy .env.example to .env and set it.");
  process.exit(1);
}

async function main() {
  await connectToDb(MONGODB_URI);

  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.use("/api", apiRouter);

  // basic error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

