import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

const generateToken = async () => {
  const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY as string;
  const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET as string;

  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error("Missing MPESA credentials");
  }

  const URL =
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};

app.get("/generate-token", async (_req, res) => {
  try {
    const token = await generateToken();
    res.json({ access_token: token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
