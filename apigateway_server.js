  const express = require("express");
  const cors = require("cors");
  const { createProxyMiddleware } = require("http-proxy-middleware");

  const app = express();

  app.use(cors());

  /* EXISTING ANXIETY SERVICE */
  app.use(
    "/anxiety",
    createProxyMiddleware({
      target: "http://localhost:5003",
      changeOrigin: true,
      pathRewrite: {
        "^/anxiety": ""
      }
    })
  );

  /* EXISTING INTERVIEW SERVICE */
  app.use(
    "/interview",
    createProxyMiddleware({
      target: "http://localhost:5002",
      changeOrigin: true,
      pathRewrite: {
        "^/interview": ""
      }
    })
  );

  /* NEW RESUME SERVICE */
  app.use(
    "/resume",
    createProxyMiddleware({
      target: "http://localhost:5004",
      changeOrigin: true,
      pathRewrite: {
        "^/resume": ""
      }
    })
  );

  app.listen(5000, () => {
    console.log("API Gateway running on 5000");
  });
