var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress'),
	pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  rename = require('gulp-rename'),
	clean = require('gulp-clean');

gulp.task('img', function() {
  return gulp.src('assets/src/*')
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imageminJpegRecompress({
        loops: 5,
        min: 65,
        max: 70,
        quality:'medium'
      }),
      imagemin.svgo(),
      imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: '65-70', speed: 5})
    ],{
      verbose: true
    })))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('assets/app'));
    return gulp.src('assets/src/*')
    .pipe(clean());
});

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});
gulp.task('clean', function () {
  return gulp.src(['assets/app/*', 'assets/src/*'])
    .pipe(clean());
});


gulp.task('default', ['img']);