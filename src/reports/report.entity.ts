import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column({ nullable: true })
  lng: number;
  @Column({ nullable: true })
  lat: number;
  @Column()
  mileage: number;
}
