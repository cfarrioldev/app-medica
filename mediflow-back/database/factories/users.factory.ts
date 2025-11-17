import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { UserOrmEntity } from '@/users/infrastructure/persistence/user.typeorm.entity';

export default setSeederFactory(UserOrmEntity, () => {
  const u = new UserOrmEntity();
  u.email = faker.internet.email().toLowerCase();
  u.passwordHash = 'demo-hash';
  u.role = 'PATIENT';
  return u;
});