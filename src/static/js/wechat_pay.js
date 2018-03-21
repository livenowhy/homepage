;(function($){
    $(document).ready(function(){
        function init(){
            bindEvent();
            forloop();//轮询请求  判断此订单是否支付成功
        }
        function bindEvent(){
            $("#show_more").on("click",function(){
                if(!$(this).hasClass("open")){
                    $(this).addClass("open");
                    var h=$(".order_main").css("height","auto").height();
                    console.log(h);
                    $(".order_main").animate({"height":h},600);
                    $(".order_status").animate({"height":h},600);
                }else{
                    $(this).removeClass("open");
                    $(".order_main").animate({"height":140},600);
                    $(".order_status").animate({"height":140},600);
                }
            })
            var payment = $("#wechat_qrcode").attr("value");
            $("#wechat_qrcode").qrcode({width: 298, height: 298, text: payment});
        }
        function forloop(){
            //前5分钟没5秒请求一次，之后没30秒请求一次;
            var order_id=$("#show_more").data("order_id");
            var url = '/api/v5/orders/'+order_id;
            var time=0;
            var loop=setInterval(function(){
                access_server(url,'',successFn,'','','get');
                time+=5;
                //时间超过5分钟，变为30秒请求一次
                if(time>300){slowloop();}
            },5000);
            function successFn(data){
                console.log(data);
                if(data.data.order_status!=0){
                    if(data.data.order_amount*1>299 && data.time > 1504490400){
                        location.href='/promotion/luckjob?success=success';// 299 抽检 双十一过后;
                    }else{
                        location.href='/order/'+order_id+'/payment';//双十一过后;
                    }
                }
            }
            //30秒请求 函数
            function slowloop(){
                clearInterval(loop);
                setInterval(function(){
                    console.log("slow");
                    access_server(url,'',successFn,'','','get');
                },30000);
            }
        }
        init();

    })
})(jQuery)
