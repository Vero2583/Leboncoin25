import jwt from 'jsonwebtoken'


export const authMiddleware = async (req, res, next) => {
    try {
       
       const header = req.headers.authorization;
       if(!header) {
        return res.status(401).json({ message: "Token manquant"})
       } 

       const token = header.split(' ')[1]
       if(!token) {
        return res.status(401).json({ message: "Token invalide"})
       } 

       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       req.user = decoded

       console.log(decoded, "middleware")

       next()

    } catch (error) {
        console.error('Error authMiddleware:', error.message)
        return res.status(401).json({ message: "Token invalide"})
    }
}

