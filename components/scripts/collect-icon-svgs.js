const fs = require('fs')
const svgi = require('SVGI')

const jsonPath = 'icons/icons.json'
const svgPath = 'icons'

const parseSvg = svg => {
    const {nodes} = new svgi(svg).report()
    const path = getPath(nodes)
    const viewBox = getViewBox(nodes)
    return {
        viewBox,
        path
    }
}

const getPath = nodes =>{
    return(
        nodes.children
            .filter(child => (child.type === 'path' && child.properties.fill != "none"))
            .map(child => child.properties.d)
    )
}

const getViewBox = nodes =>{
    return(
        nodes.properties.viewBox
    )
}

const icons = fs
    .readdirSync(svgPath)
    .filter(file => /\.svg$/.test(file))
    .map(file => {
        const name = file.replace('.svg','');
        const svg = fs.readFileSync(svgPath+"/"+file);
        return{
            name,
            svg 
        }
    })

const iconData = {};

icons.forEach(function(icon){
    path = parseSvg(icon.svg).path;
    viewBox = parseSvg(icon.svg).viewBox;
    name = icon.name;
    iconData[name ] = {"path":path,"viewBox":viewBox}
});

const json = JSON.stringify(iconData, null,"  ");
fs.writeFileSync(jsonPath, json);

