import { MulterConfigService } from './../config/custom.storage';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Video } from '../model/video.schema';
import { VideoService } from '../service/video.service';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { promises as fsPromises } from 'fs'

@Controller('/api/v1/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'video', maxCount: 1 },
  ]))
  async createBook(@Res() response,
    @Req() request,
    @Body() video: Video,
    @UploadedFiles() files: { video?: Express.Multer.File[] }) {
    console.log(files);
    const requestBody = {
      createdBy: request.user,
      title: video.title,
      qr: video.qr,
      video: files.video?.[0].filename,
    };
    const newVideo = await this.videoService.createVideo(requestBody);
    return response.status(HttpStatus.CREATED).json({
      newVideo,
    });
  }

  @Get()
  async read(@Query() id): Promise<Object> {
    return await this.videoService.readVideo(id);
  }

  @Get('/stream/:id')
  async stream(
    @Param('id') id,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.videoService.streamVideo(id, response, request);
  }

  @Put('/:id')
  async update(
    @Res() response: Response,
    @Param('id') id,
    @Body() video: Video,
  ) {
    const updatedVideo = await this.videoService.update(id, video);
    return response.status(HttpStatus.OK).json(updatedVideo);
  }

  @Delete('/:id')
  async delete(@Req() req, @Res() response: Response, @Param('id') id) {

    const video = await this.videoService.getVideoById(id);
    await this.videoService.delete(id);

    fsPromises.unlink(video.video);


    return response.status(HttpStatus.OK).json({
      user: null,
    });
  }

  @Get('/list')
  async getList(@Req() req): Promise<Array<any>> {
    const vids = await this.videoService.getVideos(req.user);
    return vids;
  }
}
