import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  ValidateIf,
} from "class-validator";

export class PaginatedReportsDto {
  @IsOptional()
  @IsNumber()
  pageSize: number;
  @IsOptional()
  @IsNumber()
  page: number;
  @IsOptional()
  orderBy: string;
  @ValidateIf((o) => o.orderBy in o)
  @IsString()
  orderType: "ASC" | "DESC";
  @IsOptional()
  @Max(2030)
  before: number;
  @IsOptional()
  @Max(2030)
  after: number;
  @IsOptional()
  searchQuery: string | number;
}
