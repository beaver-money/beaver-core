import authRoutes from "@src/auth/routes";
import { globalError } from '@src/middleware/global-error';
import { withAuth } from '@src/middleware/with-auth';
import v1 from '@src/resources';
import { asyncHandler } from '@utils/async-handler';
import express, { json, urlencoded } from 'express';

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireApiKey } from "./middleware/api-key";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT || 3000;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/auth", requireApiKey, asyncHandler(authRoutes));
app.use("/api/v1/", withAuth, asyncHandler(v1));

app.use(globalError);

if (process.env.NODE_ENV === 'production') {
  app.listen(port, () => {
    console.log(`HTTP server running at http://localhost:${port}`);
  });
} else {
  const keyPath = path.resolve(__dirname, '../server.key');
  const certPath = path.resolve(__dirname, '../server.cert');
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server running at https://localhost:${port}`);
  });
}
