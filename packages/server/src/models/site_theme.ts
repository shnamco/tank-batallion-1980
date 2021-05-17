import { AutoIncrement, Column, PrimaryKey, Table, Model, DataType, AllowNull, Unique, Index } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'site_theme'
})
export class SiteTheme extends Model<SiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}
