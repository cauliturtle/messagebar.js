module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			// define the files to lint
			files: ['./src/*.js'],
		},
		less: {
			compile: {
				options: {
					strictMath: true
				},
				files: {
					'dist/css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'
				}
			},
			minify: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
				}
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			bootstrap: {
				src: ['src/<%= pkg.name %>.js'],
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'less', 'uglify']);

};