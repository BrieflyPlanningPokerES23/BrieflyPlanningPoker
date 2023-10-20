import { Prisma, PrismaClient } from '@prisma/client';
import taskExtensions from './extensions/models/task';
import * as crypt from './extensions/crypt'

// const tasksWithVotes = Prisma.validator<Prisma.TaskDefaultArgs>()({include: { votes: {
//     select: { user: { select: {email: true} }, points: true, createdAt: true, round: true }
// } }});
// type TasksWithVotes = Prisma.TaskGetPayload<typeof tasksWithVotes>

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
.$extends({
    query: {
        task: {
            async create({ args, query }){
                const { maxRounds, percentual } = await prisma.squad
                .findUniqueOrThrow({
                    select: { maxRounds: true, percentual:true },
                    where: { id: args.data.squadId }
                });
                
                args.data.maxRounds ??= maxRounds;
                args.data.percentual ??= percentual;

                return query(args);
            }   
        }
    }
})
.$extends(taskExtensions)
.$extends({
    query:{
        user: {
            async $allOperations( { args, query } ){
                if('data' in args){
                    // Um único registro
                    if(args.data instanceof Array) {
                        for(const datum of args.data)
                            datum.password = await crypt.create(datum.password);
                    } else {
                        if(args.data.password){
                            if(typeof args.data.password === 'string')
                                args.data.password = await crypt.create(args.data.password);
                            else args.data.password.set = await crypt.create(args.data.password.set ?? "");
                        }
                    }
                }
                return await query(args);
            }
        }
    },
    model: {
        user:{
            /** 
             * Authenticate an user
             * @param email The user e-mail
             * @param password The user password
             * @returns {boolean}
             */
            async authenticate(email: string, password: string): Promise<boolean>{
                const user = await Prisma.getExtensionContext(this)
                    .$parent.user.findUniqueOrThrow({ where: { email } });
                
                return await crypt.compare(password, user.password);
            }
        }
    }
});

export default prisma;