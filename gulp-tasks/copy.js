import gulp from 'gulp'
import PATHS from '../paths'

gulp.task('resources:build', () => {
	return gulp.src(PATHS.src.resources)
		.pipe(gulp.dest(PATHS.build.resources));
});
