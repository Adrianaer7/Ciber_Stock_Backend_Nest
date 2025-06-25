// cors.config.ts
export const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];

export const corsOptions = {
  origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};


export const corsOptionsSocket = {
  cors: {
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }
};