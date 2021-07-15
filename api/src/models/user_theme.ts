import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Theme } from './theme';

@Table({
  timestamps: false,
  tableName: 'user_theme'
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => Theme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId!: number;
}
