import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

import Channel from '@modules/channels/infra/typeorm/entities/Channel';

@Entity('podcasts')
class Podcast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Channel)
  @JoinColumn({ name: 'channelId' })
  @Exclude()
  channel: Channel;

  @Column()
  @Exclude()
  channelId: string;

  @Column()
  @Exclude()
  file: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Expose({ name: 'fileUrl' })
  getAvatarUrl(): string | null {
    if (!this.file) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.file}`;
      case 's3':
        return `https://${uploadConfig.config.s3.bucket}.s3.amazonaws.com/${this.file}`;
      default:
        return null;
    }
  }
}

export default Podcast;
