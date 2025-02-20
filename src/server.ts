import "module-alias/register";  
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileRoutes } from "@/router";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", fileRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
