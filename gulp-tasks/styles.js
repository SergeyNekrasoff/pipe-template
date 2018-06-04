import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notifier from 'node-notifier'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import sprites from 'postcss-sprites'
import assets from 'postcss-assets'
import gutil from 'gulp-util'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import cssmin from 'gulp-clean-css';
import gulpif from 'gulp-if'

import PATHS from '../paths'
import CONFIG from '../config'

const PROCESSORS = [
	autoprefixer({
		browsers: ['last 4 versions'],
		cascade: true
	}),
	assets({
		basePath: 'src/',
		baseUrl: '../',
		loadPaths: ['assets/img/']
	}),
	sprites({
		stylesheetPath: './build/assets/css/',
		spritePath: './build/assets/img/sprite.png',
		retina: true,
		outputDimensions: true,
		padding: 4,
		filterBy: image => /sprites\/.*\.png$/gi.test(image.url)
	})
];

gulp.task('style:build', () => {
	const browserSync = require('browser-sync');
	const reload = browserSync.reload;

	gulp.src(PATHS.src.style)
		.pipe(plumber({
			errorHandler: function (err) {
				gutil.log(err.message);
				notifier.notify({
					title: 'SCSS compilation error',
					message: err.message
				});
			}
		}))
		.pipe(gulpif(CONFIG.sourcemaps.css, sourcemaps.init()))
		.pipe(sass({
			outputStyle: 'compact',
			sourceMap: false,
			errLogToConsole: true,
			indentedSyntax: true
		}))
		.pipe(postcss(PROCESSORS))
		.pipe(gulpif(CONFIG.compress.css, cssmin({processImport: false})))
		.pipe(gulpif(CONFIG.sourcemaps.css, sourcemaps.write()))
		.pipe(gulp.dest(PATHS.build.css))
		.pipe(reload({stream: true}));
});
