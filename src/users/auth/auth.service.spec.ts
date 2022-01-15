import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../user.entity";
import { UsersService } from "../users.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it("creates an AuthService", async () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with salted and hashed password", async () => {
    const user = await service.signup("asdasd@asdasd.com", "1234");

    expect(user.password).not.toEqual("1234");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user already exists on signup", async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: "mike@aol.com", password: "302kkedww" } as User,
      ]);
    expect(
      await service.signup("mike@aol.com", "302kkedww")
    ).rejects.toThrowError();
  });
});
