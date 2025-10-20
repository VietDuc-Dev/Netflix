const baseUrl = process.env.DB_BASE_URL;
const key = process.env.DB_KEY;

const getUrl = (endpoint, params = {}) => {
  const defaultParams = { language: "en-us" };
  const qs = new URLSearchParams({ ...defaultParams, ...params });

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
