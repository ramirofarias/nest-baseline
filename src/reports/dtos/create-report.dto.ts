import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
  @IsLongitude()
  @IsOptional()
  lng: number;
  @IsLatitude()
  @IsOptional()
  lat: number;
}
