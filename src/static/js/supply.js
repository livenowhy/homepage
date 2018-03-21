;(function($){
    $(document).ready(function(){
        //加入购物袋
        $("#activity_goods_list").on("click",".add_shoppingBag",function(){
            // console.log($(this).data("product_id"),$(this).data("goods_id"));
            var product_id=$(this).data("product_id"),
                token=getCookie("_ujp_access_token");
            data={
                    "product_id":product_id,
                    "count":1
                }
            if(!token){
                getSession();
            }else{
                access_server("/api/v4/cart/products",data,successFn,"","","POST");
            }
            function successFn(data){
                if(data.status_code==200){
                    showSDialog("加入购物袋成功");
                    if($("#shop_good_num").length!=1){
                        $("#shopping_bag>a").append($("<b id='shop_good_num'></b>"))
                    }
                    if($("#shop_good_num").text()){
                        var n=$("#shop_good_num").text()*1;
                        $("#shop_good_num").text(++n);
                    }else{
                        $("#shop_good_num").text(1);
                    }
                }else if(data.status_code==1207){
                    showSDialog(data.message);
                }
            }
            //获取sesson
            function getSession(){
                access_server("/api/v4/cart/sessions","",succ,"","","GET");
                function succ(datas){
                    if(datas.status_code==200){
                        if(!getCookie("session")){
                            setCookie("session",datas.data["session"],10)
                            s=datas.data["session"];
                            data.session=datas.data["session"];
                        }else{
                            data.session=getCookie("session");
                        }
                        access_server("/api/v4/cart/products",data,successFn,"","","POST");
                    }
                }
            }
        })
        //领券
        $("#lq").on("click",function(){
            if($(this).hasClass("off")) return false;
            promotion('1061');
        })
        function promotion(code) {
            if(!getCookie("_ujp_access_token")){
                showSDialog('您未登录,登录后才能领券');
                window.location.href = "http://www.ujipin.com/user/register?callback=%2fsugou";
            } else {
                // access_server('',)
                $.ajax({
                    url: '/api/v4/promotions/'+code,
                    type: "post",
                    dataType: "json",
                    headers: {"Authorization": "Bearer " +getCookie("_ujp_access_token")},
                    success: function(data) {
                        if (data.status_code == 200) {
                            showSDialog("优惠券已放入您的账户中！");
                            $("#lq").addClass("off");
                            $("#lq").html("已领取");
                        } else if (data.status_code == 2402) {
                            showSDialog("尊敬的用户，您已参加过本次活动！");
                            $("#lq").addClass("off");
                            $("#lq").html("已领取");
                        }
                    },
                });
            }
        }
    })
})(jQuery)