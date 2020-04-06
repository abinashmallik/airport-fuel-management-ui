let apiBaseUrl;

if (process.env.NODE_ENV !== "production") {
  apiBaseUrl = "http://localhost:9596";
} else {
  apiBaseUrl = "http://localhost:9596";
}

export default {
  apiBaseUrl
};
