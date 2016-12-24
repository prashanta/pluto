/*jshint esversion: 6 */

import fs from 'fs';
import path from 'path';

export default function(server){
    var routes = [];

    const walkSync = (dir, filelist = []) => {
        fs.readdirSync(dir).forEach(file => {
            if(fs.statSync(path.join(dir, file)).isDirectory())
                filelist =  walkSync(path.join(dir, file), filelist);
            else if((file.indexOf(".") !== 0) && (file !== "index.js"))
                filelist.push(path.join(dir, file));
        });
        return filelist;
    };

    walkSync(__dirname)
    .forEach(function(file) {
        var route = require(file);
        // Babel/ES6 module compatability
        if (typeof route === 'object' && route.__esModule)
            route = route['default'];
        routes.push(route);
    });

console.log('Adding routes ... ');
    routes.forEach(function(route) {
        route.forEach(function(api) {
            console.log(`${api.method} \t ${api.path}`);
            server.route(api);
        });
    });
}