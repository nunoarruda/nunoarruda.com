/*global module*/
module.exports = function (grunt) {
    'use strict';
    
    // config plugins
    grunt.initConfig({
        
        clean: {
            dev: ["dev/styles/main.css", "dev/styles/main.css.map"],
            dist: ["dist"]
        },
        
        htmllint: {
            dev: ["dev/{,*/}*.html"],
            dist: ["dist/{,*/}*.html"]
        },
        
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dev/styles/main.css': 'dev/styles/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dev/styles/main.css': 'dev/styles/main.scss'
                }
            }
        },
        
        autoprefixer: {
            single_file: {
                options: {
                    map: true
                },
                src: 'dev/styles/main.css'
            }
        },
        
        connect: {
            server: {
                options: {
                    livereload: true, // injects a live reload script tag
                    hostname: 'localhost',
                    port: 9000,
                    base: 'dev',
                    open: true
                }
            }
        },
        
        watch: {
            options: {
                livereload: true // enables a live reload server
            },
            files: ['dev/{,*/}*'],
            html: {
                files: ['dev/{,*/}*.html'],
                tasks: ['htmllint:dev']
            },
            sass: {
                files: ['dev/styles/main.scss'],
                tasks: ['sass:dev', 'autoprefixer']
            }
        },
        
        copy: {
            dist: {
                files: [{expand: true, cwd: 'dev/', src: ['**', '!{,*/}*.scss'], dest: 'dist/'}]
            }
        },
        
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: '{,*/}*.html',
                    dest: 'dist/'
                }]
            }
        }
        
    });
    
    // load plugins
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html');
    
    // setup tasks
    grunt.registerTask('dev', ['clean:dev', 'htmllint:dev', 'sass:dev', 'autoprefixer', 'connect', 'watch']);
    grunt.registerTask('dist', ['clean', 'sass:dist', 'autoprefixer', 'copy', 'htmlmin', 'htmllint:dist']);

};
