const fs = require("fs");
const SVG = require("svgi");

const jsonPath = "assets/icons.json";
const svgPath = "assets";

const parseSvg = svg => {
  const { nodes } = new SVG(svg).report();
  const path = getPath(nodes);
  const {
    properties: { viewBox }
  } = nodes;

  return {
    viewBox,
    path
  };

  function getPath({ children }) {
    return children
      .filter(
        child => child.type === "path" && child.properties.fill !== "none"
      )
      .map(child => child.properties.d);
  }
};

const icons = fs
  .readdirSync(svgPath)
  .filter(file => /\.svg$/.test(file))
  .map(file => {
    const name = file.replace(".svg", "");
    const svg = fs.readFileSync(`${svgPath}/${file}`);
    return {
      name,
      svg
    };
  });

const iconData = {};

icons.forEach(({ svg, name }) => {
  const { path, viewBox } = parseSvg(svg);
  iconData[name] = { path, viewBox };
});

const json = JSON.stringify(iconData, null, "  ");
fs.writeFileSync(jsonPath, json);
