import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
