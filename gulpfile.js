//DEFAULT
var path=require('path'),Argv=require('minimist')(process.argv);
//COMMON PACKAGE
var fs=require('fs-extra'),clc=require('cli-color'),extend=require('node.extend');
//REQUIRE PACKAGE
var gulp=require('gulp'),sass=require('gulp-sass'),minifyCss=require('gulp-minify-css'),uglify=require('gulp-uglify'),concat=require('gulp-concat'),include=require('gulp-include');
// REQUIRE DATA
var Package=JSON.parse(fs.readFileSync('package.json'));
// console.log(Package);
// GULP
var rootDevelopment=Package.config.common.development.root;
var rootAssets=path.join(rootDevelopment,Package.config.common.development.assets);
gulp.task('sass', function () {
  return gulp
    .src(path.join(rootAssets,'sass','*([^A-Z0-9-]).scss'))//!([^A-Z0-9-])
    .pipe(sass(
        {
            debugInfo: true,
            lineNumbers: false,
            errLogToConsole: true,
            //sourceComments: 'map',//normal, map
            outputStyle: 'nested'//compressed, compact, expanded, nested
        }
    ).on('error', sass.logError))
    .pipe(gulp.dest(path.join(rootDevelopment,'css')));
});
gulp.task('scripts',function(){
    gulp.src(path.join(rootAssets,'js','*([^A-Z0-9-]).js'))
    // .pipe(concat('all.min.js'))
    .pipe(include().on('error', console.log))
    .pipe(uglify({
        //mangle:false,
        output:{
            beautify: true,
            comments:'license'
        },
        compress:false,
        //outSourceMap: true,
        preserveComments:'license'
    }).on('error', console.log))
    .pipe(gulp.dest(path.join(rootDevelopment,'js')));
});
gulp.task('filesystask',function(){
    gulp.src(path.join(rootAssets,'filesystask','fileSystask.js'))
    .pipe(include())
    .pipe(uglify({
        mangle:false,
        output:{
            beautify: true,
            comments:'license'
        },
        compress:false,
        preserveComments:'license'
    }).on('error', console.log))
    .pipe(concat('fileSystask.min.js'))
    .pipe(gulp.dest(path.join(rootAssets,'filesystask')));
});
gulp.task('jstest',function(){
    gulp.src(path.join(rootAssets,'jstest','*([^A-Z0-9-]).js'))
    .pipe(include())
    .pipe(uglify({
        mangle:false,
        output:{
            beautify: true,
            comments:'license'
        },
        compress:false,
        preserveComments:'license'
    }))
    //.pipe(concat('all.min.js'))
    .pipe(gulp.dest(path.join(rootAssets,'output')));
});
//WATCH
gulp.task('watch', function() {
    gulp.watch(path.join(rootAssets,'sass','*.scss'), ['sass']);
    gulp.watch(path.join(rootAssets,'js','*.js'), ['scripts']);
    gulp.watch(path.join(rootAssets,'filesystask','*.js'), ['filesystask']);
});
//TASK
gulp.task('default', ['watch']);