define(['zepto', 'fastclick'], function($, fc ) {
  fc.attach(document.body);

  var exports = {};

  exports.init = function(config){
    this.config = this.config || config;
    exports.bindEvents();
    //exports.winCtrl();
    exports.chooseNum();
    exports.proSlideDelete();
    exports.giftSlideDelete();
    exports.pickFruit();
    exports.winShow();
    exports.addCount();
  }

  exports.bindEvents = function(){

    //领取赠品
    $('.content_wrap .sale_mod').on('click', '.get_gift', function(){
      var _this = $(this),
        _contWrap = _this.parents('.content_wrap');
      if(!_contWrap.find('.slide_product_List').hasClass('block')){
        _contWrap.find('.slide_product_List').addClass('block');
        _this.text('[已领取]');
        _this.removeClass('get_gift').addClass('has_get');
      }else{
        // _contWrap.find('.slide_product_List').removeClass('block');
      }
    });

    //开启弹框
    var popBox= $('.pop_box'), // 弹窗
      closeBtn = $('.pop_box .close'); // 关闭弹窗按钮
    $('.pop_box').on('click', function(e) {
      var target = e.target;
      if ($(target).hasClass('pop_box'))
        popBox.hide();
    });
    closeBtn.on('click',function(){
      popBox.hide();
    });
  };


  exports.chooseNum = function(){
    var $buyNum = $('.buy_num'),
      $numReduce = $buyNum.find('.num_reduce'),
      $numAdd = $buyNum.find('.num_add'),
      $numBox = $buyNum.find('.num_box');

    $buyNum.on('click' , 'span' , function(){
      var _this = $(this),
        $parentBox = _this.parent('.buy_num'),
        $numBox = $parentBox.find('.num_box'),
        _dataMin = parseInt($numBox.attr('data-min')),
        _dataMax = parseInt($numBox.attr('data-max')),
        _numValue = parseInt($numBox.attr('value'));


      if(_this.hasClass('num_reduce') && !(_this.hasClass('disable'))){

        if(_numValue == _dataMin+1){
          _this.addClass('disable');
        }
        $numBox.val(_numValue-1);
        $parentBox.find('.num_add').removeClass('disable');


      }else if(_this.hasClass('num_add') && !(_this.hasClass('disable'))){

        if(_numValue == _dataMax-1){
          _this.addClass('disable');
        }
        $numBox.val(_numValue+1);
        $parentBox.find('.num_reduce').removeClass('disable');
      }
    });
  };
  exports.proSlideDelete=function(){
    var $slide_pro=$('.pkg_prodlist_tit');
    var startPosition, endPosition, moveLength;  
        $slide_pro.bind('touchstart', function(e){  
           console.log(1)
        // e.preventDefault();
        var touch = e.touches[0];  
        startPosition = {  
            x: touch.pageX 
        }
    }).bind('touchmove', function(e){  
        console.log(2)
        e.preventDefault();
        var touch = e.touches[0];  
        endPosition = {  
            x: touch.pageX
        };  
        moveLength = endPosition.x - startPosition.x;
        console.log(moveLength)
        if(moveLength<0&&Math.abs(moveLength)>30){
          $(this).addClass('slide_left').removeClass('slide_right');
        }else if(moveLength>0&&Math.abs(moveLength)>30){
          $(this).addClass('slide_right').removeClass('slide_left');
        }
    });
    $('.slide_to_delete').on('click',function(){
      var $itemLink=$(this).parents('.itemLink');
      // console.log($itemLink)
      // $itemLink.remove();
    })
  };
  // 赠品滑动删除
  exports.giftSlideDelete=function(){
    var $slide_pro=$('.pkg_prodlist_gift_wrap');
    var startPosition, endPosition, moveLength;  
        $slide_pro.bind('touchstart', function(e){  
           console.log(1)
        // e.preventDefault();
        var touch = e.touches[0];  
        startPosition = {  
            x: touch.pageX 
        }
    }).bind('touchmove', function(e){  
        console.log(2)
        // e.preventDefault();
        var touch = e.touches[0];  
        endPosition = {  
            x: touch.pageX
        };  
        moveLength = endPosition.x - startPosition.x;
        console.log(moveLength)
        if(moveLength<0&&Math.abs(moveLength)>30){
          $(this).addClass('slide_left').removeClass('slide_right');
        }else if(moveLength>0&&Math.abs(moveLength)>30){
          $(this).addClass('slide_right').removeClass('slide_left');
        }
    });
    $('.slide_to_delete').on('click',function(){
      var $itemLink=$(this).parents('.itemLink');
      // console.log($itemLink)
      // $itemLink.remove();
    })
  };
  exports.addCount=function(){
     // 数量加减
    var $btnMinus = $('.pd_product-num-minus'),
        $resultVal = $('.pd_product-num-form'),
        $btnPlus = $('.pd_product-num-plus'),
        _numResult = 0;
    // +
    $btnPlus.on('click',function(){
        // 海购弹窗
        if($(this).hasClass('js-shopAbroad_btn')){
            $('.pop-shopAbroad').addClass('show');
            return false;
        }
        _numResult = parseInt($resultVal.val())+1;
        if(_numResult > 1){
            $resultVal.val(_numResult);
            $btnMinus.removeClass('pd_product-num_disable');
        }
    });
    // -
    $btnMinus.on('click',function(){
        if(!$(this).hasClass('pd_product-num_disable')){
            _numResult = parseInt($resultVal.val())-1;
            $resultVal.val(_numResult);
            if(_numResult == 1){
                $btnMinus.addClass('pd_product-num_disable');
            }
        }
    });

  }
  // 弹层水果部分
  exports.pickFruit =function(){
    var pick = $('.down_one');
    var num=0;
     var pick_three=$('.down_three');
    var pick_two=$('.down_two');
    pick.click(function(event){
       if(num==0){
           num=1;
           pick.addClass("animate");
          $('.ceraty').show();      
       } else if(num ==1){
           num=0;         
           pick.removeClass("animate");
           $('.ceraty').hide();
       }
     
    });
     pick_three.click(function(event){
       if(num==0){
           num=1;
             pick_three.addClass("animate");
             $('.ceraty_three').show();      
       } else if(num ==1){
          num=0;         
           pick_three.removeClass("animate");
           $('.ceraty_three').hide();
       }
     
    });
     pick_two.click(function(event){
       if(num==0){
           num=1;
             pick_two.addClass("animate");
             $('.ceraty_two').show();      
       } else if(num ==1){
          num=0;         
           pick_two.removeClass("animate");
           $('.ceraty_two').hide();
       }
     
    });

  };
  //弹层的点击显示和隐藏
  exports.winShow = function(){
    // 换购商品
    var for_freebtn =$(".has_join");
    for_freebtn.click(function(){
      var num=Math.random()*1;
      if(num<0.5){
        $('.pop_back').show();
      }else{
        $('.pop_back_give').show();
      }
    });
    var icon_error=$(".icon_error");
    icon_error.click(function(){
      $('.pop_back').hide();
    });
     var error_one=$(".error_one");
    error_one.click(function(){
      $('.pop_back_give').hide();
    });
   // 领取优惠券弹层
     var pkg_tags=$(".for_freebtn");
     pkg_tags.click(function(){
      var num=Math.random()*1;
      if(num<0.5){
        $('.pop_back_ticket').show();
      }else{
        $('.pop_back_empty').show();
      }
     });
     var error_two=$(".error_two");
      error_two.click(function(){
      $('.pop_back_ticket').hide();
    });
      var error_four=$(".error_four");
      error_four.click(function(){
      $('.pop_back_empty').hide();
    });
    // 修改促销弹层
    var tomorrow=$('.change_coupon');
    tomorrow.click(function(){
     $('.pop_back_discount').show();
    });
    var error_five=$(".error_five");
      error_five.click(function(){
      $('.pop_back_discount').hide();
    });
    //商详页
    var giveaway=$('.desc span');
    giveaway.click(function(){
       $('.pop_back_detail').show();
    });
    var icon_error_detail=$(".icon_error_detail");
    icon_error_detail.click(function(){
         $('.pop_back_detail').hide();
    });

  };

  return exports;
});
