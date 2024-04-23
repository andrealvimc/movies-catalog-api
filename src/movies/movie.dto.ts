import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createMovieDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly year: string;


  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly imageURL: string;
} 


export class MovieDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageURL: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

}

// id        String   @id @default(cuid())
//   title     String
//   year      Int
//   description String
//   imageURL  String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt