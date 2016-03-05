module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {
			grunt: {
				files: ['grunt.js']
			}
		},

		browserify: {
			options: {
				transform: [ require('grunt-react').browserify  ]

			},
			app: {
				src: ['react_components/app.jsx'],
				dest: 'public/javascripts/app.js'
			},
			dinodetail: {
				src: ['react_components/dinodetail.jsx'],
				dest: 'public/javascripts/dinodetail.js'
			},
			dinolist: {
				src: ['react_components/dinolist.jsx'],
				dest: 'public/javascripts/dinolist.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['browserify']);
};
