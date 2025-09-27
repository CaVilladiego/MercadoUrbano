import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'cliente@demo.com', description: 'Correo de destino' })
  @IsEmail()
  to: string;

  @ApiProperty({ example: 'Bienvenido', description: 'Asunto del correo' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Gracias por registrarte...', description: 'Contenido del correo' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
