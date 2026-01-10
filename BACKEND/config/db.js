import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
        console.log("Database connected");
    } catch (error) {
        console.log("error connect to database", error);
    }
}

export default connectToDB;