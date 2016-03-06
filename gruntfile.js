module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			options: {
				transform: [ require('grunt-react').browserify  ]

			},
			app: {
				src: ['react_components/app.jsx'],
				dest: 'public/js/app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['browserify']);
};