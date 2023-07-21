import mongoose, { connection } from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection. on('connected', () => {
            console.log('MongoDB connected sucessfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error.Please make sure mongodb is running.' + err);
            process.exit();
        })

    } catch(error){
         console.log('Something goes wrong');
         console.log(error);
         process.exit();
    }
}