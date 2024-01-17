import config from "./config.service.js";

export function auth(req, res, next) {
  switch (config.authorization) {
    case null:
    case req.headers.authorization:
      next();
      break;

    default:
      return res.status(403).json({ error: "403" });
  }
}
