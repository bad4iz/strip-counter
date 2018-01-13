/*** Created by Bryuhanov_VV on 02.03.2017.*/

var globalData,//объект json, ривг подсунет или получить через json
    timeOut=1000,//время опроса
    iprivg = '192.168.0.88:42000',//ip и port для подключения к ривгу
    url1="/Get_json_Object([info])",//запрос в Rivg через Ajax(info)
    url='http://'+iprivg+url1,//Собранная url
    vidQuery="RivgAjax1",//RivgAjax для запроса по Ajax, любое другое содержимое переменной - ждем, что Rivg подсунет данные сам
    timerStop = [],//Остановка таймера
    digitTmp='',//цифровая клавиатура
    globalID,//ID элементов при вызове цифровой клавиатуры
    timerShetStop,//Остановка таймера выбора опроса(ajax)
    flagWarningWindow = true;//Остановка закрытия окна по таймеру
    
window.onload = function () {
    // open_modal_skr();
    startMainPage();
    queryRivg(url);
    strel(-45);
    //получаем идентификатор элемента
    var restartBtn = document.getElementById('resetButton');
    var powerBtn = document.getElementById('powerButton');
        //вешаем на него событие
        restartBtn.onclick = function() {
                window.location.reload();
            return false;
        }

    powerBtn.onclick = function() {
        if(vidQuery != "RivgAjax")
            powerOff();
        return false;
    }

    //Кнопки нижней панели

    var mainButton = document.getElementById('mainButton');
    var svodkaButton = document.getElementById('svodkaButton');
    var trendButton = document.getElementById('trendButton');
    var fileButton = document.getElementById('fileButton');
    var grNagButton = document.getElementById('grNagButton');
    var menuButton = document.getElementById('menuButton');

    svodkaButton.onclick = function() {
        updateData('Сводка');
        svodka();
        return false;
    }

    mainButton.onclick = function() {
        updateData('Главное');
        startMainPage();
        return false;
    }

    trendButton.onclick = function() {
        updateData('График');
        trends();
        return false;
    }

    grNagButton.onclick = function() {
        updateData('График нагрузки');
        message();
        return false;
    }
    menuButton.onclick = function() {
        if(vidQuery!="RivgAjax"){
        updateData('Меню');
        menu();}
        return false;
    }

    fileButton.onclick = function() {
        if(vidQuery!="RivgAjax"){
            updateData('Файл');
                $.ajax({
                    type: "POST",
                    url: 'http://' + iprivg,
                    data: 'RivgCodeinterpreter(SetChenjPer([R_List]////1);)EndCode;',
                    dataType: "text",
                    cache: false,
                    success: function (data) {},
                    error: function(res){}
                });
        }
        return false;
    }

}
//Функция вращения стрелки
function strel(data){
    var strelka = document.getElementById("strelka");
    strelka.setAttribute('transform','rotate('+data+' 18096 11360)');
}
//Посыл на выключение компьютера
function powerOff(){
//$("#powerOFF").click(function(){
    if (confirm("Выключить компьютер?"))
    {
        $.ajax({
            type: "POST",
            url: 'http://' + iprivg,
            data: 'RivgCodeinterpreter(SetChenjPer([Down_comd]////1);)EndCode',
            dataType: "text",
            cache: false,
            //contentType: "application/json",
            success: function (data) {
                //console.log(data);
            },
            error: function(res){
                console.log("Ошибка! " + res.statusText);
            }
        });
    }
}

//******************************************************************************
//******************************************************************************
//******************************************************************************
// function queryRivg(reqVest) {
//     var req = getXmlHttpRequest();
//     req.open("POST", reqVest, true);
//     req.send(null);
//
//     req.onreadystatechange = function()
//     {
//         if (req.readyState !== 4) setTimeout( queryRivg,timeOut,url); return;
//         if (req.status !== 200) setTimeout( queryRivg,timeOut,url); return;
//             globalData = JSON.parse(req.responseText);
//             setTimeout( queryRivg,timeOut,url);
//             return false;
//             //console.log(globalData)
//         //req.destroy();
//     }
// }

function queryRivg(reqVest){
        if(vidQuery == "RivgAjax1") {
            timeOut = 1000;
            $.ajax({
                type: "POST",
                url: reqVest,
                data: '',
                dataType: "json",
                cache: false,
                //contentType: "application/json",
                success: function (data1) {
                    //console.log(data1);
                    globalData = data1;//для работы мнемосхемы
                    timerShetStop = setTimeout(queryRivg, timeOut, url);
                },

                error: function (res) {
                    console.log("Ошибка! " + res.statusText);
                    timerShetStop = setTimeout(queryRivg, timeOut + 5000, url);
                }
            });
        }else{
            timeOut = 300;
            iprivg = "127.0.0.1:42000";
            url1="/Get_json_Object([info])",//запрос в Rivg через Ajax(info)
            url='http://'+iprivg+url1,//Собранная url
            clearTimeout(timerShetStop);
        }
}

//******************************************************************************
//******************************************************************************
//******************************************************************************
//Заголовок и очищение дива, остановка таймеров
function updateData(nameMain) {
    var content = document.getElementById("content_skr");
    document.getElementById('mainText').innerHTML = nameMain;
    content.innerHTML = '';
    $('#content_skr').hide();
   // console.log(timerStop.length);
    for(var i=0; i< timerStop.length;i++)
        clearTimeout(timerStop[i]);

}

//Функции открытия и закрытия клавиатуры
function open_GL(){
    //clearTimeout(timerStop[4]);
    $('#dialog_resetGL').css('display','flex');
}
function close_GL(){
     //clearTimeout(timerStop[4]);
     resetZero();
    $('#dialog_resetGL').hide();
}
//Функции открытия и закрытия модального окна
function open_modal_skr(data){
    $('.modal_skr').css('display','flex');
    $('.win_skr').html(data);
}
function close_modal_skr(){
       $('.modal_skr').hide();
}

//**********************************************************************************************************************
function resetZero() {
    $('input[name="glub"]').val('');
    digitTmp = '';
}