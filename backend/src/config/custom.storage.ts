import { UserQRCode } from 'src/model/qrcode.schema';
import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { spawn } from 'child_process';
import { promises as fsPromises } from 'fs'
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import QR from 'qrcode';


@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: new StorageEngine(),
        };
    }
}


export class StorageEngine {

    private getDestination(req: Request, file: Express.Multer.File, cb) {
        cb(null, '/dev/null')
    }

    public _handleFile(req: Request, file: Express.Multer.File, cb) {

        // do something with the file
        // ...

        // sanitize the file
        // ...

        // save the file to a destination
        const ext = file.mimetype.split('/')[1];
        const fileName = `${uuidv4()}-${Date.now()}.${ext}`;
        const qrData = req.body['qr'];

        const filePath = `./public/${fileName}`;
        if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
            fsPromises.writeFile(filePath, file.stream)
                .then(val => {
                    if (file.mimetype.startsWith('image')) {
                        this.processImage(filePath, qrData, cb);
                    }
                    if (file.mimetype.startsWith('video')) {
                        this.processVideo(filePath, qrData, cb);
                    }
                    // , (err) => {
                    //     if (err) {
                    //         cb(err, null);
                    //     }
                    //     cb(null, fileName);
                    // }
                });
        }
    }

    public _removeFile(req, file, cb) {
        fsPromises.unlink(file.path).then(() => cb())
    }

    private processImage(filePath: string, qrCodeData: string, cb) {

        sharp(filePath)
            // resize the image to a maximum width and height (to prevent exploit with large image)
            .resize({
                width: 1000,
                height: 1000,
                fit: "inside",
            })
            // write the sanitized image to a new file
            .toFile(filePath + '.new', (err, info) => {
                if (err) throw err;


                const qrFileName = `./public/${uuidv4()}-${Date.now()}.qr.png`;
                QR.toFile(qrFileName, qrCodeData)
                    .then(() => {
                        const ffmpeg = spawn('ffmpeg', [
                            '-i', filePath + '.new',
                            '-i', qrFileName,
                            '-filter_complex', 'scale=50:-1 overlay=main_w-overlay_w-10:main_h-overlay_h-10',
                            '-y', // overwrite the output file if it already exists
                            filePath,
                        ]);
                        ffmpeg.on('exit', (code) => {
                            if (code === 0) {
                                cb(null, filePath);

                                fsPromises.unlink(qrFileName);
                                fsPromises.unlink(filePath + '.new');
                            } else {
                                console.error('An error occurred while sanitizing the video');
                            }
                        });
                    });
            })
    }

    private processVideo(filename: string, qrCodeData: string, cb) {

        const qrFileName = `./public/${uuidv4()}-${Date.now()}.qr.png`;
        QR.toFile(qrFileName, qrCodeData)
            .then(() => {
                const ffmpeg = spawn('ffmpeg', [
                    '-i', filename,
                    '-i', qrFileName,
                    '-filter_complex', 'scale=50:-1 [0:v][1:v] overlay=x=W-w-10:y=H-h-10',
                    '-c:v', 'libx264',
                    '-crf', '23',
                    '-c:a', 'copy',
                    filename + '.processed.mp4',
                ]);
                ffmpeg.on('exit', (code) => {
                    if (code === 0) {
                        cb(null, { filename });
                        fsPromises.unlink(qrFileName);
                        fsPromises.rename(filename + '.processed.mp4', filename);
                    } else {
                        console.error('An error occurred while sanitizing the video');
                    }
                });

            });
    }
}
