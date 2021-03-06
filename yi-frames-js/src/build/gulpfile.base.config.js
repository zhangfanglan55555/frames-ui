const app={
    src:`../src`,
    dist:`../dist`
};
const base={
    scss:{
        src:`${app.src}/scss/**/*.scss`,
        dist:`${app.dist}/css`,
        msg:{
            notice:`CSS编译并整合完成`,
            err:`sass编译错误`
        },
    },
    pug:{
        src:`${app.src}/pug/**/*.pug`,
        utilsrc:`!${app.src}/pug/_*/*.pug`,
        dist:`${app.dist}/html`, 
        msg:{
            notice:`HTML编译并整合完成`,
            err:`pug编译错误`
        }
    },
    img:{
        src:[
            `${app.src}/images/**/*.png`,
            `${app.src}/images/**/*.jpg`,
            `${app.src}/images/**/*.gif`,
            `${app.src}/images/**/*.svg`
        ],
        dist:`${app.dist}/images`,
        msg:{
            notice:`images未被压缩但转换完成`,
            err:`image并没有转换成功`
        }
    },
    js:{
        src:`${app.src}/js/conf/*.js`,
        dist:`${app.dist}/js/conf`,
        msg:{
            notice:`webpack整合JS完成`,
            err:`webpack编译错误`
        }
    }
};
module.exports={
    app,
    base
}