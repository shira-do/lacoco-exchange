import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Price {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public pair: string;

  @Column({ type: 'float' })
  public price: number;
}

export default Price;
