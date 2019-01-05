// 导入需要的模块
const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

// 默认任务
gulp.task('default', function () {  
    console.log('111');
});

// 压缩css任务
gulp.task('css', function () {  
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// 压缩html
gulp.task('html', function () {  
    gulp.src('src/**/*.html')
        .pipe(htmlMin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS 
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// 压缩js
gulp.task('js', function () {  
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env'] // es6 转 es5
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

// 转移图片
gulp.task('img', function () {  
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
});

// 转移库
gulp.task('libs', function () {  
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
})

// 服务
gulp.task('server', function () {  
    connect.server({
        port: 10000,
        livereload: true,
        root: 'dist'
    })
});

// 监听改变
gulp.task('watch', function () {  
    gulp.watch('src/scss/**/*.scss',['css']);
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/images/**/*',['img']);
});

gulp.task('default', ['html', 'css', 'js', 'server', 'watch', 'img', 'libs'])
