import moongose from 'mongoose';

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await moongose.connect(mongoUrl, {
        dbName,
      });

      // console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      throw error;
    }
  }
}
