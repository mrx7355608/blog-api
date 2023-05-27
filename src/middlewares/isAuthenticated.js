export default function isAuthenticated(req, res, next) {
  if (req.user) return next()
  return res.status(401).json({ error: 'You must login first' })
}
