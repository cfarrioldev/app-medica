export class User {
  constructor(
    public readonly id: number | null,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly role: 'PATIENT' | 'DOCTOR' | 'ADMIN' = 'PATIENT',
    public readonly createdAt: Date = new Date(),
  ) {}
}