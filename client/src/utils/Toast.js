


export default window.alert = function (msg) {

    var div = document.createElement("div");
    div.innerHTML = `
    <style type="text/css">
    #toast{
        position: absolute;
        display: none;
        left: 50%;
        top: 50%;
        z-index: 9999;
        margin: auto;
        padding: 16px 8px;
        transform: translate(-50%,-50%);
        min-width: 120px;
        min-height: 25px;
        line-height: 25px;
        border-radius: 5px;
        text-align: center;
        color: #fff;
        background-color: rgb(0, 0, 0, 0.5);
    }
    </style>
    `;
    document.body.appendChild(div);

    var toast = {
        hideTimeout: null,
        init: function () {
            var toastNode = document.createElement('div');
            toastNode.innerHTML = '<span class="text">默认提示</span>';//设置HTML模板，可以根据需求设计
            toastNode.id = 'toast';//设置id，一个页面有且仅有一个toast
            toastNode.setAttribute('class', 'toast');// 设置类名，如果有必要的话
            toastNode.style.display = 'none';//设置隐藏，默认隐藏
            document.body.appendChild(toastNode);//添加到body下面
        },
        show: function (text) {
            if (this.hideTimeout) {//判断当前是否有弹出框，有的话先关闭当前
                clearTimeout(this.hideTimeOut);
                this.hideTimeOut = null;
            }
            if (!text) {//判断传入提示文本是否为空，是的话返回
                console.log('text为空');
                return;
            }
            var toastNode = document.getElementById('toast');
            if (!toastNode) {//判断toast是否初始化
                console.log('未初始化');
                return;
            }
            var toastText = toastNode.querySelector('.text');
            toastText.innerHTML = text || '';//找到toast设置显示文本
            toastNode.style.display = 'block';//设置toast为显示状态
            this.hideTimeout = setTimeout(function () {//timeout设置多久后隐藏
                toastNode.style.display = 'none';
                toast.hideTimeout = null;
            }, 2000);
        },
        hide: function () {
            if (this.hideTimeout) {//如果当前存在toast，就关闭当前toast
                clearTimeout(this.hideTimeOut);
                this.hideTimeOut = null;
            }
            var toastNode = document.getElementById('toast');
            if (toastNode) {
                toastNode.style.display = 'none';//移除toastDOM
                document.body.removeChild(toastNode);
            }
        }
    }

    function myFun() {
        toast.init();
        toast.show(msg);
        setTimeout(toast.hide, 2000);
    }

    myFun();
}