////////////////////////////////////////////////////////////////////////////////////////////////////
// gulp ////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
const { task, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create("gulp");

// CSS
const css = require("./dev/build/gulp-css.js");
task("watch-css", series(css["watch"]));
task("stage-css", series(css["stage"]));

// JS
const js = require("./dev/build/gulp-js.js");
task("watch-js", series(js["watch"]));
task("stage-js", series(js["stage"]));

// HTML
const html = require("./dev/build/gulp-html.js");
task("watch-html", series(html["watch"]));
task("stage-html", series(html["stage"]));

// Assets
const assets = require("./dev/build/gulp-assets.js");
task("watch-assets", series(assets["watch"]));
task("stage-assets", series(assets["stage"]));

////////////////////////////////////////////////////////////////////////////////////////////////////

task("watch", parallel(html["watch"], css["watch"], js["watch"], assets["watch"]));
task("stage", series(parallel(css["stage"], js["stage"], assets["stage"]), html["stage"]));
task("default", parallel("stage"));

task("serve", parallel("watch", function serve(done) {
	browserSync.init({
		"logFileChanges": false,
		"notify": false,
		"open": (process.argv.includes("-s") ? false : true),
		"server": "./docs"
	});
	done();
}));
