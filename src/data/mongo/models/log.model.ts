import moongose from 'mongoose';

const logSchema = new moongose.Schema({
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = moongose.model('Log', logSchema);
