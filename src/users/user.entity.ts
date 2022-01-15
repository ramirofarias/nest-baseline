import { Report } from "src/reports/report.entity";
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  @AfterInsert()
  logInsert() {
    console.log("Creado ID", this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log("Removido ID", this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log("Actualizado ID", this.id);
  }
}
