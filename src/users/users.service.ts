import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  public create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  public findAll() {
    return this.repo.find();
  }

  public getUserById(id: number) {
    if (!id) {
      throw new BadRequestException(
        "Debe estar autenticado para ver esta página"
      );
    }
    const user = this.repo.findOne(id);
    return user;
  }

  public find(email: string) {
    const user = this.repo.find({ email: email });

    return user;
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  public async remove(id: number) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error("user not found");
    }

    return this.repo.remove(user);
  }
}
