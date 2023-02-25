import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path/posix';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { User, UserSchema } from './model/user.schema';
import { Video, VideoSchema } from './model/video.schema';
import { VideoController } from './controllers/video.controller';
import { VideoService } from './service/video.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { UserController } from './controllers/user.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './passportStrategies/local.strategy';
import { JwtStrategy } from './passportStrategies/jwt.strategy';
import { isAuthenticated } from './app.middleware';
import { UserService } from './service/user.service';
import { UserQRCode, QRCodeSchema } from './model/qrcode.schema';
import { QRController } from './controllers/qr.controller';
import { QrcodeService } from './service/qrcode.service';
import { AuthController } from './controllers/auth.controller';
import { MulterConfigService } from './config/custom.storage';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MongooseModule.forFeature([{ name: UserQRCode.name, schema: QRCodeSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: 86400 },
    }),
  ],
  controllers: [VideoController, UserController, QRController, AuthController],
  providers: [
    VideoService,
    AuthService,
    UserService,
    QrcodeService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: 'api/v1/video/stream/:id', method: RequestMethod.GET })
      .forRoutes(UserController, VideoController, QRController);
  }
}
