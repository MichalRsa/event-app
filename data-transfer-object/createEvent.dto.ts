import { IsDate, IsDateString, IsEmail, IsString } from 'class-validator';

class CreateEventDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsDateString()
  public date: string;
}

export default CreateEventDto;
