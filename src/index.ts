import authRoutes from "@src/auth/routes";
import { globalError } from '@src/middleware/global-error';
import { withAuth } from '@src/middleware/with-auth';
import v1 from '@src/resources';
import { asyncHandler } from '@utils/async-handler';
import express, { json, urlencoded } from 'express';
import { requireApiKey } from "./middleware/api-key";

const app = express();
const port = process.env.PORT || 3000;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/auth", requireApiKey, asyncHandler(authRoutes));
app.use("/api/v1/", withAuth, asyncHandler(v1));

app.use(globalError);

app.listen(port, () => {
  console.log(`📟 Server running at http://localhost:${port}`);
});
