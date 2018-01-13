/**
 * Created by Bryuhanov_VV on 16.11.2016.
 */
function trends() {
    var p =
        '<div id="modal_form"><!--Сaмo oкнo-->'+
        '<span id="modal_close">X</span> <!-- Кнoпкa зaкрыть -->'+
        '<!-- Тут любoе сoдержимoе -->'+
        '<div class="cnteiner">'+
        '<!--<div class="col-lg-offset-8 col-md-offset-8 col-sm-offset-8 col-sm-4 col-md-4 col-lg-4">-->'+
        '<div class="col-sm-12 col-md-12 col-lg-12">'+
        '<div class="panel panel-primary">'+
        '<div class="panel-body">'+
        '<li class="list-group-item active"><b>Настройки трендов</b></li>'+
        '<div class="form-group">'+
        '<div id="settings">'+
        '</div>'+
        '</div>'+

        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div id="summa"></div>'+
        '</div>'+
        '<div id="overlay"></div><!-- Пoдлoжкa -->'+
        '<!--****************************************************************************************************************-->'+
        // '<div id="content">'+
        '<div id="content_my" class="demo-container_analise" >'+
        '<div class="demo-placeholder" id="placeholder" style="width: 85%; float: left;"></div>'+
        '<!--<div id="overview" class="demo-placeholder" style="float:right;width:160px; height:125px;"></div>-->'+
        '<p style="float: right;"><a href="#" id="go"><button style="width: 30px;height: 30px; border-radius: 5px; background: linear-gradient(to bottom,#007BB0,#004167);border:none; color: white;"><i style="vertical-align: middle;" class="glyphicon glyphicon-cog" aria-hidden="true"></i></button></a></p>'+
        '<div id="legend" style="width: 15%; float: right; /*border: 1px solid #0974b5;*/ padding-top: 2%; /*white-space: nowrap;*/ "></div>'+
        '<div><label class="cbx-label" for="realTrend"><input type="checkbox" id="realTrend" name="realTrend" checked value="false"/>Авто построение</label></div>'+
        '<div><label class="cbx-label" for="replaceTime">Отображать точек.</label><input type="number" id="replaceTime" value="1800" style="width: 150px;"/></div>'+
        '<div><label class="cbx-label" for="rivgTimeOut">Частота опроса...мс.</label><input type="number" id="rivgTimeOut" value="1000" style="width: 150px;"/></div>'+
        //'<div id="countDot"></div>'+

        '</div>'+
        // '</div>'+


        '<div class="load_page">'+
        'Выполняется запрос...'+
        '<br>'+
        '<img src="js/jsMyFunc/trends/lib/img/ajax-loader.gif" /> <!--картинка индикатора загрузки-->'+
        '<br>'+
        '<b>Подождите</b>'+
        '</div>';

    //console.log(p);

    var content = document.getElementById("content_skr");
    content.innerHTML = p;
    $('#content_skr').show();
    startTrend();
}