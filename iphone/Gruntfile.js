"use strict";

module.exports = function( grunt ) {

    grunt.initConfig({

        // Config variable paths
        config: {

            // Project paths
            dev: 'assets/',
            build: 'build/'
        },

        // IMAGES _____________________________________________________________________

        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }, {
                    convertPathData: { 
                        straightCurves: false
                    }
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dev %>img',
                    src: ['*.svg'],
                    dest: '<%= config.build %>img',
                    ext: '.svg'
                }]
            }
        },

        svg2png: {
            all: {
                files: [{
                    cwd: '<%= config.dev %>img/',
                    src: ['*.svg'],
                    dest: '<%= config.build %>img/'
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dev %>img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: '<%= config.build %>img'
                }]
            }
        },

        sprite:{
            all: {
                src: '<%= config.dev %>img/sprite/*.png',
                destImg: '<%= config.build %>img/sprite/sprite.png',
                destCSS: '<%= config.dev %>scss/molecules/icons.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                cssTemplate: '<%= config.dev %>scss/molecules/icons.mustache'
            }
        },

        // SASS _______________________________________________________________________
        sass: {

            // Dev
            dev: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: {
                    '<%= config.build %>css/main.min.css': 
                    '<%= config.dev %>scss/main.scss'
                }
            }
        },

        // UGLIFY _____________________________________________________________________
        uglify: {

            // Project files
            dev: {
                files: {
                    '<%= config.build %>js/scripts.min.js': 
                    [
                        'components/countUp.js/countUp.js',
                        '<%= config.dev %>js/scripts.js'
                    ]
                }
            },

            // Start files
            modernizr: {
                src: 'components/modernizr/modernizr.js',
                dest: '<%= config.build %>js/libs/modernizr.min.js'
            },

            jquery: {
                src: 'components/jquery/jquery.min.js',
                dest: '<%= config.build %>js/libs/jquery.min.js'
            },

            respond: {
                src: 'components/respond/dest/respond.min.js',
                dest: '<%= config.build %>js/libs/respond.min.js'
            }
        },

        // JSHINT _____________________________________________________________________
        jshint: {

            // Project files
            dev: ['<%= config.dev %>js/scripts.js'],
                options: {
                    globals: {
                        jQuery: true,
                        reporter: require('jshint-stylish')
                }
            }

        },


        // WATCH ______________________________________________________________________
        watch: {

            // PROJECT TASKS

            // Run SASS task for .scss files
            sass_dev: {
                files: [
                    '<%= config.dev %>scss/**/*.scss',
                    '<%= config.dev %>scss/*.scss'
                ],
                tasks: ['sass:dev'],
            },

            // Run Uglify task when scripts are modified
            scripts_dev: {
                files: ['<%= config.dev %>js/scripts.js'],
                tasks: ['jshint:dev', 'uglify:dev'],
            },

            svg: {
                files: ['<%= config.dev %>img/*.svg'],
                tasks: ['svgmin', 'svg2png']
            },

            images: {
                files: ['<%= config.dev %>img/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },

            sprite: {
                files: ['<%= config.dev %>img/sprite/*.png'],
                tasks: ['sprite']  
            },

            // Update :)
            livereload: {
                options: { livereload: true },
                files: [
                    // Project files
                    '*.php',
                    '*.html',
                    '<%= config.build %>in/*.php',
                    '<%= config.build %>css/main.min.css',
                    '<%= config.build %>js/scripts.min.js',
                    '<%= config.build %>img/*.{png,jpg,gif,svg}',
                    '<%= config.build %>img/sprite/sprite.png'
                ],
            },
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-spritesmith');

    // Grunt tasks

    // Init
    grunt.registerTask( 'init', [ 'uglify:modernizr', 'uglify:jquery', 'uglify:respond' ] );

    // CSS
    grunt.registerTask( 'css', [ 'sass' ] );
    grunt.registerTask( 'css', [ 'sass' ] );

    // JS
    grunt.registerTask( 'js', [ 'jshint', 'uglify' ] );

    // Images
    grunt.registerTask( 'images', [ 'imagemin', 'svgmin', 'svg2png', 'sprite' ] );

    // Watch
    grunt.registerTask( 'live', [ 'watch' ] );

};