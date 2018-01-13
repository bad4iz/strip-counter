import Row from "./Row";

class RowCollection{
    constructor(){
        this._rows = [],
        this._rowsTable = []
    }
    set rows(row){
        if (!row instanceof Row){
            console.warn('не тот класс');
        }
        this._rows.unshift(row);
        console.log(this._rows);
    }
}

export default RowCollection;