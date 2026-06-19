import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("root")
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: "API root" })
  getRoot() {
    return {
      name: "HexaStudio API",
      version: "0.1.0",
      docs: "/api/docs",
    };
  }
}
