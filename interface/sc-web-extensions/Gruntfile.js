module.exports = function (grunt) {
    const exampleDirPath = './example/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            example: {
                src: [exampleDirPath + 'src/*.js'],
                dest: exampleDirPath + 'static/js/example.js'
            },
        },
        copy: {
            exampleJs: {
                cwd: exampleDirPath + 'static/js/',
                src: 'example.js',
                dest: clientJsDirPath + 'example/',
                expand: true,
                flatten: true
            },
            exampleCss: {
                cwd: exampleDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            exampleHtml: {
                cwd: exampleDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            exampleImg: {
                cwd: exampleDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'example/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            exampleJs: {
                files: exampleDirPath + 'src/**',
                tasks: ['concat:example', 'copy:exampleJs'],
            },
            exampleCss: {
                files: exampleDirPath + 'static/css/**',
                tasks: ['copy:exampleCss'],
            },
            exampleHtml: {
                files: [exampleDirPath + 'static/html/**'],
                tasks: ['copy:exampleHtml'],
            },
            exampleImg: {
                files: [exampleDirPath + 'static/images/**'],
                tasks: ['copy:exampleImg'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};
