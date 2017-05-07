'use strict';

var gulp			   = require('gulp'),
	argv			     = require('yargs').argv,
	babel          = require('gulp-babel'),
	pathplug		   = require('path'),
	gulpif			   = require('gulp-if'),
	watch			     = require('gulp-watch'),
	uglify			   = require('gulp-uglify'),
	sass			     = require('gulp-sass'),
	sourcemaps		 = require('gulp-sourcemaps'),
	rigger			   = require('gulp-rigger'),
	cssmin			   = require('gulp-minify-css'),
	imagemin		   = require('gulp-imagemin'),
	pngquant		   = require('imagemin-pngquant'),
	rimraf			   = require('rimraf'),
	browserSync		 = require('browser-sync'),
	pug            = require('gulp-pug'),
	postcss			   = require('gulp-postcss'),
	autoprefixer	 = require('autoprefixer'),
	sprites			   = require('postcss-sprites'),
	assets			   = require('postcss-assets'),
	svgstore		   = require('gulp-svgstore'),
	svgmin			   = require('gulp-svgmin'),
	rename			   = require('gulp-rename'),
	reload			   = browserSync.reload;

var PRODUCTION = argv.production;

var CONFIG = {
	browserSync: {
		server: {
			baseDir: './build'
		},
		tunnel: false,
		host: 'localhost',
		port: 9000,
		logPrefix: 'frontend',
		open: false
	},
	sourcemaps: {
		css: false,
		js: false
	},
	compress: {
		css: false,
		js: false,
		img: true
	}
};

if (PRODUCTION) {
	CONFIG.sourcemaps = {
		css: false,
		js: false
	};
	CONFIG.compress = {
		css: true,
		js: true,
		img: true
	};
}

var PATHS = {
	build: {
		html:	 'build/',
		js:		 'build/assets/js/',
		css:	 'build/assets/css/',
		img:	 'build/assets/img/',
		fonts:	 'build/assets/fonts/',
		sprites: 'build/assets/img/sprites',
		svg:	 'build/assets/svg'
	},
	src: {
		html:	 'src/*.pug',
		js:		 'src/assets/js/main.js',
		style:	 'src/assets/scss/style.scss',
		img:	 'src/assets/img/**/*.*',
		fonts:	 'src/assets/fonts/**/*.*',
		sprites: 'src/assets/img/sprites/*.png',
		svg:	 'src/assets/svg/**/*.svg'
	},
	watch: {
		html:	 'src/**/*.pug',
		js:		 'src/assets/js/**/*.js',
		style:	 'src/assets/scss/**/*.scss',
		img:	 'src/assets/img/**/*.*',
		fonts:	 'src/assets/fonts/**/*.*',
		sprites: 'src/assets/img/sprites/*.png',
		svg:	 'src/assets/svg/**/*.svg'
	},
	clean: './build'
};

gulp.task('webserver', function () {
	browserSync(CONFIG.browserSync);
});

gulp.task('clean', function (cb) {
	rimraf(PATHS.clean, cb);
});

gulp.task('html:build', function () {
	gulp.src(PATHS.src.html)
	.pipe(pug({
			pretty: true
		}))
		.pipe(rigger())
		.pipe(gulp.dest(PATHS.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src(PATHS.src.js)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(rigger())
		.pipe(gulpif(CONFIG.sourcemaps.js, sourcemaps.init()))
		.pipe(gulpif(CONFIG.compress.js, uglify()))
		.pipe(gulpif(CONFIG.sourcemaps.js, sourcemaps.write()))
		.pipe(gulp.dest(PATHS.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('style:build', function () {

	var processors = [
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
			filterBy: function(image) {
				// Create sprite for ../sprites/ directory only
				return /sprites\/.*\.png$/gi.test(image.url);
			}
		})
	];

	gulp.src(PATHS.src.style)
		.pipe(gulpif(CONFIG.sourcemaps.css, sourcemaps.init()))
		.pipe(sass({
			outputStyle: 'compact',
			sourceMap: false,
			errLogToConsole: true,
			indentedSyntax: true
		}).on('error', function (err) {
			console.error('Error: ', err.message);
		}))
		.pipe(postcss(processors))
		.pipe(gulpif(CONFIG.compress.css, cssmin()))
		.pipe(gulpif(CONFIG.sourcemaps.css, sourcemaps.write()))
		.pipe(gulp.dest(PATHS.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
	gulp.src(PATHS.src.img)
		.pipe(gulpif(CONFIG.compress.img, imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		})))
		.pipe(gulp.dest(PATHS.build.img));
});

gulp.task('fonts:build', function() {
	gulp.src(PATHS.src.fonts)
		.pipe(gulp.dest(PATHS.build.fonts))
});

gulp.task('svg:build', function() {
	return gulp.src(PATHS.src.svg)
		.pipe(svgmin())
		.pipe(rename({prefix: 'icon-'}))
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest(PATHS.build.svg));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build',
	'svg:build'
]);

gulp.task('watch', function(){
	watch([PATHS.watch.html], function(event, cb) {
		gulp.start('html:build');
	});
	watch([PATHS.watch.style], function(event, cb) {
		gulp.start('style:build');
	});
	watch([PATHS.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([PATHS.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([PATHS.watch.svg], function(event, cb) {
		gulp.start('svg:build');
	});
	watch([PATHS.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
});

gulp.task('default', ['build', 'webserver', 'watch']);
