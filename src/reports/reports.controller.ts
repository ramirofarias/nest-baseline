import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { query } from "express";
import { AuthGuard } from "src/guards/auth.guard";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/user.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportDto } from "./dtos/report.dto";
import { ReportsService } from "./reports.service";

@Controller("reports")
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  public index() {
    return this.reportsService.index();
  }

  @Get("/paginated/index")
  public paginated(@Query() query: any) {
    console.log(query);
    return this.reportsService.paginated(query);
  }

  @Post()
  @Serialize(ReportDto)
  public createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User
  ) {
    return this.reportsService.create(body, user);
  }
}
