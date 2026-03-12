import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'favorite_city' })
export class FavoriteCity {

  @PrimaryKey()
  id!: number;

  @Property()
  city!: string;

  @Property()
  country!: string;

  @Property()
  latitude!: number;

  @Property()
  longitude!: number;

  @Property({ nullable: true })
  temperature?: number;

  @Property({ nullable: true })
  description?: string;
}
