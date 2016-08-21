module.exports = function (grunt) {

    // setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			javascript: {
				src: ['models/*.js', 'config/*.js', 'routes/*.js', 'services/*.js', 'controllers/*.js'],
				dest: 'dist/js/eHealthScripts.js'
			}
		},
		uglify: {
			javascript: {
				files: {
					'dist/js/eHealthScripts.min.js': '<%= concat.javascript.dest %>'
				}
			}
		},
		/*cssmin: {
			combine: {
				files: {
					'dist/css/styles.min.css': ['stylesheets/*.css']
				}
			}
		},*/
		watch: {
			javascript: {
				files: ['<%= concat.javascript.src %>'],
				tasks: ['concat', 'uglify']
			}
			/*combine: {
				files: ['stylesheets/*.css'],
				tasks: ['cssmin']
			}*/
		}
	});

	// load Tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// register Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};
