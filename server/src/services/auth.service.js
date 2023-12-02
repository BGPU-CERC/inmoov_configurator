export function auth(req, res, next) {
  if (req.headers.authorization !== "trustmebro") {
    return res.status(403).json({ error: "403" });
  }
  next();
}
