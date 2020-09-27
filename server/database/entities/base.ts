import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  public id!: number;

  /**
   * Date of creation
   */
  @Column("timestamp")
  public dateCreated!: Date;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public dateUpdated!: Date;
}
