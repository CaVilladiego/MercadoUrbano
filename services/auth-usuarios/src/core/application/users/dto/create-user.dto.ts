import { IsEmail, IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail() email!: string;
  @IsString() @IsNotEmpty() password!: string;
  @IsString() @IsNotEmpty() fullName!: string;
  @IsOptional() @IsIn(['USER','ADMIN','VENDOR']) role?: 'USER'|'ADMIN'|'VENDOR';
}
