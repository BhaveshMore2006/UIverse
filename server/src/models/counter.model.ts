import mongoose, { Document, Schema } from 'mongoose';

export interface ICounter extends Document {
  key: string;
  value: number;
}

const counterSchema = new Schema<ICounter>({
  key: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
});

export const Counter = mongoose.model<ICounter>('Counter', counterSchema);
