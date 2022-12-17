import { DaprClient, DaprInvokerCallbackContent, HttpMethod } from "@dapr/dapr";
// CommonJs
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})


const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port of this Example Server
const serverHost = "127.0.0.1"; // App Host of this Example Server
const serverPort = "50051"; // App Port of this Example Server "
const client = new DaprClient(daprHost, daprPort);

fastify.get('/', async (request, reply) => {
  return { hello: 'app3' }
})

fastify.get('/testApp2', async (request, reply) => {
  return client.invoker.invoke('app2', '/', HttpMethod.GET).catch(e => e)
})

fastify.get('/testAppPython', async (request, reply) => {
  return client.invoker.invoke('appPython', '/', HttpMethod.GET).catch(e => e)
})

fastify.get('/testApp3', async (request, reply) => {
  return client.invoker.invoke('app3', '/testApp3', HttpMethod.GET).catch(e => e)
})


const callbackFunction = async (data: DaprInvokerCallbackContent) => {
  console.log("Received body: ", data.body);
  console.log("Received metadata: ", data.metadata);
  console.log("Received query: ", data.query);
  console.log("Received headers: ", data.headers); // only available in HTTP
};

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()