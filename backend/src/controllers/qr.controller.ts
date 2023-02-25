import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { QrcodeService } from 'src/service/qrcode.service';
import { UserQRCode } from 'src/model/qrcode.schema';

@Controller('/api/v1/qr')
export class QRController {
  private readonly logger = new Logger(QRController.name);

  constructor(
    private readonly qrService: QrcodeService
  ) { }

  @Post('/:name')
  async generate(@Res() response: Response, @Req() req, @Param('name') name: string, @Body() data: { data: string }) {
    await this.qrService.createQRCode(name, data.data, req.user);
    return response.status(HttpStatus.CREATED);
  }


  @Get()
  async getCode(@Req() req, @Query('name') name: string): Promise<UserQRCode> {
    return this.qrService.getQrCode(name, req.user);
  }

  @Get('/list')
  async getList(@Req() req): Promise<Array<any>> {
    return this.qrService.getQrCodes(req.user);
  }
}
