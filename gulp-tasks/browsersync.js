import gulp from 'gulp'
import historyApiFallback from 'connect-history-api-fallback'

gulp.task('browserSync', () => {
	const browserSync = require('browser-sync');
	browserSync({
		server: {
			baseDir: 'build',
		},
		host: 'localhost',
		port: 9000,
		logPrefix: 'frontend',
		open: false,
		files: [
			'build/assets/css/*.css',
			'build/assets/js/*.js',
			'build/*.html',
		],
		middleware: [historyApiFallback({
			htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
			rewrites: [
				{from: /.*!test.json/, to: '/index.html'}
			]
		})]
	});
});
