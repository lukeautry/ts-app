import { Column, PrimaryGeneratedColumn } from "typeorm";

export interface IBaseEntity {
  /**
   * @isInt
   */
  id: number;
  date_created: Date;
  date_updated: Date;
}

export class BaseEntity implements IBaseEntity {
  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  public id!: number;

  /**
   * Date of creation
   */
  @Column("timestamp")
  public date_created!: Date;

  /**
   * Date of update
   */
  @Column("timestamp")
  public date_updated!: Date;
}
