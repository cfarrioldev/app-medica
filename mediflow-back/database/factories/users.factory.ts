import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { User } from '@/users/user.entity';


export default setSeederFactory(User, () => {
  const u = new User();
  u.email = faker.internet.email().toLowerCase();
  u.passwordHash = 'demo-hash';
  u.role = 'PATIENT';
  return u;
});
