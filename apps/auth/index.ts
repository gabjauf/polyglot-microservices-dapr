import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { DaprClient, DaprInvokerCallbackContent, HttpMethod } from "@dapr/dapr";
import cors from "@fastify/cors";
import { plugin } from "supertokens-node/framework/fastify";
import formDataPlugin from "@fastify/formbody";
import { errorHandler } from "supertokens-node/framework/fastify";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";

import fastifyImport from "fastify";
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

supertokens.init({
  framework: "fastify",
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: "http://localhost:3567",
    apiKey: "keykeykey",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "zdadz",
    apiDomain: "http://localhost:3002",
    websiteDomain: "http://localhost:3002",
    apiBasePath: "/auth",
    websiteBasePath: "/login"
  },
  recipeList: [
    Session.init(),
    EmailPassword.init(),
    Dashboard.init({
      apiKey: "keykeykey"
    }),
  ]
});

fastify.register(cors, {
  origin: "http://localhost:3002",
  allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
  credentials: true,
});

fastify.setErrorHandler(errorHandler());

fastify.post("/login", async (req, res) => {

  // verify user's credentials...

  let userId = "userId"; // get from db

  await Session.createNewSession(res, userId);

  /* a new session has been created.
   * - an access & refresh token has been attached to the response's cookie
   * - a new row has been inserted into the database for this new session
  */

  res.send({ message: "User logged in!" });
})

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
    await fastify.register(formDataPlugin);
    await fastify.register(plugin);
    await fastify.listen({ port: 3002 });
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()