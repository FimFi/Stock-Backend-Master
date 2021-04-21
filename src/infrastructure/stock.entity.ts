import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Stock{
  @PrimaryColumn({unique: true})
  public id: string;

  @Column ({unique: true})
  public stockName: string;

  @Column ({unique: false})
  public initValue: number;

  @Column ({unique: false})
  public currValue: number;

  @Column ({unique: false})
  public description: string;
}
