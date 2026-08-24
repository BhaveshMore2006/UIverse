import { Counter } from '../models/counter.model';

export const getNextId = async (key: string, startValue: number): Promise<string> => {
  const result = await Counter.findOneAndUpdate(
    { key },
    { $inc: { value: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  
  // If this was newly created (value is 1 or starting value is not respected),
  // we might need to handle the initial seed.
  // A cleaner approach: initialize the counters on startup if they don't exist.
  // Assuming the DB is seeded, we can just pad or ensure it's a 10-digit number.
  
  const idValue = Math.max(result.value, startValue);
  
  if (result.value < startValue) {
      await Counter.updateOne({ key }, { $set: { value: startValue } });
      return startValue.toString().padStart(10, '0');
  }

  return result.value.toString().padStart(10, '0');
};
