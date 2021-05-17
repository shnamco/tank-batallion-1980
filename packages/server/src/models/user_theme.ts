import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { SiteTheme } from './site_theme';

@Table({
  timestamps: false,
  tableName: 'user_theme'
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId!: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id'
  })
  ownerId!: string;
}
