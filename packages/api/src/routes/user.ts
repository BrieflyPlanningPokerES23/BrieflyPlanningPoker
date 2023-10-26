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
  const token = user ? auth.create(email, 'pass-recovery', 300) : auth.create('inexistentAccount', 'inexistentAccount', 0);
  const url = process.env.URL;
  const newUrl = `${url}/confirm_reset?token=${token}`;
  
  await send({ 
      to: email, 
      subject: 'BRIEFLY - Password Recovery', 
      message: `Hey, did you ask for a password recovery?\n\nThis is your link ${newUrl}` })
    .then(() => {
      return res.status(200).json({});
    })
    .catch((error: any) => {
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
