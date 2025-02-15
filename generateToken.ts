import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const generateToken = async () => {
  const CONSUMER_KEY = 'iLlFa1IG8pZlGyGi2IO7V9fobPT1XQfkKqxqGfpC5Zmj57Sm';
  const CONSUMER_SECRET = 'sfGiLwedlRM4YOtQFgwMHwWeIOWbQEk3yjbCJvGhvBHkGSTYJk6dEDGKYMjFpnTr';

  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    return "Missing MPESA credentials";
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
    return error.response?.data || error.message;
  }
};

generateToken().then(token => console.log("Access Token:", token)).catch(error => console.error("Error:", error));
