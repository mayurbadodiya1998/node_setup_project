import mongoose from 'mongoose';

export async function connectToCluster(uri){

    return mongoose.connect(uri)
      .then(() => {
        console.log('Successfully connected to MongoDB');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
}