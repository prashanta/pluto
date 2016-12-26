var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    spawn = require('child_process').spawn,
    node;

gulp.task('lint', function(){
    return gulp.src(['./app/**/**/*.js', '!node_modlues/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('server', ['lint'], function() {
  if (node) node.kill();
  node = spawn('node', ['start.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default', ['server'], function(){
    gulp.watch(['./app/**/*.js'], ['server']);
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
});
