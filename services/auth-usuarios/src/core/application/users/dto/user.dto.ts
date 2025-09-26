export class UserDto {
  id!: string;
  email!: string;
  fullName!: string;
  role!: 'USER'|'ADMIN'|'VENDOR';
  createdAt!: Date;
  updatedAt!: Date;
}
