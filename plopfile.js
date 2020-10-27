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
        path: "components/src/{{name}}/{{name}}.js",
        templateFile: "components/src/template/component.hbs",
      },
      {
        type: "add",
        path: "components/src/{{name}}/index.js",
        templateFile: "components/src/template/index.hbs",
      },
      {
        type: "add",
        path: "components/src/{{name}}/{{name}}.story.js",
        templateFile: "components/src/template/component.story.hbs",
      },
      {
        type: "modify",
        path: "components/src/index.js",
        pattern: /$/,
        templateFile: "components/src/template/index-js-injection.txt",
      },
      function (data) {
        return "Your component was created! 😊";
      },
    ],
  });
};
