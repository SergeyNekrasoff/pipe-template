export default {
	build: {
		html: 'build',
		js: 'build/assets/js/',
		css: 'build/assets/css/',
		img: 'build/assets/img/',
		fonts: 'build/assets/fonts/',
		sprites: 'build/assets/img/sprites/',
		svg: 'build/assets/svg/',
		resources: 'build/resources'
	},
	src: {
		templates: './src',
		html: 'src/*.pug',
		js: ['src/assets/js/**.js'],
		style: 'src/assets/scss/style.scss',
		img: 'src/assets/img/**/*.*',
		fonts: 'src/assets/fonts/**/*.*',
		sprites: 'src/assets/img/sprites/*.png',
		svg: 'src/assets/svg/**/*.svg',
		resources: 'src/resources/**/*.*',
	},
	watch: {
		html: 'src/**/*.pug',
		js: 'src/assets/js/**/*.js',
		style: 'src/assets/scss/**/*.scss',
		img: 'src/assets/img/**/*.*',
		fonts: 'src/assets/fonts/**/*.*',
		sprites: 'src/assets/img/sprites/*.png',
		svg: 'src/assets/svg/**/*.svg',
		resources: 'src/resources/**/*.*'
	},
	clean: 'build/'
};
