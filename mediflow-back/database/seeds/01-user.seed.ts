
import { hash } from 'bcrypt';
import { User } from '@/users/domain/entities/user.domain';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';


export default class UserSeeder implements Seeder {
  public async run(ds: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repo = ds.getRepository(User);

    // Admin
    const adminEmail = 'admin@demo.com';
    const exists = await repo.findOne({ where: { email: adminEmail } });
    if (!exists) {
      await repo.save(repo.create({
        email: adminEmail,
        passwordHash: await hash('admin', 10),
        role: 'ADMIN',
      }));
    }
    const count = await repo.count();
    if (count < 15) {
      const userFactory = factoryManager.get(User);
      await userFactory.saveMany(10);
    }
  }
}
