import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import AppError from '@shared/errors/AppError';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;
  uploadsFolder: string;

  multerImage: {
    storage: StorageEngine;
  };

  multerPlayer: {
    storage: StorageEngine;
  };

  config: {
    // disk: {};
    s3: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multerImage: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    fileFilter: (
      request: Request,
      file: Express.Multer.File,
      callback: (error: AppError | null, next: boolean) => void,
    ): void => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        return callback(null, true);
      }
      return callback(
        new AppError('Only .png, .jpg and .jpeg format allowed!'),
        false,
      );
    },
  },

  multerPlayer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    fileFilter: (
      request: Request,
      file: Express.Multer.File,
      callback: (error: AppError | null, next: boolean) => void,
    ): void => {
      if (file.mimetype === 'audio/mpeg') {
        return callback(null, true);
      }
      return callback(new AppError('Only .mp3 format allowed!'), false);
    },
  },

  config: {
    // disk: {},
    s3: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;
