/**
 *
 */
class ArrTable{
    /**
     *
     */
    constructor(tableDom){
        this._table = [];
        this._number = 1;
        this._tableDom = {};
    }

    /**
     *
     * @param lengthSection
     * @param seamPosition - позиция шва
     */
    add(lengthSection, seamPosition){
        // todo послать на сервер значение нового шва

        let val = {
            number: this._number++,
            id: 0,
            length: lengthSection,
            position: seamPosition,
            attempts: 1
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

        console.log(+rowOld.length + +seamPosition - +rowOld.position );
        let row = {
            number: this._number,
            id: 0,
            length: (+rowOld.length + +seamPosition - +rowOld.position).toFixed(1),
            position: seamPosition,
            attempts: ++rowOld.attempts
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
}
export default  ArrTable