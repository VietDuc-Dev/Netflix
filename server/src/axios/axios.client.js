import axios from "axios";

const db_token = process.env.DB_TOKEN;

const apiClient = axios.create({
  headers: {
    Accept: "application/json",
    Authorization: `bearer ${db_token}`,
  },
});

const get = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export default { get };
