/**
 * модель таблицы прорисовки в дом
 */
class Table{
    /**
     * конструктор
     * инициализируем
     * @param dom -  дом элемент
     */
    constructor(dom = {} ) {
        this.rowCount = 5;
        this.dom = dom  ;
        this._tableDom = [];
        this._table = [];
        this.row = '';


        // получаем в массиве элементы дом
        this._init();

    }

    /**
     * добавляем в текущий массив значений новую строчку
     * @param val
     */
    addRow(val){
        this.row = val;
        this._addTable(this.row);

    }

    update(val){
        let rowOld = this._table.pop(row);
        let row = {
            number: rowOld.number,
            id: val.id + '-' + val.attempts,
            length: val.length,
            position: val.position,
            attempts: val.attempts
        };
        this._table.push(row);
        this._write();
    }

    /**
     * @description логика добавления в таблицу значений
     * @param row
     * @private
     */
    _addTable(row){
        this._table.push(row);
        if (this._table.length > this.rowCount) {
            this._table.shift();
        }
        this._write();

    }

    /**
     * очищаем таблицу
     */
    clear() {
        this._table = [];
        this._write();
    }

    _init(){
        for (let i = 0; i < this.rowCount; i++) {
            this._tableDom.push(
                {
                    number: this.dom.getElementById('number_' + i),
                    id: this.dom.getElementById('id_' + i),
                    length: this.dom.getElementById('length_' + i),
                    position: this.dom.getElementById('position_' + i)
                }
            )
        }
    }

    /**
     * @description рисуем таблицу
     * @private
     */
    _write(){
        this._tableDom.forEach(function (dom, ind) {
            // if(!this._table[ind]) ;
            dom.number.textContent = this._table[ind] ? this._table[ind].number : '';
            dom.id.textContent = this._table[ind] ? this._table[ind].id : '';
            dom.length.textContent = this._table[ind] ? this._table[ind].length : '';
            dom.position.textContent = this._table[ind] ? this._table[ind].position : '';
        }, this);
    }

}

export default Table