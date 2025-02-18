import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connectionState: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
    try {
        if (connectionState.isConnected) {
            console.log("Database is already connected");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI!);

        connectionState.isConnected = 1;
        const dbConnection = mongoose.connection;
        dbConnection.on('connected', () => {
            console.log("MongoDB connected");
        });

        dbConnection.on('error', (err) => {
            console.error("MongoDB connection error: " + err);
            process.exit(1); 
        });

    } catch (error) {
        console.error('Something went wrong in connecting to the DB');
        console.error(error);
        process.exit(1); 
    }
}
