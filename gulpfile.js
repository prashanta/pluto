
var gulp = require('gulp');
var path = require('path');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var spawn = require('child_process').spawn;
var node;

gulp.task('lint', function(){
    return gulp.src(['./app/server/**/**/*.js', '!node_modlues/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('server', ['lint', 'build'], function() {
  if (node) node.kill();
  node = spawn('node', ['start.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('build', function(){
    var entries = [
        './app/client/index.js'
    ];

    entries.forEach(function(entry){
        var bundler = browserify(entry, {detectGlobals: true});
        bundler.transform(babelify);
        bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source(path.basename(entry)))
        .pipe(rename({extname : '.bundle.js'}))
        .pipe(buffer())
        .pipe(gulp.dest('./app/public/build'));
    });
});

gulp.task('default', ['server'], function(){
    gulp.watch(['./app/server/**/*.js'], ['server']);
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
});
