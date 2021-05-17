import { ThemeService } from '../services/theme.service';
import { Request } from 'express';

const themeService = new ThemeService();

export class ThemeAPI {
  public static create = async (request: Request): Promise<void> => {
    const { body } = request;

    await themeService.create(body);
  };

  public static find = async (request: Request): Promise<void> => {
    const { body } = request;

    await themeService.find(body);
  };
}
