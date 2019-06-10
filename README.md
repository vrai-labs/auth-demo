![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/supertokens/auth-demo/blob/master/LICENSE)

# Demo

This demonstrates the behaviour of SuperTokens session management solution in case of auth token theft.

This uses [supertokens-node-mysql-ref-jwt](https://github.com/supertokens/supertokens-node-mysql-ref-jwt) as the backend and [supertokens-website](https://github.com/supertokens/supertokens-website) as the frontend for implementing session management.

You can see the live demo at http://supertokens.io (Only works on Firefox)

NOTE:
- **We use HTTP for this demo and send cookies with ``secure`` parameter set to ``false``. But in production environment, it is recommended to always use https and keep ``secure`` parameter set to ``true``.**
- **The access token expiry time is 10 seconds for the purpose of this demo, but in a production environment, it is recommended to set it to at least 15 mins.**

## Code setup
```bash
npm i --save supertokens-node-mysql-ref-jwt
npm i --save supertokens-website
npm i --save cookie-parser
```
### Backend
1) The server is started by running index.ts which initialises the SuperTokens library and sets up the router:
   ```js
   import * as SuperTokens from 'supertokens-node-mysql-ref-jwt';
   import * as cookieParser from 'cookie-parser';
   
   let app = express();
   app.use(cookieParser());
   SuperTokens.init(...).then(() => {
     // setup routers..
   })
   ```
2) The login API (login.ts) creates a new session in the following way:
   ```js
   // we generate a random userId for purpose of this demo
   // the jwt payload is undefined since we don't need this for the demo
   // the session data stores the name of this user.
   let session = await SuperTokens.createNewSession(res, getRandomString(), undefined, {
           name: getRandomName()
       });
   ```
3) The userInfo API (userInfo.ts) uses the session to get the current user's name and userId:
   ```js
   let session = await SuperTokens.getSession(req, res);
   let userId = session.getUserId();
   let metaInfo = await session.getSessionData();
   let name = metaInfo.name
   ```
4) The logout API (logout.ts) destroys the current session:
   ```js
   let session = await SuperTokens.getSession(req, res);
   await session.revokeSession();
   ```
5) There is a special API endpoint to refresh the session (refreshtoken.ts):
   ```js
   await SuperTokens.refreshSession(req, res);
   // send status 200 to client.
   ```
6) If the user accessing the login page has a session which is alive already, then we redirect to the homepage (see in index.ts):
   ```js
   app.get("/", async function (req, res) {
     try {
       let result = await SuperTokens.getSession(req, res);
       // redirect to home page and return
     } catch (err) {
       if (SuperTokens.Error.isErrorFromAuth(err) && err.errType === SuperTokens.Error.TRY_REFRESH_TOKEN) {
         // session may be alive, so we redirect to home page and return
       }
     };
     // send login page as we know a session is not alive anymore
   });
   ```
7) Detecting token theft (index.ts):
   ```js
   SuperTokens.init({
     ...configs,
     onTokenTheftDetection: (userId: string, sessionHandle: string) => {
       // logout user's all devices, or just the devices that use this sessionHandle.
     }
   });
   ```
### Frontend
The frontend is written in ReactJS.

1) We initialise the SuperTokens library in the constructor of the root component (index.tsx):
   ```js
   import * as SuperTokensRequest from 'supertokens-website';
   class Router extends React.PureComponent {
      constructor() {
         SuperTokensRequest.init("/api/refreshtoken", 440);
      }
   }
   ```
2) In the login page (loginpage.tsx), when the login button is pressed, we send a POST request to our server:
   ```js
   let response = await SuperTokensRequest.post("/api/login");
   if (response.status !== 200) {
      throw response;
   }
   // success, we redirect to home page.
   ```
3) In the homepage (homepage.tsx), we get user information in the following way:
   ```js
   try {
      let rawData = await SuperTokensRequest.get("/api/userinfo");
      if (rawData.status !== 200) {
         throw rawData;
      }
      let data = await rawData.json();
      let name = data.name;
      let userId = data.userId;
      // update UI
   } catch (err) {
      if (err.status === 440) {
         // user's session has expired. we need to redirect to login page.
      }
   }
   ```
4) In the homepage (homepage.tsx), we call our logout API when the user clicks the logout button:
   ```js
   try {
      let rawData = await SuperTokensRequest.post("/api/logout");
      if (rawData.status !== 200) {
         throw rawData;
      }
      // logout successful. Redirect to login page
   } catch (err) {
      if (err.status === 440) {
         // user had an expired session already. So redirect to login page
      }
   }
   ```

## Authors
Created with :heart: by the folks at SuperTokens. We are a startup passionate about security and solving software challenges in a way that's helpful for everyone! Please feel free to give us feedback at team@supertokens.io, until our website is ready :grinning:
