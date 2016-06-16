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
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'dev/styles/main.css': 'dev/styles/main.scss'
                }
            }
        },
        
        autoprefixer: {
            dev: {
                options: {
                    map: true
                },
                src: 'dev/styles/main.css'
            },
            dist: {
                options: {
                    map: false
                },
                src: 'dev/styles/main.css'
            }
        },
        
        browserSync: {
            dev: {
                bsFiles: {
                    src : 'dev/{,*/}*'
                },
                options: {
                    watchTask: true,
                    server: './dev'
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
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html');
    
    // setup tasks
    grunt.registerTask('dev', ['clean:dev', 'htmllint:dev', 'sass:dev', 'autoprefixer:dev', 'browserSync:dev', 'watch']);
    grunt.registerTask('dist', ['clean', 'sass:dist', 'autoprefixer:dist', 'copy', 'htmlmin', 'htmllint:dist']);

};
