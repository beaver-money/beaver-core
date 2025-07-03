import axios from "axios";
import _ from "lodash";

export async function getManagementToken() {
  const { data } = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    client_id: process.env.AUTH0_M2M_CLIENT_ID,
    client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    grant_type: "client_credentials",
  });
  return data.access_token;
}

export async function updateAuth0User(auth0Id: string, updates: { email?: string; name?: string }) {
  if (_.isEmpty(updates)) {
    throw new Error("No updates provided");
  }
  const token = await getManagementToken();
  await axios.patch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`,
    updates,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function deleteAuth0User(auth0Id: string) {
  const token = await getManagementToken();
  await axios.delete(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
