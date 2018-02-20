/**
* gulp sass
* gulp script
* gulp test
* gulp watch


asset/
docs/

*/
//DEFAULT
var path=require('path'),Argv=require('minimist')(process.argv);
//COMMON PACKAGE
var fs=require('fs-extra'),clc=require('cli-color'),extend=require('node.extend');
//REQUIRE PACKAGE
var gulp=require('gulp'),sass=require('gulp-sass'),minifyCss=require('gulp-clean-css'),
uglify=require('gulp-uglify'),concat=require('gulp-concat'),include=require('gulp-include');
// REQUIRE DATA
var Package=JSON.parse(fs.readFileSync('package.json'));
// GULP
var configAssetRoot=Package.config.common.asset.root;
var configPublicRoot=Package.config.common.public.root;

var rootAsset=path.join(configAssetRoot);
var rootPublic=path.join(configPublicRoot);
var scriptiveRoot=path.join('../scriptive');
var scriptiveScript=path.join(scriptiveRoot,rootAsset,'script');
var scriptiveStyle=path.join(scriptiveRoot,rootAsset,'style');

var style = {
  normal:{
    sass:{
      debugInfo: false,
      lineNumbers: true,
      errLogToConsole: true,
      outputStyle: 'nested' //compact, expanded, nested, compressed,
    },
    js:{
      mangle:false,
      output:{
          beautify: true
          // comments:'license'
      },
      compress:false
      //outSourceMap: true
    }
  },
  compressed:{
    sass:{
      debugInfo: true,
      lineNumbers: false,
      errLogToConsole: true,
      outputStyle: 'compressed'
    },
    js:{
      mangle:true,
      compress:true,
      output:{
        // beautify: true,
        comments:false
      }
    }
  },
};

var codeStyle = Argv.style;
if (codeStyle && style[codeStyle]) {
  codeStyle = style[codeStyle];
} else {
  codeStyle=style.compressed;
}
// NOTE: SASS
gulp.task('style', function () {
  return gulp.src(path.join(rootAsset,'style','*([^A-Z0-9-]).scss'))//!([^A-Z0-9-])
    .pipe(sass(codeStyle.sass).on('error', sass.logError))
    .pipe(gulp.dest(path.join(rootPublic,'css')));
});
// NOTE: SCRIPT
gulp.task('script',function(){
    return gulp.src(path.join(rootAsset,'script','*([^A-Z0-9-]).js'))
    //.pipe(concat('all.min.js'))
    .pipe(include().on('error', console.log))
    .pipe(uglify(codeStyle.js).on('error', console.log))
    .pipe(gulp.dest(path.join(rootPublic,'js')));
});
// NOTE: SCRIPTIVE
gulp.task('scriptive:script',function(){
    return gulp.src(path.join(scriptiveScript,'*([^A-Z0-9-]).js'))
    .pipe(include().on('error', console.log))
    // .pipe(uglify(style.compressed.js).on('error', console.log))
    // .pipe(concat('scriptive.min.js'))
    // .pipe(gulp.dest(path.join(scriptiveRoot,'js')))
    .pipe(uglify(codeStyle.js).on('error', console.log))
    .pipe(gulp.dest(path.join(rootPublic,'js')));
});

gulp.task('scriptive:style',function(){
    return gulp.src(path.join(scriptiveStyle,'*([^A-Z0-9-]).scss'))
    // .pipe(sass(style.compressed.sass).on('error', sass.logError))
    // .pipe(concat('scriptive.min.css'))
    // .pipe(gulp.dest(path.join(scriptiveRoot,'css')))
    .pipe(sass(codeStyle.sass).on('error', sass.logError))
    .pipe(gulp.dest(path.join(rootPublic,'css')));
});
// gulp.task('scriptive:tmp',function(){
//     return gulp.src(path.join(rootAsset,'scriptive','*([^A-Z0-9-]).js'))
//     .pipe(include().on('error', console.log))
//     .pipe(uglify(codeStyle.js).on('error', console.log))
//     .pipe(gulp.dest(path.join(rootPublic,'js')));
// });
// NOTE: WATCH
gulp.task('watch', function() {
  // echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
    gulp.watch(path.join(rootAsset,'style','*.scss'), ['style']);
    gulp.watch(path.join(rootAsset,'script','*.js'), ['script']);
    // gulp.watch(path.join(rootAsset,'scriptive','*.js'), ['scriptive:tmp']);
    gulp.watch(path.join(scriptiveScript,'*.js'), ['scriptive:script']);
    gulp.watch(path.join(scriptiveStyle,'*.scss'), ['scriptive:style']);
});

// NOTE: TASK
gulp.task('default', ['watch']);
