import { Router } from 'express';
import { Request, Response } from 'express';
import { Theme } from '../models/theme';
import { UserTheme } from '../models/user_theme';

const theme = Router();

// Get user theme
theme.get('/', async (request: Request, response: Response) => {
  const { user } = response.locals;

  if (!user) {
    const defaultTheme = await Theme.findOne();
    response.json(defaultTheme);
    return;
  }

  try {
    const userTheme = await UserTheme.findByPk(user.id);

    if (userTheme) {
      const savedUserTheme = await Theme.findOne({
        where: {
          id: userTheme.themeId
        }
      });

      response.json(savedUserTheme?.name);
    } else {
      const defaultTheme = await Theme.findOne();

      if (defaultTheme) {
        const userTheme = new UserTheme();
        userTheme.userId = user.id;
        userTheme.themeId = defaultTheme.id;

        await UserTheme.create(userTheme as UserTheme);

        response.json(defaultTheme);
      }
    }
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

export default theme;
