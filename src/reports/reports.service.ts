import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { createQueryBuilder, Repository } from "typeorm";
import { CreateReportDto } from "./dtos/create-report.dto";
import { PaginatedReportsDto } from "./dtos/paginated-reports.dto";
import { Report } from "./report.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  public relations = ["user"];

  public index() {
    return this.repo.find({
      relations: this.relations,
    });
  }

  public async paginated(query: PaginatedReportsDto) {
    const reports = await this.repo.createQueryBuilder("report");
    const pageSize = query.pageSize || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * pageSize;

    if (query.searchQuery) {
      reports.where("report.make like :make", {
        make: `%${query.searchQuery}%`,
      });
    }

    if (query.before) {
      reports.andWhere("report.year < :year", {
        year: query.before,
      });
    }

    if (query.after) {
      reports.andWhere("report.year > :year", {
        year: query.after,
      });
    }
    if (query.orderBy) {
      reports.orderBy(query.orderBy, query.orderType, "NULLS LAST");
    }

    const [data, total] = await reports
      .skip(skip)
      .take(pageSize)
      .leftJoinAndSelect("report.user", "user")
      .getManyAndCount();
    return {
      data: data,
      total: total,
      page: page,
      last_page: Math.ceil(total / pageSize),
    };
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }
}

// const [results, total] = await this.repo.findAndCount({
//   take: pageSize,
//   skip: skip,
// });

// return {
//   data: results,
//   total: total,
//   page: page,
//   last_page: Math.ceil(total / pageSize),
// };
