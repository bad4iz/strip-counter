import 'whatwg-fetch'
import buttons from "./buttons";
import App from './App'
import ArrTable from "./arrTable";


var stripId = '';
var i = 0; // счетчик
let app ,svg ;


/** @namespace */
document.addEventListener("DOMContentLoaded", function () {
    // метраж
    svg = getSvg(); // элемент дом элемента свг

    initButtons();
    app = new App(svg);


    (function fram (){
        footage( (i++/100).toFixed(2));
        requestAnimationFrame(fram);
    })();

});


///////////////////////////////////////////////////////////
// регистрация кнопок
/////////////////////////////////////////
function initButtons() {

    // начать новую колонну
    buttons.add(svg.getElementById('to_zero'), initPillar );

    // Обработка кнопки ОК в модальном окне
    buttons.add(svg.getElementById("btnOkSvg"), start);

    // записать шов
    buttons.add(svg.getElementById('to_zero-7-8'), function () {
        let value = app.getLength();
        app.arrTable.add( app.numberPillar, value.lengthSection, value.seamPosition );
    });

    // перезаписать шов
    buttons.add(svg.getElementById('to_zero-7-8-8'),function () {
        let value = app.getLength();
        app.arrTable.update(value.seamPosition);
    });

    // закончить колонну
    buttons.add(svg.getElementById('to_zero-7-8-8-0'),function () {
        let value = app.getLength();
        app.arrTable.add( app.numberPillar, value.lengthSection, value.seamPosition);
        httpPost('table', JSON.stringify( app.showTable()), ()=>location.reload() );


        // закрыть итоговую таблицу
        document.getElementById('endApp').onclick = app.sendTable.bind(app);
    });

}





////////////////////////////////////////////////////////////
//   ()=> location.reload()
///////////////////////////////////////////////////////////

/**
 * стартуем логику
 */
function start() {
    clean();
    let numberColumn = app.svg.getElementById('numberColumn');
    app.numberPillar = numberColumn.textContent;
    let num = app.svg.getElementById('Num');
    num.textContent = app.numberPillar;
    // если все хорошо то прячем модалку
    // todo послать на сервер номер колонны если удачно то дальше
    app.svg.getElementById('Keyboord_key').style.display = 'none';
    numberColumn.textContent = '';
    app.getLength = regGetingLength();
}

/**
 * регистрируем фнкцию подсчета длины и позиции шва с начальными параметрами
 * позиция шва = 0
 * @returns {Function}
 */
function regGetingLength(){
    var seamPosition = 0; // Позиция шва
    var counter = app.svg.getElementById('Mr');
    return (
        /**
         * плучаем позицию шва и длину
         * @returns {{lengthSection: string, seamPosition: number}}
         */
        function () {
            var value = +counter.textContent;
            var lengthSection = (value - seamPosition).toFixed(1);
            seamPosition = value.toFixed(1); // позиция шва
            return {
                lengthSection: lengthSection, // длина
                seamPosition: seamPosition // позиция шва
            }
        }
    )
}

/**
 * *сбросить на ноль
 * стереть таблицу
 * инициализировать функцию подсчета длины
 */
function clean() {
    i = 0;
    footage(i);
    // num = 1;
    // console.log(arrTable);
    app.table.clear();
    app.getLength = regGetingLength();

}


/**
 * новая колонна
 */
function initPillar() {
    app.svg.getElementById('Keyboord_key').style.display = 'block';
}


/**
 * @desc запишит значение в метраж если передадим значение
 * если не передаем то возвращает текущее значение
 * @param value
 * @returns {number}
 */
function footage(value) {
    if(!value){
        return  +app.svg.getElementById('Mr').textContent;
    }
    app.svg.getElementById('Mr').textContent = value;
}

/**
 * @desc возвращает элемент дом элемента свг
 * @returns {Document}
 */
function getSvg() {
    return  document.querySelector('#svg2'); // элемент дом элемента свг
}


/**
 * @description посылает пост запрос и вызывает функцию по положительному ответу.
 * @param {string} url - url адресс на который будет запрос.
 * @param {string} body - тело запроса
 * @param {function} calback - функция обратного вызова выполниться с аргументом ответа
 *
 * @example <caption>Пример авторизации. Выведет в консоль что прислал сервер</caption>
 * httpPost('/home', 'name=Vasya&pass=1234', function(res){
 *  console.log(res)
 * });
 */
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

