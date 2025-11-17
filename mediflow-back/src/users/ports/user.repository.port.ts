import { User } from "../domain/entities/user.domain";


export abstract class UserRepositoryPort {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract existsByEmail(email: string): Promise<boolean>;
  abstract save(user: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
}