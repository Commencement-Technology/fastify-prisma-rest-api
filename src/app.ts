import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { FastifyJWT } from '@fastify/jwt';
import fCookie from '@fastify/cookie';

import userRoutes from "./modules/user/user.route";
import { userSchemas } from './modules/user/user.schema';

const fastify = Fastify();

fastify.register(fjwt, {
    secret: process.env.JWT_SECRET || 'imvinojan02061999xxxx'
});

fastify.addHook('preHandler', (req, res, next) => {
    req.jwt = fastify.jwt
    return next()
});

fastify.register(fCookie, {
    secret: process.env.COOKIE_SECRET || 'imvinojan02061999xxxx',
    hook: 'preHandler',
})

// fastify.decorate(
//     "authenticate",
//     async (request: FastifyRequest, reply: FastifyReply) => {
//         try {
//             await request.jwtVerify();
//         } catch (error) {
//             return reply.send(error);
//         }
//     }
// )

fastify.post('/helloworld', async (request: FastifyRequest, reply: FastifyReply) => {
    // return { message: 'Hello World!' }
    const body = request.body;
    const token = request.jwt.sign({ body })
    return reply.send({ token })
})

async function main() {
    for (const schema of userSchemas) {         // should be add these schemas before you register your routes
        fastify.addSchema(schema);
    }

    fastify.register(userRoutes, { prefix: 'api/users' })      // routes register

    try {
        await fastify.listen(3000, "0.0.0.0");
        console.log("Server listening at http://localhost:3000");

    } catch (error) {
        console.error(error);
        process.exit(1);    // exit as failure
    }
}

main();