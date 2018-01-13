let  buttons = (function () {
    let arr = [];
    return {
        add: function(button, callback) {
            arr.push({button, callback});
            button.addEventListener('click', callback)
        }
    }
})();

export default buttons