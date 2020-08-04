const path = require("path");
module.exports = {
  description: "CLI generator component for react-native",
  prompts: [
    {
      type: "list",
      name: "action",
      message: "Select function component or class component:",
      choices: () => [
        {
          name: "Function Component",
          value: "fc",
        },
        {
          name: "Class Component",
          value: "cc",
        },
      ],
    },
    { type: "input", name: "name", message: "Component Name:" },
    { type: "input", name: "route", message: "Component Path:" },
    {
      type: "list",
      name: "language",
      message: "Select language code:",
      choices: () => [
        {
          name: "Using javascript",
          value: "js",
        },
        {
          name: "Using typescript",
          value: "ts",
        },
      ],
    },
  ],
  actions: (data) => {
    const route = data.route;
    const _path = path.join("../../", `src/`);
    let actions = [];
    const actionsType = new Map([
      [
        "fc_js",
        {
          type: "add",
          path: `${_path}${route}/{{properCase name}}.js`,
          templateFile: "templates/functionComponent/FunctionComponent.js.hbs",
        },
      ],
      [
        "fc_ts",
        {
          type: "add",
          path: `${_path}${route}/{{properCase name}}.tsx`,
          templateFile: "templates/functionComponent/FunctionComponent.ts.hbs",
        },
      ],
      [
        "cc_js",
        {
          type: "add",
          path: `${_path}${route}/{{properCase name}}.js`,
          templateFile: "templates/classComponent/ClassComponent.js.hbs",
        },
      ],
      [
        "cc_ts",
        {
          type: "add",
          path: `${_path}${route}/{{properCase name}}.tsx`,
          templateFile: "templates/classComponent/ClassComponent.ts.hbs",
        },
      ],
    ]);
    return [...actions,actionsType.get(`${data.action}_${data.language}`)];
  },
};
