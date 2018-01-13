/**
 * Created by Bryuhanov_VV on 02.03.2017.
 */
function svodka() {

    var p1 =
        "<table id='svodka_table'>" +
        "<tr class='info'><th class='text-center text-primary'>Параметр</th><th class='text-center text-primary'>Значение</th><th class='text-center text-primary'>Параметр</th><th class='text-center text-primary'>Значение</th></tr>";

    var p2 = "<tr><td>Давление устьевое</td><td class=''><span id=\"svF001\">--</span></td>" +
        "<td>Расход БДТ</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Давление циркуляции</td><td class=''><span id=\"svF002\">--</span></td>" +
        "<td>Расход Расход НУ</td><td class=''><span id=\"svNU\">--</span></td></tr>" +
        "<tr><td>Нагрузка</td><td class=''><span id=\"svF003\">--</span></td>" +
        "<td>Расход АУ</td><td class=''><span id=\"svAU\">--</span></td></tr>" +
        "<tr><td>Глубина</td><td class=''><span id=\"svF004\">--</span></td>" +
        "<td>Суммарный расход БДТ</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Скорость движения трубы</td><td class=''><span id=\"svF005\">--</span></td>" +
        "<td>Суммарный расход НУ</td><td class=''><span id=\"svSumNU\">--</span></td></tr>" +
        "<tr><td>Давление управления превентером</td><td class=''><span>--</span></td>" +
        "<td>Суммарный расход АУ</td><td class=''><span id=\"svSumAU\">--</span></td></tr>";

    var p3 =  "<tr><td>Давление герметизатора №1</td><td class=''><span id=\"svF007\">--</span></td>" +
        "<td>Время наработки оборудывания</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Давление герметизатора №2</td><td class=''><span>--</span></td>" +
        "<td>Максимум нагрузки на инжектор(тянущее)</td><td class=''><span>--</span></td></tr>"+
        "<tr><td>Давление прижима верхних колодок</td><td class=''><span id=\"svF009\">--</span></td>" +
        "<td>Максимум нагрузки на инжектор(толкающее)</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Давление прижима средних колодок</td><td class=''><span id=\"svF010\">--</span></td>" +
        "<td>Глубина 2</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Давление прижима нижних колодок</td><td class=''><span id=\"svF011\">--</span></td>" +
        "<td>Вес погонного метра трубы</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Давление натяжения цепи</td><td class=''><span id=\"svF012\">--</span></td>" +
        "<td>Верхнее значение изменения нагрузки</td><td class=''><span>--</span></td></tr>";

    var p4 = "<tr><td>Давление привода инжектора</td><td class=''><span id=\"svF013\">--</span></td>" +
        "<td>Нижнее значение изменения нагрузки</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Давление привода барабана</td><td class=''><span>--</span></td>" +
        "<td>Предельная скорость изменения нагрузки</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Давление насоса</td><td class=''><span>--</span></td>" +
        "<td>Расчетный вес трубы</td><td class=''><span>--</span></td></tr>" +
        "<tr><td>Датчик легкой трубы</td><td class=''><span>--</span></td>" +
        "<td>Расход кислотная установка</td><td class=''><span id='svF018'>--</span></td></tr>" +
        "<tr><td>Датчик тяжелой трубы</td><td class=''><span>--</span></td>" +
        "<td>Расход кислотная установка накоп.</td><td class=''><span id='svF019'>--</span></td></tr>" +
        "<tr><td>Давление затруба</td><td class=''><span>--</span></td>" +
        "<td>--</td><td class=''><span>--</span></td></tr>"+
    "</table>";


    //console.log(typeof mashin_img_engine_speed_gauge_needle);
    var content = document.getElementById("content_skr");
    content.innerHTML = p1+p2+p3+p4;
    $('#content_skr').show();
    svodkaData();
}


function svodkaData() {
    var JsonObj;
    if (globalData != undefined) {
        var strTmp='';



        JsonObj = replaceData(globalData);
        if(vidQuery!="RivgAjax")if(JsonObj.DU_1==1){updateData('Главное');startMainPage();}
//Проверка связи----------------------------------------------------------------
        if (JsonObj.Timeout_pr1 > 300){
            document.getElementById('svF003').innerHTML = '--';
            document.getElementById('svF001').innerHTML = '--';
            document.getElementById('svF012').innerHTML = '--';
            document.getElementById('svF007').innerHTML = '--';
            document.getElementById('svF005').innerHTML = '--';
            document.getElementById('svF009').innerHTML = '--';
            document.getElementById('svF010').innerHTML = '--';
            document.getElementById('svF011').innerHTML = '--';
            document.getElementById('svF004').innerHTML = '--';
            document.getElementById('svF013').innerHTML = '--';
            document.getElementById('svF002').innerHTML = '--';
            document.getElementById('svNU').innerHTML = '--';
            document.getElementById('svAU').innerHTML = '--';
            document.getElementById('svSumNU').innerHTML = '--';
            document.getElementById('svSumAU').innerHTML = '--';
            document.getElementById('svF018').innerHTML = '--';
            document.getElementById('svF019').innerHTML = '--';

        }
        else{
//**********************************************************************************************************************
//**********************************************************************************************************************
            if($("span").is("#svF003")) {
                document.getElementById('svF003').innerHTML = Math.round((JsonObj.F003 * 0.1019716212978) * 10);//Вес (Нагрузка)
                document.getElementById('svF001').innerHTML = JsonObj.F001;//Устьевое давление
                document.getElementById('svF012').innerHTML = JsonObj.F012;//JsonObj.F012//Давление натяжения цепи
                document.getElementById('svF007').innerHTML = JsonObj.F007;//JsonObj.F007//Давление герметизатора
                document.getElementById('svF005').innerHTML = JsonObj.F005;//Скорость
                document.getElementById('svF009').innerHTML = JsonObj.F009;//JsonObj.F009//Давление прижима верхних колодок
                document.getElementById('svF010').innerHTML = JsonObj.F010;//JsonObj.F010//Давление прижима средних колодок
                document.getElementById('svF004').innerHTML = Math.round(JsonObj.F004);//Глубина
                document.getElementById('svF013').innerHTML = JsonObj.F013;//JsonObj.F013//Давление привода инжектора
                document.getElementById('svF002').innerHTML = JsonObj.F002;//Давление циркуляции
                document.getElementById('svF011').innerHTML = JsonObj.F011;//JsonObj.F011//Давление прижима нижних колодок

                document.getElementById('svNU').innerHTML = JsonObj.F014;//F014 хатоллер
                document.getElementById('svSumNU').innerHTML = JsonObj.F016;//F016 хатоллер накопительный
                document.getElementById('svAU').innerHTML = JsonObj.F015;//F015 азотка
                document.getElementById('svSumAU').innerHTML = JsonObj.F017;//F017 азотка накопительный

                document.getElementById('svF018').innerHTML = JsonObj.F018;//F017 кислотная установка
                document.getElementById('svF019').innerHTML = JsonObj.F019;//F017 кислотная установка накопительный
            }
        }
    }
    $('#F000').text(JsonObj.F000);//Дата с архива
    timerStop[1] = setTimeout(svodkaData, timeOut);

}