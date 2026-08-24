import { Counter } from '../models/counter.model';

export const seedCounters = async () => {
  const defaults = [
    { key: 'section', startValue: 1000000000 },
    { key: 'element', startValue: 2000000000 },
    { key: 'nestedCard', startValue: 3000000000 },
  ];

  for (const def of defaults) {
    const existing = await Counter.findOne({ key: def.key });
    if (!existing) {
      await Counter.create({ key: def.key, value: def.startValue });
      console.log(`Seeded counter ${def.key} with ${def.startValue}`);
    }
  }
};
