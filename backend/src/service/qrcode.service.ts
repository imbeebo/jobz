import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserQRCode, QRCodeDocument } from '../model/qrcode.schema';
import { User } from '../model/user.schema'
import QRCode from 'qrcode';

@Injectable()
export class QrcodeService {
  constructor(
    @InjectModel(UserQRCode.name) private qrCodeModel: Model<QRCodeDocument>,
  ) { }

  async createQRCode(name: string, data: string, createdBy: User): Promise<UserQRCode> {

    const reqBody = {
      name,
      data,
      createdBy,
    };


    return new this.qrCodeModel(reqBody).save();
  }

  async getQrCode(name: string, createdBy: User): Promise<UserQRCode> {
    return this.qrCodeModel.findOne({ name, createdBy });
  }

  async getQrCodes(createdBy: User): Promise<Array<UserQRCode>> {
    return await this.qrCodeModel.find({ createdBy });
  }
}
