import { Router } from 'express';
import { Request, Response } from 'express';
import { Theme } from '../models/theme';
import { UserTheme } from '../models/user_theme';
import { isAuth } from '../middlewares/is_auth';

const theme = Router();

// Get themes array
theme.get('/', isAuth, async (request: Request, response: Response) => {
  try {
    const themes = await Theme.findAll();
    response.json(themes);
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

// Get or create user theme
theme.get('/user', async (request: Request, response: Response) => {
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

      response.json(savedUserTheme);
    } else {
      const defaultTheme = await Theme.findOne();

      if (defaultTheme) {
        await UserTheme.create({ userId: user.id, themeId: defaultTheme.id } as UserTheme);

        response.json(defaultTheme);
      }
    }
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

// change user theme
theme.put('/user', isAuth, async (request: Request, response: Response) => {
  const { user } = response.locals;
  const { themeId } = request.body;

  try {
    let userTheme = await UserTheme.findOne({
      where: {
        userId: user.id
      }
    });

    if (!userTheme) {
      userTheme = new UserTheme();
      userTheme.userId = user.id;
    }

    userTheme.themeId = themeId;
    await userTheme.save();

    const theme = await Theme.findOne({ where: { id: themeId } });

    response.json(theme);
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

export default theme;
