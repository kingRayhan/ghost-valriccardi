const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const zip = require("gulp-zip");
const pump = require("pump");
const postCSS = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const browsersync = require("browser-sync").create();

const handleError = (done) => {
  return function (err) {
    if (err) {
      beeper();
    }
    return done(err);
  };
};

function sassTask(done) {
  pump(
    [
      src("assets/styles/*.scss", { sourcemaps: true }),
      sass({ outputStyle: "compressed" }),
      dest("assets/dist", { sourcemaps: "." }),
      browsersync.stream(),
    ],
    handleError(done)
  );
}

function postCSSTask(done) {
  pump(
    [
      src("assets/dist/*.css", { sourcemaps: true }),
      postCSS(),
      cssnano(),
      dest("assets/dist", { sourcemaps: "." }),
      browsersync.stream(),
    ],
    handleError(done)
  );
}

function browserSyncServe(done) {
  browsersync.init({
    proxy: "localhost:2368",
  });
  done();
}

function zipper(done) {
  const filename = `${require("./package.json").name}.${Date.now()}.zip`;

  pump(
    [
      src([
        "**",
        "!node_modules",
        "!node_modules/**",
        "!zip-dist",
        "!zip-dist/**",
        "!yarn-error.log",
        "!package-lock.json",
        "!yarn.lock",
        "!gulpfile.js",
      ]),
      zip(filename),
      dest("zip-dist/"),
    ],
    handleError(done)
  );
}

function watchTask() {
  watch("assets/styles/*.scss", series(sassTask, postCSSTask));
  watch("./**/*.hbs", series(sassTask, postCSSTask));
  watch("./**/*.hbs").on("change", browsersync.reload);
}

const build = series(sassTask, postCSSTask);
module.exports.zip = series(build, zipper);
module.exports.default = series(build, parallel(browserSyncServe, watchTask));
