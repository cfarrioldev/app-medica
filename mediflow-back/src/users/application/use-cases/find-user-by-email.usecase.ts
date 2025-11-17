import { UserRepositoryPort } from "@/users/ports/user.repository.port";

export class FindUserByEmailUseCase {
  constructor(private readonly users: UserRepositoryPort) {}

  async execute(email: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new Error('User not found');
    return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt };
  }
}
