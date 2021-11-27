const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemap = require("gulp-sourcemaps");
const postCSS = require("gulp-postcss");
const browsersync = require("browser-sync").create();

function sassTask() {
  return src("assets/styles/*.scss")
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(sourcemap.write("."))
    .pipe(dest("assets/dist"))
    .pipe(browsersync.stream());
}

function postCSSTask() {
  return src("assets/dist/*.css")
    .pipe(sourcemap.init())
    .pipe(postCSS())
    .pipe(sourcemap.write("."))
    .pipe(dest("assets/dist"))
    .pipe(browsersync.stream());
}

function browserSyncServe(cb) {
  browsersync.init({
    proxy: "localhost:2368",
  });
  cb();
}

function watchTask() {
  watch("assets/styles/*.scss", series(sassTask, postCSSTask));
  watch("./**/*.hbs", series(sassTask, postCSSTask));
  watch("./**/*.hbs").on("change", browsersync.reload);
}

const build = series(sassTask, postCSSTask);
module.exports.zip = build;
module.exports.default = series(build, parallel(browserSyncServe, watchTask));
