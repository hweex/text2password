module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: ";(function( window, undefined ){'use strict';",
        footer: ";window.<%= pkg.name %>=<%= pkg.name %>;}(window));",
        separator: ';\n\n',
      },
      dist: {
        src: [
          "src/md5.js",
          "src/text2password.js"
        ],
        dest: "build/text2password.js"
      }
    },

    uglify: {
      build: {
        src: 'build/text2password.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat', 'uglify']);

};