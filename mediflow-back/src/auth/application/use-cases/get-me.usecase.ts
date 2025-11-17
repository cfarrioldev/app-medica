import { UserRepositoryPort } from "@/users/ports/user.repository.port";

export class GetMeUseCase {
  constructor(private readonly users: UserRepositoryPort) {}
  async execute(userId: number) {
    const user = await this.users.findById(userId);
    if (!user) throw new Error('User not found');
    return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt };
  }
}
