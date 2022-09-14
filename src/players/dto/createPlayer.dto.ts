import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createPlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
