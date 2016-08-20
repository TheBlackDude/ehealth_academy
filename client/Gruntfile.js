module.exports = function (grunt) {

    // setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			javascript: {
				src: 'public/javascript/**/*.js',
				dest: 'public/javascript/scripts.js'
			}
		},
		uglify: {
			javascript: {
				files: {
					'public/build/scripts.min.js': '<%= concat.javascript.dest %>'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/build/styles.min.css': ['public/stylesheets/**/*.css']
				}
			}
		},
		watch: {
			javascript: {
				files: ['<%= concat.javascript.src %>'],
				tasks: ['concat', 'uglify']
			},
			combine: {
				files: ['public/stylesheets/**/*.css'],
				tasks: ['cssmin']
			}
		}
	});

	// load Tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// register Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']);
};
