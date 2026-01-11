import User from "../models/UserModel.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        console.log("Webhook received, type:", req.body.type);
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        await whook.verify(JSON.stringify(req.body), headers)
        console.log("Webhook verified");

        const { data, type } = req.body;

        switch (type) {
            case "user.created":{
                console.log("Creating user:", data.id);
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                const newUser = await User.create(userData);
                console.log("User created:", newUser);
                break;
            }

            case "user.updated":{
                console.log("Updating user:", data.id);
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                const updatedUser = await User.findByIdAndUpdate(data.id, userData);
                console.log("User updated:", updatedUser);
                break;
            }

            case "user.deleted":{
                console.log("Deleting user:", data.id);
                const deletedUser = await User.findByIdAndDelete(data.id);
                console.log("User deleted:", deletedUser);
                break;
            }

            default:
                break;
        }

        res.json({ success: true, message: "Webhook Received" });
        
    } catch (error) {
        console.error("Webhook error:", error);
        res.json({ success: false, message: error.message });
    }
}

export default clerkWebhooks;