# E2E Tests for Lowlander

This uses [nightwatch-cucumber](https://github.com/mucsi96/nightwatch-cucumber). You should also 
familiarize yourself with the [nigtwatch API](http://nightwatchjs.org/api) and [guide](http://nightwatchjs.org/guide).

## Running the end-to-end tests

To run the tests:

1. Install the required modules:
```bash
npm i
```

2. Run the tests in Chrome and Firefox:
```bash
npm test
```

If you want to test individual browsers:
```bash
npm run test-chrome 
```
or

```bash
npm run test-firefox
```

## Environment variables

The tests use environment variables in order to know what Portal and environment to test.
These are as follow:

- `O2_ENV` - Set this to `dev` if you want to test stage Lowlander Portal. Any other value will assume you want production.

- `O2_AUTH_EMAIL` - Set this to the email address you want to use for login to the set Portal.

- `O2_AUTH_PASSWORD` - Set this to the password you want to use for login to the set Portal.

An example of this would be:

```bash
O2_ENV=dev O2_AUTH_EMAIL='j.doe@example.com' O2_AUTH_PASSWORD='53cr37!' npm test
```
## Some notes

When going to a URL in your step definitions (`steps.js`), make sure you use the full URL with the protocol. For instance:

```javascript
    client.url('http://portal.example.com');
```

When registering a handler (see `libs/handlers.js`), make sure that you call the final `callback()`. If you don't,
your tests will hang waiting for this.

## Author

Adeola Awoyemi <adeola.awoyemi@teamaol.com>

