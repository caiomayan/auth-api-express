import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" with { type: "json" };

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const PORT = process.env.PORT;

const app = express();

app.set("trust-proxy", 1);

app.use(express.json());
app.use(helmet());
app.use(cors());

// Global
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the Auth API</h1><p>You can check the repository to routes details on <a href='https://github.com/caiomayan/auth-api-express' target='_blank'>GitHub</a>.</p><p>Start with <a href='/health'>/health</a> endpoint!</p>",
  );
});

app.get("/health", (req, res) => {
  res.json({
    status: "Ok",
  });
});

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js",
    ],
  }),
);

app.listen(PORT, () => {
  console.log(`auth-api is running on port ${PORT}!`);
});
