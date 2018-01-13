/**
 * Created by Bryuhanov_VV on 16.11.2016.
 */
function menu() {
    //if(!$("td").is("#I_min_kn1_pr1")) return false;

    var page1 =

            "<style>#menuTable th{text-align: center;}#menuTable td{text-align: center;line-height: 40px;}</style>"+
            "<table id='menuTable' class='table table-bordered table-condensed' style='color: white;'>" +
                "<caption style='text-align: center;'>Настройка ADAM</caption>"+
		    "<tr>" +
                "<th>---</th><th>Нагрузка</th><th>Н.цепи</th><th>Прижим в.</th><th>Прижим с.</th><th>Инжектор</th><th>Устьевое</th><th>Циркуляция</th><th>Герметизатор 1</th>" +
            "</tr>" +
                "<tr><th>---</th><th>Адам канал 0</th><th>Адам канал 1</th><th>Адам канал 2</th><th>Адам канал 3</th><th>Адам канал 4</th><th>Адам канал 5</th><th>Адам канал 6</th><th>Адам канал 7</th></tr>" +
                "<tr>" +
                    "<td>ток</td><td id='Adam_kn1_pr1'></td><td id='Adam_kn2_pr1'></td><td id='Adam_kn3_pr1'></td>" +
                    "<td id='Adam_kn4_pr1'></td><td id='Adam_kn5_pr1'></td><td id='Adam_kn6_pr1'></td>" +
                    "<td id='Adam_kn7_pr1'></td><td id='Adam_kn8_pr1'></td>" +
                "</tr>" +
             //ADAM минимальный предел
                "<tr><td>мин</td>" +
                    "<td  class='updateInfo' id='I_min_kn1_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_min_kn2_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_min_kn3_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_min_kn4_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_min_kn5_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_min_kn6_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_min_kn7_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_min_kn8_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                 "</tr>" +
            //ADAM максимальный предел
                "<tr><td>макс</td>" +
                    "<td  class='updateInfo' id='I_max_kn1_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_max_kn2_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_max_kn3_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_max_kn4_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_max_kn5_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_max_kn6_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_max_kn7_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                    "<td  class='updateInfo' id='I_max_kn8_pr1'  onclick='globalID =this.id;open_GL();'></td>" +
                "</tr>" +
                // "<tr><td colspan='8' class='updateInfo' onclick='menu();'>Обновить</td></tr>"+
            "</table>";


    // var page2 =
    //     "<style>#menuTable1 td{text-align: center;}</style>"+
    //         "<table id='menuTable1' class='table table-bordered table-condensed' style='color: white;'>" +
    //             "<caption style='text-align: center;'>Настройка веса</caption>"+
    //             "<tr><td>Сброс веса на 0</td><td><input class='btn btn-info' type='button' value='Сбросить на 0' style='width: 200px;' onclick='saveSetRivg(0)'></td><td><input class='btn btn-info' type='button' value='Заводские настройки' style='width: 200px;' onclick='saveSetRivg(1)'></td></tr>" +
    //             "<tr><td>Установка глубины</td><td><input id='Dat_gl' name='Dat_gl' type='number' style='text-align: center; width: 100px;  font-size: 20pt; background: transparent;border: none;outline: none;' value='0'>метр</td><td><input class='btn btn-info' type='button' value='Установка глубины' style='width: 200px;' onclick='saveSetRivg(2)'></td></tr>" +
    //             "<tr><td>Установка на аларм разгрузки</td><td><input id='Ust_Ves' name='Ust_Ves' type='number' placeholder='число' style='text-align: center; width: 100px;  font-size: 20pt; background: transparent;border: none;outline: none;' min='0' max='30' oninput='limit(this,0)'>тонн</td><td><input class='btn btn-info' type='button' value='Аларм разгрузки' style='width: 200px;' onclick='saveSetRivg(3)'></td></tr>" +
    //             "<tr><td>Установка на аларм затяжки</td><td><input id='Ust_Ves_zat' name='Ust_Ves_zat' type='number' placeholder='число' style='text-align: center; width: 100px; font-size: 20pt; background: transparent;border: none;outline: none;' min='-30' max='30' oninput='limit(this,1)'>тонн</td><td><input class='btn btn-info' type='button' value='Аларм затяжки' style='width: 200px;' onclick='saveSetRivg(4)'></td></tr>"+
    //         "</table>";
    var page2 =
        "<style>#menuTable1 td{text-align: center;line-height: 30px;}</style>"+
        "<table id='menuTable1' class='table table-bordered table-condensed' style='color: white;'>" +
            "<caption style='text-align: center;'>Настройка веса</caption>"+
            "<tr><td class='updateInfo' onclick='saveSetRivg(0)'>Сброс на 0</td><td class='updateInfo' onclick='saveSetRivg(1);menu();'>Заводские настройки</td></tr>" +
            "<tr><td id='Dat_gl'></td><td class='updateInfo' onclick='globalID =\"Dat_gl\";open_GL();'>Установка глубины</td></tr>" +
            "<tr><td id='Ust_Ves'></td><td class='updateInfo' onclick='globalID =\"Ust_Ves\";open_GL();'>Установка на аларм разгрузки</td></tr>" +
            "<tr><td id='Ust_Ves_zat'></td><td class='updateInfo' onclick='globalID =\"Ust_Ves_zat\";open_GL();'>Установка на аларм затяжки</td></tr>"+
        "</table>";


    var page3 =
        "<style>#menuTable1 td{text-align: center;}</style>"+
        "<table id='menuTable2' class='table table-bordered table-condensed' style='color: white;'>" +
            "<caption style='text-align: center;'>Данные Windows</caption>"+
            "<tr><td>Размер диска С</td><td id='Hard_C_size'></td><td>Оставшееся место на диске С</td><td id='Hard_C_free'></td></tr>" +
            //"<tr><td>Размер диска D</td><td id='Hard_D_size'></td><td>Оставшееся место на диске D</td><td id='Hard_D_free'></td></tr>" +
            "<tr><td colspan='2'>Занимаемая память процессом Rivg</td><td colspan='2'  id='P_proc'></td></tr>" +
        "</table>";


        //console.log(typeof mashin_img_engine_speed_gauge_needle);


        $("#content_skr").html(page1+page2+page3).show();

        updateDataTable();

}

function updateDataTable() {
    var JsonObj = replaceData(globalData);
    //console.log(JsonObj);
    jQuery.each(JsonObj, function (key, value) {
        // if (key.indexOf("I_") != -1)
        //$("#"+key).val(value);
        $("#"+key).html(value);
        //console.log(key.lastIndexOf("F004"));

        if(key==="F004") $("#Dat_gl").html(value);
        if(vidQuery!="RivgAjax")if(key==="DU_1") if(value==1){updateData('Главное');startMainPage();}
        if(key.indexOf("Hard_")!=-1)
            $("#"+key).html(Math.round(value / 1024 /1024 *1000)/1000 + ' мегабайт');
        if(key.indexOf("P_proc")!=-1)
            $("#"+key).html(Math.round(value / 1024 /1024 *1000)/1000 + ' мегабайт');

    });


    timerStop[4] = setTimeout(updateDataTable, timeOut);
}

//
// function saveAdamValue() {
//     var strToRivg ='';
//    $("#menuTable").find('input').each(function () {
//        strToRivg = strToRivg + 'SetChenjPer(['+this.id+']////'+this.value+');';
//    });
//     //console.log(strToRivg);
//     $.ajax({
//         type: "POST",
//         url: 'http://' + iprivg,
//         data: 'RivgCodeinterpreter('+strToRivg+')EndCode;',
//         dataType: "text",
//         cache: false,
//         //contentType: "application/json",
//         success: function (data) {
//             //  console.log(data);
//         },
//
//         error: function(res){
//             console.log("Ошибка отправки! " + res.statusText);
//         }
//     });
// }