import Fastify from "fastify";

const server = Fastify();

server.get('/helloworld', async (req, res) => {
    return { message: 'Hello World!' }
})

async function main() {

    try {
        await server.listen(3000, "0.0.0.0");
        console.log("Server listening at http://localhost:3000");
        
    } catch (error) {
        console.error(error);
        process.exit(1);    // exit as failure
    }
}

main();