import Session from "supertokens-node/recipe/session";

async function someFunc() {
      let userId = "20de6293-6b0b-4e6a-9bc0-8fd9a914366f";
      // we first get all the sessionHandles (string[]) for a user
      let sessionHandles = await Session.getAllSessionHandlesForUser(userId);

      sessionHandles.forEach(async (handle) => {
            let currSessionInfo = await Session.getSessionInformation(handle)
            if (currSessionInfo === undefined) {
                  return;
            }
            let accessTokenPayload = currSessionInfo.accessTokenPayload;
            let customClaimValue = accessTokenPayload.customClaim;
      })
}

someFunc()