const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

console.log("build storybook");
const a = exec("yarn workspace @nulogy/components build-storybook");

console.log("starting the server");
a.then(() => exec("yarn http-server -p 8080 ../components/storybook-static"));

exec("yarn wait-on http://localhost:8080").then(() =>
  console.log("server ready")
);

// yarn start-static-storybook-server HTTPSERVER_PID=$1 && yarn cypress run --spec '**/components/**/*spec.js' && echo $HTTPSERVER_PID && kill $HTTPSERVER_PID",
