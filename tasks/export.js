import gulp from 'gulp';
import tap from 'gulp-tap';
import copy from 'gulp-copy';

export function exportAssets() {
  return gulp.src([
      'dist/**/*.html',
      'dist/assets/**/*',
      'dist/favicon.ico',
      'dist/plugins/**/*',
      'dist/vendors/**/*',
      'dist/**/*.{png,jpg,jpeg,gif,svg,webp,ico}',
      'dist/.nojekyll'
    ], {
      allowEmpty: true
    })
    .pipe(tap((file) => {
      console.log('Processing:', file.relative);
      if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(file.path)) {
        console.log('✅ Image Found & Copying:', file.relative);
      }
    }))
    .pipe(copy('docs', {
      prefix: 1
    }));
}