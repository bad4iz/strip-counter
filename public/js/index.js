////////////////////////////////////////////////////////////////////////////////////////////////////
/////
///////////////////////////////////////////////////////////////////////////////////////////////////

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




///////////////////////////////////////////////////////////////////////////////////////////////////////\
////////////         Задание на разработку системы учета метража трубной заготовки.       //////////////\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////\
// document.getElementById('win').removeAttribute('style');
var stripId = '';

var app = {
    arrTableDom: [],
    arrButton: [],
};
class App{
    constructor(){
        let a = 0
    }
}
/** @namespace */
document.querySelector('object').addEventListener('load', function () {
    var i = 0; // счетчик
    var rowCount = 5; // количество строчек
    var arrTableDom = []; // массив строчек
    var arrButton = []; // массив кнопок
    var arrTable = []; // массив значений
    // метраж
    app.svg = document.querySelector('object').getSVGDocument(); // элемент дом элемента свг
    var svg = document.querySelector('object').getSVGDocument(); // элемент дом элемента свг
    var footage = app.svg.getElementById('Mr'); // визуализатор счетчика метров
    app.footage = app.svg.getElementById('Mr'); // визуализатор счетчика метров
    var num = 1; //
    var columns_id = 0; //
    var id = 1;
    var value = app.svg.getElementById('Mr');

    (function fram (){
        footage.textContent = i++/100;
        requestAnimationFrame(fram);
    })();

    ///////////////////////////////////////////////////////
    /// регистрация функций
    ////////////////////////////////



    // получаем в массиве элементы дом
    for (var i = 0; i< rowCount; i++) {
        arrTableDom.push(
            {
                number: svg.getElementById('number_' + i),
                id: svg.getElementById('id_' + i),
                length: svg.getElementById('length_' + i),
                position: svg.getElementById('position_' + i)
            }
        )
    }

    /**
     * записать шов
     * @description ljljljlj
     * @param lengthSection
     * @param seamPosition
     */
    function setTable(lengthSection, seamPosition) {
        arrTable.push({
                number: num++,
                id: id,
                length: lengthSection,
                position: seamPosition,
                attempts: 1
            });
        if (arrTable.length > rowCount) {
            arrTable.shift();
        }

        arrTableDom.forEach(function (dom, ind) {
            dom.number.textContent = arrTable[ind].number;
            dom.id.textContent = arrTable[ind].id;
            dom.length.textContent = arrTable[ind].length;
            dom.position.textContent = arrTable[ind].position;
        });
    }

    /**
     * перезаписать шов
     * @param lengthSection
     * @param seamPosition
     */
    function updateTable(lengthSection, seamPosition) {
        var length = arrTable.length - 1;
        var dom = arrTableDom[length];
        var table = arrTable[length];

        table.position = lengthSection;
        table.position = seamPosition;

        dom.number.textContent = table.number;
        dom.id.textContent = table.id + '-' +  table.attempts++;
        dom.length.textContent = table.position;
        dom.position.textContent = table.position;
    }



    ///////////////////////////////////////////////////////////
    // регистрация кнопок
    /////////////////////////////////////////

    // начать новую колонну
    arrButton.push({
        button: svg.getElementById('to_zero'),
        mfunction: initPillar
    });

    // записать шов
    arrButton.push({
        button: app.svg.getElementById('to_zero-7-8'),
        mfunction: function () {
            var value = app.getLength();
            setTable(value.lengthSection, value.seamPosition);
        }
    });

    // перезаписать шов
    arrButton.push({
        button: svg.getElementById('to_zero-7-8-8'),
        mfunction: function () {
            var value = app.getLength();
            updateTable(value.lengthSection, value.seamPosition);
        }
    });

    // закончить колонну
    arrButton.push({
        button: svg.getElementById('to_zero-7-8-8-0'),
        mfunction: function () {
            var value = app.getLength();
            finishСolumnTable(value.lengthSection, value.seamPosition);
            clean();
        }
    });

    // Обработка кнопки ОК в модальном окне
    arrButton.push({
        button: svg.getElementById("btnOkSvg"),
        mfunction: start
    });


    // вешаем обработчики на кнопки
    for (var i = arrButton.length - 1; i >= 0; i--) {
        arrButton[i].button.onclick = arrButton[i].mfunction;
    }
});

          ///////////////////////////////////////////////////////\
         ///          регистрация глобальных функций           ///\
        ///////////////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * стартуем логику
     */
    function start() {
        clean();
       // если все хорошо то прячем модалку
        app.svg.getElementById('Keyboord_key').style.display = 'none';
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
        app.footage.textContent = i;
        app.arrTable = [];
        num = 1;
        console.log(arrTable);
        arrTableDom.forEach(function (dom, ind) {
            dom.number.textContent = '';
            dom.id.textContent = '';
            dom.length.textContent = '';
            dom.position.textContent = '';
        });
        app.getLength = regGetingLength();

    }

    /**
     * новая колонна
     */
    function initPillar() {
        app.svg.getElementById('Keyboord_key').style.display = 'block';
    }

    /**
     * закончить колонну
     * @param lengthSection
     * @param seamPosition
     */
    function finishСolumnTable(lengthSection, seamPosition) {
        var length = arrTable.length - 1;
        var dom = arrTableDom[length];
        var table = arrTable[length];

        table.position = lengthSection;
        table.position = seamPosition;

        dom.number.textContent = table.number;
        dom.id.textContent = table.id + '/' +  table.attempts++;
        dom.length.textContent = table.position;
        dom.position.textContent = table.position;
        clean();
    }

