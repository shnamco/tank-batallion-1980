import { BaseRESTService } from '../utils/base_rest_controller';
import { SiteTheme } from '../models/site_theme';

interface FindRequest {
  id?: number;
  title?: string;
}

interface CreateRequest {
  theme: string;
  description: string;
}

export class ThemeService implements BaseRESTService {
  public find = ({ id, title }: FindRequest): Promise<SiteTheme | null> => {
    if (id) {
      return SiteTheme.findByPk(id);
    }

    return SiteTheme.findOne({
      where: {
        theme: `%${title}%`
      }
    });
  };

  public create = (data: CreateRequest): Promise<SiteTheme> => {
    return SiteTheme.create(data as SiteTheme);
  };
}
