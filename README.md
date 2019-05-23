![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/github%20cover.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/supertokens/auth-demo/blob/master/LICENSE)

# Demo

This demo demonstrates the behaviour of SuperTokens session management solution in case of auth token theft.

This project uses [supertokens-node-mysql-ref-jwt](https://github.com/supertokens/supertokens-node-mysql-ref-jwt) as the backend and [supertokens-website](https://github.com/supertokens/supertokens-website) as the frontend for implementing session management.

You can see the demo at http://supertokens.io (Only works on Firefox)

NOTE:
- We use HTTP for this demo and send cookies with ``secure`` parameter set to ``false``. But in production environment, it is recommended to always use https and keep ``secure`` parameter set to ``true``.
- The access token expiry time is 10 seconds for the purpose of this demo, but in a production environment, it is recommended to set it to at least 15 mins.

## Authors
Created with :heart: by the folks at SuperTokens. We are a startup passionate about security and solving software challenges in a way that's helpful for everyone! Please feel free to give us feedback at team@supertokens.io, until our website is ready :grinning:
