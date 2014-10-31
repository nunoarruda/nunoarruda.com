/*global module*/
module.exports = function (grunt) {
    'use strict';
    
    // config plugins
    grunt.initConfig({
        
        sass: {
            dev: {
                options: {
                    style: 'expanded'
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
            sass: {
                files: ['dev/styles/main.scss'],
                tasks: ['sass', 'autoprefixer']
            }
        }
        
    });
    
    // load plugins
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // setup tasks
    grunt.registerTask('dev', ['sass:dev', 'autoprefixer', 'connect:server', 'watch']);

};