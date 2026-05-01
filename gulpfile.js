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
} from './tasks/gulp/export.js';
import {
    serveDocs
} from './tasks/gulp/serve-docs.js';

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
// Note: We use base: 'app/src' to keep the folder structure consistent
export const optimizeImages = () => {
    return gulp.src(['app/src/images/**/*.{jpg,png,jpeg,webp}'], {
            base: 'app/src/images',
            allowEmpty: true
        })
        .pipe(sharpOptimizeImages({
            webp: {
                quality: 80
            },
            jpg_to_jpg: {
                quality: 80
            }
        }))
        .pipe(gulp.dest('dist/assets'))
};

// 4. Move HTML pages from app/pages to root pages in dist
export const moveHtmlPages = () => {
    return gulp.src('dist/app/pages/**/*', {
            base: 'dist/app'
        })
        .pipe(gulp.dest('dist'))
        .on('end', () => deleteAsync(['dist/app']));
};

// 5. Servers
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
export async function copyVendorPackages() {
    // 1. Copy all standard node_modules
    await new Promise((resolve, reject) => {
        gulp.src(
            [
                "node_modules/bootstrap-icons/font/fonts/**/*",
                "node_modules/bootstrap-icons/font/bootstrap-icons.css",
                "node_modules/@fortawesome/fontawesome-free/webfonts/**/*",
                "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
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
                "node_modules/timedropper/**/*",
            ], {
                base: "node_modules"
            },
        )
        .pipe(gulp.dest("dist/plugins/"))
        .pipe(gulp.dest("app/src/plugins/"))
        .on('end', resolve)
        .on('error', reject);
    });

    // 2. Overwrite with patched version
    await new Promise((resolve, reject) => {
        gulp.src("app/src/scripts/plugins/timedropper-patched.js")
            .pipe(gulp.dest("dist/plugins/timedropper/"))
            .pipe(gulp.dest("app/src/plugins/timedropper/"))
            .on('end', resolve)
            .on('error', reject);
    });
}

// --- WORKFLOWS ---

// Local Development: Just clean and run dev server
export const dev = gulp.series(clean, serve);

// Standard Build: Build, then optimize, then export
export const build = gulp.series(
    clean,
    viteBuild,
    optimizeImages,
    moveHtmlPages,
    copyVendorPackages,
    exportAssets
);

// Production: Build everything then preview the final result
export const production = gulp.series(
    build,
    //preview dist folder
    preview
);

export const docs = gulp.series(serveDocs);
export default dev;