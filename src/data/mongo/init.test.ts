import { MongoDatabase } from './init';
import moongose from 'mongoose';

describe('init MongoDB', () => {
  afterAll(() => {
    moongose.connection.close();
  });
  test('should connect to MongoDB', async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_NAME!,
    });

    expect(connected).toBe(true);
  });

  test('should throw an error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        mongoUrl: 'mongodb://alex:123456789@non-valid-host:27017',
        dbName: process.env.MONGO_NAME!,
      });
      expect(true).toBe(false);
    } catch (error) {}
  });
});
