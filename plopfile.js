module.exports = function (plop) {
  plop.setGenerator("controller", {
    description: "new component controller logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter a PascalCase name for your component:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "./src/{{name}}/{{name}}.tsx",
        templateFile: "./src/template/component.hbs",
      },
      {
        type: "add",
        path: "./src/{{name}}/index.js",
        templateFile: "./src/template/index.hbs",
      },
      {
        type: "add",
        path: "./src/{{name}}/{{name}}.story.js",
        templateFile: "./src/template/component.story.hbs",
      },
      {
        type: "modify",
        path: "./src/index.js",
        pattern: /$/,
        templateFile: "./src/template/index-js-injection.txt",
      },
      function (data) {
        return "Your component was created! 😊";
      },
    ],
  });
};
