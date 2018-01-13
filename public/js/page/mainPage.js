/**
 * Created by Bryuhanov_VV on 15.11.2016.
 */
function startMainPage() {
//**********************************************************************************************************************
//**********************************************************************************************************************
    funcNoMy();
    scrDialog();
    setSVG();
    update_mnemo();

}

var scrDialog = function () {
//**********************************************************************************************************************

//     $("#dialog_resetGL").dialog({
//         autoOpen: false
//     });
    $("#F004").click(function(){
        if(vidQuery != "RivgAjax") {
            globalID ="Dat_gl";
            open_GL();
        }
    });

    $("#resetZeroButton").click(function(){
        if(vidQuery != "RivgAjax") {
        //if(confirm("Произвести сброс на 0?"))
           //open_modal_skr('<div class="cont_wind_skr">Осторожно, сработала отсечка, немедленно включите ручное управление!!!</div><div class="btn_skr">Отключить</div>')
           open_modal_skr('<div class="cont_wind_skr">Данное действие приведет к сбросу глубины и нагрузки на 0. Продолжить?</div><div class="btn_skr" onclick="resetZeroAll();">Да</div> <div class="btn_skr" onclick="close_modal_skr();">Нет</div>')
        }
    });

}
//**********************************************************************************************************************
//**********************************************************************************************************************
//**********************************************************************************************************************
//**********************************************************************************************************************


/*function setF001(i) {$('#F001').text(i);}//Устьевое давление
function setF002(i) {$('#F002').text(i);}//Давление циркуляции
function setF003(i) {$('#F003').text(i);}//Вес (Нагрузка)
function setF004(i) {$('#F004').text(i);}//Глубина
function setF007(i) {$('#F007').text(i);}//Давление герметизатора

function setF009(i) {$('#F009').text(i);}//Давление прижима верхних колодок
function setF010(i) {$('#F010').text(i);}//Давление прижима средних колодок

function setF012(i) {$('#F012').text(i);}//Давление натяжения цепи
function setF013(i) {$('#F013').text(i);}//Давление привода инжектора
function setF014(i) {$('#F014').text(i);}//Давление привода инжектора
function setF015(i) {$('#F015').text(i);}//Давление привода инжектора
function setF018(i) {$('#F018').text(i);}//Давление привода инжектора*/
function update_mnemo() {//SCR_pr1
    var JsonObj;
    
    if($(globalData).length>0){


        JsonObj = replaceData(globalData);

//Проверка связи----------------------------------------------------------------
        if (JsonObj.Timeout_pr1>300){
            $('#F000').text('Нет Связи...');
            $('#F001').text('---');
            $('#F002').text('---');
            $('#F003').text('---');
            $('#F004').text('---');
            $('#F005').text('---');
            $('#F007').text('---');
            $('#F009').text('---');
            $('#F010').text('---');
            $('#F011').text('---');
            $('#F012').text('---');
            $('#F013').text('---');
            $('#F014').text('---');
           // $('#F016').text('---');
            $('#F015').text('---');
           // $('#F017').text('---');
            ('#F018').text('---');

        }
        else{
            if("F003"==="F003")mashine(JsonObj.F003);
            //$('#F003').text(JsonObj.F003);//Вес (Нагрузка)
            //$('#F001').text(JsonObj.F001);//Устьевое давление
            //$('#F012').text(JsonObj.F012);//JsonObj.F012//Давление натяжения цепи
            //$('#F007').text(JsonObj.F007);//JsonObj.F007//Давление герметизатора
              //console.log(JsonObj);
			//JsonObj.F005 = 59.09;
			//JsonObj.F004 = 6000.02;
            if(JsonObj.F005!=undefined){
                if((JsonObj.F005 < 500)&&(JsonObj.F005 >-500)){
                    if (JsonObj.F005 == 0){$('#F005').text(JsonObj.F005);/*Скорость*/$("#arrowDown").hide();$("#arrowUp").hide();}
                    else {
                        if (JsonObj.F005 > 0) {
                            $("#arrowUp").hide();
                            $("#arrowDown").show();
                            $('#F005').html(JsonObj.F005);//Скорость

                        }
                        else{
                            $("#arrowDown").hide();
                            $("#arrowUp").show();
                            $('#F005').html(JsonObj.F005);//Скорость
                        }

                    }
                }else $('#F005').html("0.00");
            }
           // $('#F009').text(JsonObj.F009);//JsonObj.F009//Давление прижима верхних колодок
           // $('#F010').text(JsonObj.F010);//JsonObj.F010//Давление прижима средних колодок

            //$('#F004').text(JsonObj.F004);//Глубина
           // $('#F013').text(JsonObj.F013);//JsonObj.F013//Давление привода инжектора
           // $('#F002').text(JsonObj.F002);//Давление циркуляции
            $('#F000').text(JsonObj.F000);//Дата с архива

            //$('#F011').text(JsonObj.F011);//JsonObj.F011//Давление прижима нижних колодок
            //$('#F014').text(JsonObj.F014);//JsonObj.F011//расход F014 хатоллер , F016 хотойлер н.
            //$('#F015').text(JsonObj.F015);//JsonObj.F011//расход F015 азотка , F017 азотка н.
            //$('#F018').text(JsonObj.F018);//JsonObj.F018 кислотник
            // $('#F016').text(JsonObj.F014+" / "+JsonObj.F016);//JsonObj.F011//расход F014 хатоллер , F016 хотойлер н.
            // $('#F017').text(JsonObj.F015+" / "+JsonObj.F017);//JsonObj.F011//расход F015 азотка , F017 азотка н.
            if(vidQuery!="RivgAjax")
                if(JsonObj.DU_1 == 1){
                    flagWarningWindow=true;
                    open_modal_skr('<div class="cont_wind_skr">ВНИМАНИЕ, превышена нагрузка инжектора!!!</div><div class="btn_skr" style="width: 200px; height: 50px; line-height: 40px; font-size: 20px;" onclick="resetOts()">Отключить</div>')
                }else{
                    if(flagWarningWindow) {
                        close_modal_skr();
                        flagWarningWindow=false;
                    }
            }
        }
    }
    timerStop[2] = setTimeout(update_mnemo, timeOut);
}


// function restart(){
//     location.reload();
// }

function mashine(znach)
{

    if(isNaN(znach))znach=0;
    znach=znach/10;
   // console.log(znach*1);
//**********************************************************************************************************************
//**********************************************************************************************************************
//*************Правильная формула начало********************************************************************************
//**********************************************************************************************************************
    //iMin=исходный минимум
    //iMax=исходный максимум
    //pMin=приведенный минимум
    //pMax=приведенный максимум;
    var iMin=-18, iMax=36, pMin=-134.5, pMax=135;
    var grad =((pMax-(pMin*1))/(iMax-(iMin*1)))*(znach-(iMin*1))+pMin;
//**********************************************************************************************************************
//**********************************************************************************************************************
//*************Правильная формула конец*********************************************************************************
//**********************************************************************************************************************

    strel(grad);
}
//**********************************************************************************************************************
function resetZeroAll() {
    $.ajax({
        type: "POST",
        url: 'http://' + iprivg,
        data: 'RivgCodeinterpreter(SetChenjPer([Dat_vess]////1);SetChenjPer([Dat_gl]////0);)EndCode',
        dataType: "text",
        cache: false,
        //contentType: "application/json",
        success: function (data) {
            // console.log(data);
            close_modal_skr();
        },

        error: function (res) {
            console.log("Ошибка! " + res.statusText);
        }
    });

}

function resetOts() {
    $.ajax({
        type: "POST",
        url: 'http://' + iprivg,
        data: 'RivgCodeinterpreter(SetChenjPer([DU_1]////0);)EndCode',
        dataType: "text",
        cache: false,
        //contentType: "application/json",
        success: function (data) {
            // console.log(data);
            close_modal_skr();
        },

        error: function (res) {
            console.log("Ошибка! " + res.statusText);
        }
    });
}