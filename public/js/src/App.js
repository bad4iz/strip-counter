import Table from  './Table';
import ArrTable from "./arrTable";




class App {
    constructor(svg){
        this.svg = svg;
        this.table =  new Table(svg);       // таблица отображения в дом
        this.arrTable = new ArrTable();
        this.arrTable.addTableDom(this.table);
    }

    showTable(callback){
        let fragment = document.createDocumentFragment();
        let div = document.createElement('div');

        let button = document.createElement('div');
        button.textContent = 'Закрыть';
        button.style.position = 'fixed';
        button.style.right = '0';
        button.style.width = '200px';
        button.style.fontSize = '30px';
        button.classList = 'btn btn-primary';
        button.type = 'button';
        button.id = 'endApp';
        div.appendChild(button);

        let table = document.createElement('table');
        let head = document.createElement('thead');
        let body = document.createElement('tbody');

        head.innerHTML = '<tr><th>№</th><th>id шва и номер попытки</th><th>длина секции м</th><th>позиция шва от начала м</th></tr>';
        let td = document.createElement('td');

        this.arrTable.table.forEach((item) => {
            body.innerHTML += `<tr>
                                    <td>${item.number}</td>
                                    <td>${item.id}${item.attempts>1 ? '-' + item.attempts: ''}</td>
                                    <td>${item.length} м</td>
                                    <td>${item.position} м</td>
                                
                                </tr>`;
        });

        table.appendChild(head);
        table.appendChild(body);
        div.appendChild(table);
        document.body.appendChild(div);
        table.style.margin = '60px auto';
        table.style.width = '70%';
        table.style.backgroundColor = 'azure';
        table.classList = 'table table-striped';

        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.width = '100%';
    }

    sendTable(){
        fetch('')
    }

}

export default App