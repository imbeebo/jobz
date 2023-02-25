import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from '../model/video.schema';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';
import { User } from 'src/model/user.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) { }

  async createVideo(video: Object): Promise<Video> {
    const newVideo = new this.videoModel(video);
    return newVideo.save();
  }

  async readVideo(id): Promise<any> {
    if (id.id) {
      return this.videoModel
        .findOne({ _id: id.id })
        .populate('createdBy')
        .exec();
    }
    return this.videoModel.find().populate('createdBy').exec();
  }

  async streamVideo(id: string, response: Response, request: Request) {
    try {
      const data2 = await this.videoModel.findById(id);
      const data = await this.videoModel.findOne({ _id: id });
      if (!data) {
        throw new NotFoundException(null, 'VideoNotFound');
      }
      const { range } = request.headers;
      if (range) {
        const { video } = data;
        // TODO don't store public as part of path
        const videoPath = statSync(join(process.cwd(), `./${video}`));
        const CHUNK_SIZE = 1 * 1e6;
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE, videoPath.size - 1);
        const videoLength = end - start + 1;
        response.status(206);
        response.header({
          'Content-Range': `bytes ${start}-${end}/${videoPath.size}`,
          'Accept-Ranges': 'bytes',
          'Content-length': videoLength,
          'Content-Type': 'video/mp4',
        });
        const vidoeStream = createReadStream(
          join(process.cwd(), `./${video}`),
          { start, end },
        );
        vidoeStream.pipe(response);
      } else {
        throw new NotFoundException(null, 'range not found');
      }
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException();
    }
  }

  async update(id, video: Video): Promise<any> {
    return this.videoModel.findByIdAndUpdate(id, video, { new: true });
  }

  async delete(id): Promise<any> {
    return this.videoModel.findByIdAndRemove(id);
  }

  async getVideos(createdBy: User): Promise<Array<Video>> {
    return await this.videoModel.find({ createdBy });
  }

  // TODO only return if they own?
  async getVideoById(id: string): Promise<Video> {
    return await this.videoModel.findById(id);
  }
}
