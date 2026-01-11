import User from "../models/UserModel.js";

export const protect = async (req, res, next) => {
    const { userId } = req.auth();
    if(!userId) {
        res.json({ success: false, message: "not authenticated" });
    }
    else{
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
    }
}