import axios from "axios";
import { Request, Response } from "express";
import userService, { sanitize } from "../resources/users/service";

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    // 1. Create user in Auth0
    await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        email,
        password,
        connection: "Username-Password-Authentication",
      }
    );

    // 2. Immediately log the user in to get a token
    const { data: tokenData } = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "password",
        username: email,
        password,
        audience: process.env.AUTH0_AUDIENCE,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        scope: "openid profile email",
      }
    );

    // 3. Fetch user info from Auth0
    const { data: userInfo } = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    );

    // 4. Store user in your DB (with Auth0 user_id)
    console.log({ userInfo })
    const [user] = await userService.create({
      auth0Id: userInfo.sub,
      email,
    });

    res.status(201).json({ user: sanitize(user), token: tokenData.access_token });
  } catch (err: any) {
    res.status(400).json({ error: err.response?.data || err.message });
  }
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    // 1. Authenticate user with Auth0
    const { data: tokenData } = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "password",
        username: email,
        password,
        audience: process.env.AUTH0_AUDIENCE,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        scope: "openid profile email",
      }
    );

    // 2. Optionally, fetch user info from your DB
    const user = await userService.findByEmail(email);

    res.status(200).json({ user: user ? sanitize(user) : null, token: tokenData.access_token });
  } catch (err: any) {
    res.status(401).json({ error: err.response?.data || err.message });
  }
}