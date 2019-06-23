// 图片的预加载的jQuery插件

// 一般来说js中是没有局部作用域的，所以可以使用 闭包的形式 来模拟一个局部作用域，具体代码入下

// (function(){

// })();

// 以上就形成一个局部作用域，在它里面定义的作用域都是局部的，不会与外面的混淆

(function($){//此处用 $ 来接收，这样就可以再闭包中使用 $ 了
  // 用面向对象的写法
  function Preload(imgs,options){
    this.imgs = (typeof imgs === 'string')? [imgs]: imgs;
    this.opts = $.extend({},Preload.defaults,options)
    if(this.opts.order == 'unordered'){
      this._unordered();//面向对象的方法一般都写在原型上
    }else{
      this._order()
    }
    
  }
  Preload.defaults={
    order:'unordered',
    each:null,//每一张图片加载完毕后执行
    all:null //所有图片加载完毕后执行
  }
  Preload.prototype._order = function(){//有序加载
    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len = imgs.length;
    load();
    function load(){
      var imgObj = new Image();
      $(imgObj).on('load error',function(){
        opts.each && opts.each(count);
        if(count>=len){
          opts.all && opts.all()
        }else{
          load()
        }
        count++
      })
      imgObj.src = imgs[count]
    }
  }
  Preload.prototype._unordered = function () {//无序加载
    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len = imgs.length;
    $.each(imgs, function(i,src){
      if(typeof src != 'string') return;
      var imgObj = new Image();
      $(imgObj).on('load error',function(){

        opts.each && opts.each(count);

        if(count >= len - 1){
          opts.all && opts.all()
        }
        count++
      })
      imgObj.src = src
    })
  }
  $.extend({
    Preload:function(imgs,opts){
      new Preload(imgs,opts);
    }
  })
})(jQuery);//在这里传入jQuery

