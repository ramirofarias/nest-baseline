import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export interface UserInterface {
  id: number;
  email: string;
}

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;
  @Transform(({ obj }) => obj.user)
  @Expose()
  user: User;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;
}
