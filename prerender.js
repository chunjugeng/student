import fs from 'fs';
import path from 'path';
import config from './routerConfig';

const outputFileName = 'index.html';
const srcRoot = path.resolve('./src');
const pageDir = path.resolve('./src/modules');
let mods = [];
let preRenderers = Object.create(null);

function scanModules() {
    let subDirs = fs.readdirSync(pageDir);
    for(let dir in config) {
        if (fs.existsSync(path.resolve(`./src/modules/${dir}`))) {
            let prerenderDir = path.resolve(`./prerenders/${dir}.js`);
            if (prerenderDir && config[dir]) {
                mods.push(dir);
                preRenderers[dir] = require(`./prerenders/${dir}.js`).default;
            }
        }
    }
}

build();
function build() {
    scanModules();
    if (mods && mods.length) {
        for (let currMod of mods) {
            let moduleConfig = config[currMod];
            let cf = {
				title: moduleConfig.title,
				tpl: path.join(srcRoot, moduleConfig.tpl),
				htmlFile: path.join(pageDir, currMod, outputFileName)
            };
            renderModule(currMod, cf);
        }
    } else {
        throw new Error(`can't find any module to build`);
    }
}

function renderModule(currMod, cf) {
    let renderer = preRenderers[currMod];
    if (typeof renderer == 'function') {
		renderer.apply(renderer, [currMod, cf]);
	} else {
		const error = `can't find module prerenderer: ${currMod}`;
	}
}