/**
 *
 */
class ArrTable{
    /**
     *
     */
    constructor(tableDom){
        this._table = [];
        this._number = 0;
        this._tableDom = {};
    }

    /**
     *
     * @param lengthSection
     * @param seamPosition - позиция шва
     */
    add(idPillar, lengthSection, seamPosition){
        // todo послать на сервер значение нового шва

        let val = {
            number: ++this._number,
            id: idPillar + '.' + this._number,
            length: lengthSection,
            position: seamPosition,
            attempts: 1,
            time: this.getTime()
        };

        this._table.push(val);
        this._writeRow(val);
    }

    /**
     *
     * @param val
     * @private
     */
    _writeRow(val){
        this._tableDom.addRow(val);
    }

    /**
     *
     * @param tableDom
     */
    addTableDom(tableDom){
        this._tableDom = tableDom;
    }

    update(seamPosition){
        let rowOld = this._table.pop();
        // todo посылаем запрос на сервер об обновлении шва

        let row = {
            number: this._number,
            id: rowOld.id,
            length: (+rowOld.length + +seamPosition - +rowOld.position).toFixed(1),
            position: seamPosition,
            attempts: ++rowOld.attempts,
            time: this.getTime()
        };
        this._table.push(row);
        this._tableDom.update(row);
    }

    /**
     * очищаем таблицу
     */
    clear(){
        this._table = [];
    }

    /**
     * возвращаем таблицу значений
     * @returns {Array} - возврат значений
     */
    get table () {
        return this._table;
    }
    getTime() {
        let date = new Date();

        function t(time) {
            return ('' + time).length < 2 ? '' + 0 + time : time
        }

        return '' + t(date.getHours()) + ':' + t(date.getMinutes()) + ':' + t(date.getSeconds()) + ' ' + t(date.getDate()) + '/' + t((date.getMonth() + 1)) + '/' + t(date.getFullYear());
    }

}
export default  ArrTable