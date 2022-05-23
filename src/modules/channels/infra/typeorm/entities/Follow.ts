import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Channel from './Channel';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('follows')
class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.follow)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Channel, channel => channel.categoriesChannels)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @Column()
  userId: string;

  @Column()
  channelId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Follow;
