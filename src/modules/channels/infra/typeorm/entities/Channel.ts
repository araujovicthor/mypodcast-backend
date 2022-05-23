import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import uploadConfig from '@config/upload';

import User from '@modules/users/infra/typeorm/entities/User';
import CategoriesChannels from './CategoriesChannels';
import Follow from './Follow';

@Entity('channels')
class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  @Exclude()
  owner: User;

  @Column()
  @Exclude()
  ownerId: string;

  @OneToMany(
    () => CategoriesChannels,
    categoriesChannels => categoriesChannels.channel,
    {
      cascade: true,
    },
  )
  categoriesChannels: CategoriesChannels[];

  @OneToMany(() => Follow, follow => follow.channel, {
    cascade: true,
  })
  follow: Follow[];

  @Column()
  @Exclude()
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  userFollow?: boolean;

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.s3.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default Channel;
