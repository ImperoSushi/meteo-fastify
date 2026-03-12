import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'favorite_city' })
export class FavoriteCity {

  @PrimaryKey()
  id;

  @Property()
  city;

  @Property()
  country;

  @Property()
  latitude;

  @Property()
  longitude;

  @Property({ nullable: true })
  temperature;

  @Property({ nullable: true })
  description;

}
