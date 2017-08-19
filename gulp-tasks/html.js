import gulp from 'gulp'
import gutil from 'gulp-util'
import pug from 'gulp-pug'
import prettify from 'gulp-html-prettify'
import notifier from 'node-notifier'
import plumber from 'gulp-plumber'

import { IS_PRODUCTION } from '../config'
import PATHS from '../paths'

gulp.task('html:build', () => {
	const browserSync = require('browser-sync');
	const reload = browserSync.reload;

	return gulp.src(PATHS.src.html)
		.pipe(plumber({
			errorHandler: function (err) {
				gutil.log(err.message);
				notifier.notify({
					title: 'Pug compilation error',
					message: err.message
				});
			}
		}))
		.pipe(pug({
			src: PATHS.src.templates,
			pretty: true
		}))
		.pipe(prettify({indent_char: ' ', indent_size: 4}))
		.pipe(gulp.dest(PATHS.build.html))
		.pipe(reload({stream: true}));
});
