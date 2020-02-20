////////////////////////////////////////////////////////////////////////////////////////////////////
// gulp / js ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
const { src, dest, watch } = require("gulp");
const log = require("fancy-log");
const color = require("ansi-colors");
const plumber = require("gulp-plumber");
const config = require("./gulp-config.js");

// Módulos específicos para JS
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const fs = require("fs-extra");

let tasks = { };

////////////////////////////////////////////////////////////////////////////////////////////////////

// Watch
tasks["watch"] = function watchJS(done) {
    watch(config["js"]["watch"], { cwd: config["js"]["dir"], ignoreInitial: false }, tasks["stage"]);
    done();
};

// Stage
tasks["stage"] = function stageJS(done) {
    let source = fs.readJsonSync(config["js"]["source"]);

    src(source, { sourcemaps: true })
        .pipe(plumber())
        .pipe(concat("eleicoes.js"))
        .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(dest(config["js"]["destination"]["development"], { sourcemaps: true, mode: "0644" }));

    log(color.yellow("JS !!"));
    done();
};

module.exports = tasks;
