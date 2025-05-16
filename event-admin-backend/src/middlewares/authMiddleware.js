const jwt = require("jsonwebtoken");
module.exports =
  (roles = []) =>
  (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "Yetkisiz" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role))
        return res.status(403).json({ msg: "Erişim yok" });
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ msg: "Token geçersiz" });
    }
  };
