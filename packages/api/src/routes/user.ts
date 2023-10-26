import { Unauthorized } from '../middlewares/error/error';
import * as auth from '../middlewares/authorization/authorization';
// import send from '../services/email';
import * as crypt from '../utils/crypt';
import { NextFunction, Request, Response } from 'express';
import { prisma, users } from '@briefly/prisma';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    return await users.createSchema
      .transform(async (user) => {
        user.password = await crypt.create(user.password);
        return user;
      })
      .parseAsync(req.body)
      .then((data) => prisma.user.create({ data, select: { name: true, email: true } }))
      .then((obj) => res.status(201).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { password, email } = users.loginSchema
      .pick({
        email: true,
        password: true,
      })
      .strict()
      .parse(req.body);
    const realPassword = (
      await prisma.user.findUniqueOrThrow({
        select: { password: true },
        where: { email },
      })
    ).password;
    if (await crypt.compare(password, realPassword)) {
      return res.status(200).json({
        token: auth.create(email, 'login'),
      });
    }
    throw new Unauthorized('Invalid credentials');
  } catch (error: unknown) {
    next(error);
  }
}

async function passRecovery(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const email = req.body.email;
  const db = req.app.get('userDbStore');
  const user = await db.findByEmail(email);
  const token = user ? auth.create(email, 'pass-recovery') : auth.create('inexistentAccount', 'inexistentAccount', 0);
  const url = process.env.URL;
  const newUrl = `${url}/confirm_reset?token=${token}`;

  const modelEmail = `<html>
      <body
          style='display: flex; justify-content: center; font-family: opensans-regular, arial;'    
      >
          <div style='width: 70%; border: #b0aeae solid 1px;'>
              <header style='background-color: #1f1f1f; display: flex; justify-content: center; padding: 20px 0;'>
                  <img style='width: 115px;' src='https://raw.githubusercontent.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/main/packages/front/src/assets/images/brand-icon-rectangle.png'></img>
              </header>
              <main style='display: flex; justify-content: center; padding: 10px 0;'>
                  <div style='text-align: center;'>
                      <p style='font-weight: bold; font-size: 20px; line-height: 2;'>
                          HEY, @user!
                      </p>
                      <p style='font-size: 15px; line-height: 2; color: #232222;'>
                          Did you ask for a password recovery?
                      </p>
                      <a 
                        href=${newUrl}
                        style='color: white; background-color: #191919; border-radius: 3px; font-size: 12px; padding: 8px 10px; 
                        text-decoration: none; font-weight: bold; font-family: helvetica,arial,sans-serif; border: none;'
                      >
                          PASSWORD RECOVERY
                      </a>
                      <p style='font-size: 15px; line-height: 2; color: #666666;'>
                          Or click on the link: <a style='text-decoration: none;' href=${newUrl}>${newUrl}</a>
                      </p>
                  </div>
              </main>
              <footer style="display: flex; justify-content: center;">
                  <div style='border-top: #b0aeae solid 1px; width: 90%; padding: 5px 0; display: flex; justify-content: center;'>
                      <img style='width: 40px;' src='https://raw.githubusercontent.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/main/packages/front/src/assets/images/brand-icon-circle.png'></img>
                  </div>
              </footer>
          </div>  
        </body>
    </html>`

  await send({ 
      to: email, 
      subject: 'BRIEFLY - Password Recovery', 
      message: modelEmail
      //message: `Hey, did you ask for a password recovery?\n\nThis is your link ${newUrl}` 
    }) 
    .then(() => {
      console.log("email enviado com sucesso!");
      return res.status(200).json({});
    })
    .catch((error: any) => {
      console.log("erro linha 71: ", error);
      return next(error);
    });
}

async function passUpdate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const password = await crypt.create(req.body.password);
  const token = req.body.token;
  const db = req.app.get('userDbStore');
  const verify = auth.verify(token.replace('Bearer', '').trim());

  try {
    if (verify?.role === 'pass-recovery') {
      await db.updatePassByEmail(verify.user, { password: password, updatedAt: new Date() });
      return res.sendStatus(200);
    } else {
      throw new Unauthorized('your link is invalid or has expired');
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const email: string = req.query.user as string;
    return await prisma.user
      .delete({
        where: { email },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { data, extraArgs } = users.updateSchema.parse(req.body);
    const oldEmail = req.query.user as string;

    if (data.password) {
      if (!extraArgs.oldPassword) {
        throw new Unauthorized('Must supply current password');
      }
      const { password } = await prisma.user.findUniqueOrThrow({
        select: { password: true },
        where: { email: oldEmail },
      });

      if (await crypt.compare(extraArgs.oldPassword, password)) {
        data.password = await crypt.create(data.password as string);
      } else {
        throw new Unauthorized('Wrong password');
      }
    }

    return prisma.user
      .update({
        data,
        where: { email: oldEmail },
        select: {
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .then((user) => res.status(200).json(user))
      .catch((e: unknown) => {
        throw e;
      });
  } catch (error: unknown) {
    next(error);
  }
}

export { create, login, passRecovery, passUpdate, updateUser, deleteUser };
