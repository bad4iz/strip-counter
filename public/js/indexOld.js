////////////////////////////////////////////////////////////////////////////////////////////////////
/////
///////////////////////////////////////////////////////////////////////////////////////////////////
function httpPost(url, body, calback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status == 200) {
            calback(this.response);
        } else {
            var error = new Error(this.statusText);
            error.code = this.status;
            console.log(error);
        }
    };
    xhr.onerror = function () {
        reject(new Error("Network Error"));
    };
    xhr.send(body);
}






///////////////////////////////////////////////////////////////////////////////////////////////////////\
////////////         Задание на разработку системы учета метража трубной заготовки.       //////////////\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////\
// document.getElementById('win').removeAttribute('style');
var stripId = '';

document.addEventListener('DOMContentLoaded', function () {
    var i = 0;
    var seamPosition = 0; // Позиция шва

    // метраж
    var svg = document.querySelector('object').getSVGDocument();
    var footage = svg.getElementById('Mr');


    (function fram (){
        footage.textContent = i++/10;
        requestAnimationFrame(fram);
    })();

    var arrButton = [];

    ///////////////////////////////////////////////////////
    /// регистрация функций 
    ////////////////////////////////

    // сбросить на ноль
    function clean() {
        i = 0;
        footage.textContent = '';
        // document.getElementById('win').removeAttribute('style');
        svg.getElementById('Keyboord_key').style.display = 'block';
    }

    // arrTableDom = [[document.getElementById('Tx1'), document.getElementById('Tx2')], [document.getElementById('Tx4'), document.getElementById('Tx5')], [document.getElementById('Tx7'), document.getElementById('Tx8')]];

    arrTable = [];

    function setTable(lengthSection, seamPosition, thickness) {
        arrTable.push([lengthSection, seamPosition, thickness]);
        if (arrTable.length > 3) {
            arrTable.shift();
        }
        arrTableDom.forEach(function (dom, ind) {
            dom.forEach(function (el, i) {
                if (arrTable[ind]) {
                    el.textContent = arrTable[ind][i];
                }
            });
        });
    }

    function overwriteTable(lengthSection, seamPosition, thickness) {
        var length = arrTable.length - 1;
        arrTable[length] = [lengthSection, seamPosition, thickness];
        arrTableDom[length].forEach(function (el, i) {
            el.textContent = arrTable[length][i];
        });
    }

    ///////////////////////////////////////////////////////////
    // регистрация кнопок
    /////////////////////////////////////////
    // сбросить на ноль
      arrButton.push({
            button: document.getElementById('to_zero'),
            mfunction: clean
        });

    // записать шов    
    arrButton.push({
        button: document.getElementById('to_zero-7-8'),
        mfunction: function _function() {
            var lengthSection = (+document.getElementById('Mr').textContent - seamPosition).toFixed(2); // длина
            seamPosition = +document.getElementById('Mr').textContent; // позиция шва

            var data = new FormData();
            data.append('length', lengthSection);
            data.append('seamPosition', seamPosition);
            data.append('pillars_id', columns_id);

            var url = 'http://strip-counter/strips/set';
            httpPost(url, data, function(res){
                var response = JSON.parse(res);
                console.log(response);
                stripId = response.id;
                setTable(lengthSection, seamPosition);
            });
        }
    });

    // Перезаписать шов
    arrButton.push({
        button: document.getElementById('to_zero-7-8-8'),
        mfunction: function _function() {
            if (arrTable.length > 2) {
                seamPosition = arrTable[arrTable.length - 2][1];
            } else {
                seamPosition = 0;
            }
            var lengthSection = (+document.getElementById('Mr').textContent - seamPosition).toFixed(2);
            seamPosition = +document.getElementById('Mr').textContent;

            var data = new FormData();
            data.append('length', lengthSection);
            data.append('seamPosition', seamPosition);
            data.append('pillars_id', columns_id);

            var url = 'http://strip-counter/strips/update/' + stripId;
            httpPost(url, data, function(res){
                var response = JSON.parse(res);
                overwriteTable(lengthSection, seamPosition);
            });
        }
    });

    // закончить колонну
    arrButton.push({
        button: document.getElementById('to_zero-7-8-8-0'),
        mfunction: function _function() {
            var tek = +document.getElementById('Mr').textContent;
            var lengthSection = (tek - seamPosition).toFixed(2);

            seamPosition = tek;

            seamPosition = +document.getElementById('Mr').textContent;

            var data = new FormData();
            data.append('length', lengthSection);
            data.append('seamPosition', seamPosition);
            data.append('pillars_id', columns_id);

            var url = 'http://strip-counter/strips/set';
            httpPost(url, data, function(res){
                var response = JSON.parse(res);
                stripId = response.id;
                setTable(lengthSection, seamPosition);
                i = 0;
            });
        }
    });

   // Обработка кнопки ОК в модальном окне
   arrButton.push({
       button: document.getElementById("btnOkSvg"),
       mfunction: pullNull
   })


    // вешаем обработчик на кнопки
    for (var i = arrButton.length - 1; i >= 0; i--) {
        arrButton[i].button.onclick = arrButton[i].mfunction;
    }
 
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////         Задание на разработку системы учета метража трубной заготовки.       //////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////
var pillarNumber = '';
var columns_id = 0;
function pullNull() {
   // pillarNumber = Number(document.getElementById('numberColumn').value);
    pillarNumber = Number(document.getElementById('numberColumn').textContent);
    if (pillarNumber) {
        var data = new FormData();
        data.append('pillar', pillarNumber);

        var url = 'http://strip-counter/pillars/set';
        var that = this;

        httpPost(url, data, function(res){
            var response = JSON.parse(res);
            if(response.pillar){
                pillarNumber = response.pillar;
                columns_id = response.id;
                console.log('RivgCodeinterpreter(SetChenjPer([Mr]////0);)EndCode')
                document.getElementById('Num').textContent = pillarNumber;
                //document.getElementById('win').style.display = 'none'; 
                document.getElementById('Keyboord_key').style.display = 'none';
                //document.getElementById('numberColumn').textContent = 0;
            }
            else{
                document.getElementById('numberColumn').textContent = "Уже есть";
                var stopTimer = setTimeout(function(){
                    document.getElementById('numberColumn').textContent = "";
                    clearTimeout(stopTimer);
                },1000);
            }
        });
    }
}

function closemodal(){
  document.getElementById('win').style.display = 'none'; 
}