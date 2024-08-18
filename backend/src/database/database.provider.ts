import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (config): Promise<typeof mongoose> => {
      return mongoose.connect(config.DATABASE_URL);
    },
    inject: ['CONFIG'],
  },
];