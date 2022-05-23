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
import Category from '@modules/categories/infra/typeorm/entities/Category';

@Entity('categoriesChannels')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, category => category.categoriesChannels)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Channel, channel => channel.categoriesChannels)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @Column()
  categoryId: string;

  @Column()
  channelId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default OrdersProducts;
