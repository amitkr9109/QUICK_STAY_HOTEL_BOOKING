import express from "express";
import { checkAvailability, createBooking, getHotelBookings, getUserBookings, stripePayment } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailability);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);
bookingRouter.post("/stripe-payment", protect, stripePayment);

export default bookingRouter;