/*  @title : NMG FE WorkFlow For HTD
 *  @description : Just a fucking JS file for HTD
 *  @author : GeBi Lao Wang （An Old Driver）
 *  @Date : 2016-11-11
 */
var gulp          = require('gulp'),
    browserSync   = require('browser-sync').create()
    uglify        = require('gulp-uglify'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    reload        = browserSync.reload,
    config        = require('./config.json'),
    plumber       = require('gulp-plumber');

// 代理
// gulp.task('server', ()=> {
//     browserSync.init({
//         proxy: "域名orIP"
//     });
// });

// 初始化静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], ()=> {
    browserSync.init({
        server: config.server_path
    });
    gulp.watch(config.src.sass_path + '*.scss', ['sass']);
    gulp.watch(config.src.html_path + '*.html').on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', ()=> {
    return gulp.src(config.src.sass_path + '*.scss')
        .pipe(plumber({
            errorHandler: function(err) {
            console.log(err);
            this.emit('end') }
        }))
        .pipe(autoprefixer({browsers: ['last 5 version']}))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest(config.src.css_path))
        .pipe(reload({stream: true}));
});

//压缩javascript 文件，压缩后文件放入build/js下   
gulp.task('minifyjs', ()=> {
    gulp.src(config.src.js_path + '*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
});


//默认任务
gulp.task('default',['serve'], ()=> {
  console.log('The workflow of HTD is running! (Enjoy fucking HTD)');
});

// 最终构建任务
gulp.task('bulid', ['minifyjs']);










