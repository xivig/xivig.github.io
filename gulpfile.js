import gulp from 'gulp';
import {
    exec
} from 'child_process';
import sharpOptimizeImages from 'gulp-sharp-optimize-images';
import {
    deleteAsync
} from 'del';
import {
    exportAssets
} from './tasks/export.js';

// 1. Clean
export const clean = () => deleteAsync(['dist', 'exports']);

// 2. Vite Build
export const viteBuild = (cb) => {
    exec('npx vite build', (err, stdout, stderr) => {
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        cb(err);
    });
};

// 3. Image Optimization
// Note: We use base: 'src' to keep the folder structure consistent
export const optimizeImages = () => {
    return gulp.src('src/images/**/*.{jpg,png,jpeg,webp}', {
            base: 'src'
        })
        .pipe(sharpOptimizeImages({
            webp: {
                quality: 80
            },
            jpg_to_jpg: {
                quality: 80
            }
        }))
        .pipe(gulp.dest('dist/assets')) // Saves to dist/assets/images/...
        // .pipe(gulp.dest('exports/assets')); // Saves to exports/assets/images/...
};

// 4. Servers
export const serve = (cb) => {
    const vite = exec('npx vite --open');
    vite.stdout.on('data', (d) => console.log(d));
    cb();
};

export const preview = (cb) => {
    const vite = exec('npx vite preview');
    vite.stdout.on('data', (d) => console.log(d));
    cb();
};

// Copy entire vendor folders from node_modules into app/vendors and app/plugins
export function copyVendorPackages() {
    return gulp
        .src(
            [
                "node_modules/bootstrap-icons/**/*",
                "node_modules/@fortawesome/fontawesome-free/**/*",
                "node_modules/bootstrap/dist/**/*",
                "node_modules/jquery/dist/**/*",
                "node_modules/overlayscrollbars/**/*",
                "node_modules/summernote/dist/**/*",
                "node_modules/@fullcalendar/**/*",
                "node_modules/dropzone/**/*",
                "node_modules/air-datepicker/**/*",
                "node_modules/cropperjs/**/*",
                "node_modules/highlight.js/**/*",
                "node_modules/dayjs/**/*",
                "node_modules/moment/**/*",
                "node_modules/clipboard/**/*",
            ], {
                base: "node_modules"
            },
        ) // preserve folder names
        // .pipe(gulp.dest("dist/vendors/")) // copy into vendors/<package>/
        .pipe(gulp.dest("dist/plugins/")) // copy into plugins/<package>/
        .pipe(gulp.dest("src/plugins/")) // copy into plugins/<package>/

}

// --- WORKFLOWS ---

// Local Development: Just clean and run dev server
export const dev = gulp.series(clean, serve);

// Standard Build: Build, then optimize, then export
export const build = gulp.series(
    clean,
    viteBuild,
    optimizeImages,    
    copyVendorPackages,
    exportAssets
);

// Production: Build everything then preview the final result
export const production = gulp.series(
    build,
    copyVendorPackages,
    //preview dist folder
    preview
);

export default dev;
