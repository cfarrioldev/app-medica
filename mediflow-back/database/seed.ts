import 'dotenv/config';
import { AppDataSource } from '../data-source';
import { runSeeders } from 'typeorm-extension';
import { seeders } from './seeds';

(async () => {
  const ds = await AppDataSource.initialize();
  await runSeeders(ds, { seeds: seeders });
  await ds.destroy();
  console.log('✅ Seeds ejecutados');
})();
