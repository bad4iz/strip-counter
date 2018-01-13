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


