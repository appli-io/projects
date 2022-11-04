import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsDate()
  @IsNotEmpty()
  dateStart: Date;

  @IsDate()
  @IsNotEmpty()
  dateEnd: Date;
}
