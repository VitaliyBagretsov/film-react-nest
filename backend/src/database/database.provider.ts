import * as mongoose from 'mongoose';

// const url = process.env.DATABASE_URL;
// const driver = process.env.DATABASE_DRIVER;

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (config): Promise<typeof mongoose> => {
      return mongoose.connect(config.DATABASE_URL);
    },
    inject: ['CONFIG'],
  },
];