import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

// create main function for conneting to mongoose database  
async function main() {
  try {
    //connect with mongoose
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Assignment two listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

// call main function
main();
