/**
 * Created by Bryuhanov_VV on 22.11.2016.
 */
function powerOff(){
//$("#powerOFF").click(function(){
    if (confirm("Выключить компьютер?"))
    {
        $.ajax({
            type: "POST",
            url: 'http://' + iprivg,
            data: 'RivgCodeinterpreter(SetChenjPer([Down_comd]////1);)EndCode',
            dataType: "text",
            cache: false,
            //contentType: "application/json",
            success: function (data) {
                //console.log(data);

            },

            error: function(res){
                console.log("Ошибка! " + res.statusText);
            }
        });
    }
    // else
    //  {
    // alert("You pressed Cancel!");

    // }


//});
}



//**********************************************************************************************************************
var queryRivgFunc= function () {
    //var strSettings,str;
    $.ajax({
        type: "POST",
        url: 'http://' + iprivg,
        data: queryRivg,
        dataType: "json",
        cache: false,
        //contentType: "application/json",
        success: function (data1) {
            //console.log(data1);
            JsonObj = data1;//для работы мнемосхемы
            timerStop = setTimeout(queryRivgFunc, zaprosTimeOut);
        },

        error: function(res){
            console.log("Ошибка! " + res.statusText);
            timerStop = setTimeout(queryRivgFunc, 5000+zaprosTimeOut);
        }
    });
}
//**********************************************************************************************************************

function replaceData(JsonObj) {
    if($(JsonObj).length>0) {
        //console.log("JsonObj replace");
        var strTmp = '';
        jQuery.each(JsonObj, function (key, value) {
            if (value != undefined)
                strTmp = strTmp + "\"" + key + "\"" + ":\"" + value.replace(",", ".") + "\",";
        });
        strTmp = "{" + strTmp.substr(0, strTmp.length - 1) + "}";
        return JSON.parse(strTmp);
    }
}

function limit(val,j){
    //alert('val '+val.value);
    switch (j) {
        case 0:
        if(!((val.value < 30) && (val.value > 0)))
            val.value = 1;
          break;
        case 1:
        if (!((val.value < 30) && (val.value > -30)))
            val.value = 0;
          break;
    }
}


//**********************************************************************************************************************
function saveSetRivg (num) {
    var saveSett = 'Что-то не так...';
    switch (num){
        case 0: saveSett = 'SetChenjPer([Dat_vess]////1);savep_proj();'; break;
        case 1: saveSett = 'SetChenjPer([Dat_vess]////2);savep_proj();'; break;
        case 2: saveSett = 'SetChenjPer([Dat_gl]////'+$("input[name = \"Dat_gl\"]").val()+');savep_proj();'; break;
        case 3: saveSett = 'SetChenjPer([Ust_Ves]////'+$("input[name = \"Ust_Ves\"]").val()+');savep_proj();'; break;
        case 4: saveSett = 'SetChenjPer([Ust_Ves_zat]////'+$("input[name = \"Ust_Ves_zat\"]").val()+');savep_proj();'; break;
    }


    $.ajax({
        type: "POST",
        url: 'http://' + iprivg,
        data: 'RivgCodeinterpreter('+saveSett+')EndCode;',
        dataType: "text",
        cache: false,
        //contentType: "application/json",
        success: function (data) {
            //  console.log(data);
        },

        error: function(res){
            console.log("Ошибка отправки! " + res.statusText);
        }
    });
}
//**********************************************************************************************************************

// function openDigitKey(locID) {
//     alert(locID);
// //Выполнить по Enter установка глубины
//     $("#dialog_resetGL").dialog("open").keypress(function(e){
//             //console.log(e.keyCode);
//             if(e.keyCode==13) {
//                 event.preventDefault(); // выключaем стaндaртную рoль элементa
//                 $("#dialog_resetGL").dialog("close");
//
//                 if($('input[name="glub"]').val() !== '')
//                     $.ajax({
//                         type: "POST",
//                         url: 'http://' + iprivg,
//                         data: 'RivgCodeinterpreter(SetChenjPer(['+locID+']////'+$('input[name="glub"]').val()+');)EndCode;',
//                         dataType: "text",
//                         cache: false,
//                         //contentType: "application/json",
//                         success: function (data) {
//                             console.log(data);
//                             //console.log($('input[name="glub"]').val());
//                         },
//
//                         error: function(res){
//                             console.log("Ошибка отправки! " + res.statusText);
//                         }
//                     });
//                 $('input[name="glub"]').val('');
//
//
//             }
//         });
// //**********************************************************************************************************************
// }
//***********************Цифровая клавиатура****************************************************************************
function funcDigit(digit) {
    if((digit!= 'Del')&&(digit != 'Enter'))
        digitTmp = digitTmp + digit;
    if(digit === 'Del')
        digitTmp = digitTmp.slice(0,-1);//Удалить последний символ строки
    $('input[name="glub"]').val(digitTmp);//Выводим в input
    if(digit === 'Enter'){
        if($('input[name="glub"]').val() !== '')
            $.ajax({
                type: "POST",
                url: 'http://' + iprivg,
                data: 'RivgCodeinterpreter(SetChenjPer(['+globalID+']////'+$('input[name="glub"]').val()+');savep_proj();)EndCode;',
                dataType: "text",
                cache: false,
                //contentType: "application/json",
                success: function (data) {
                    //$("#"+globalID).html($('input[name="glub"]').val());
                    $('input[name="glub"]').val('');
                    digitTmp = '';
                    close_GL();

                    //console.log(data);
                    //console.log($('input[name="glub"]').val());
                },
                error: function(res){
                    console.log("Ошибка отправки! " + res.statusText);
                }
            });
    };
};
//******************конец цифровая клавиатура***************************************************************************
function saveXLS() {
    // $.ajax({
    //     type: "POST",
    //     url: 'http://' + iprivg,
    //     data: 'RivgCodeinterpreter(SetChenjPer([saveXLS]////1);)EndCode;',
    //     dataType: "text",
    //     cache: false,
    //     success: function (data) {
    //         console.log(data);
    //     },
    //     error: function(res){
    //         console.log("Ошибка отправки! " + res.statusText);
    //     }
    // });

    $.ajax({
        type: "POST",
        url: 'http://' + iprivg,
        data: 'RivgCodeinterpreter(SetChenjPer([R_List]////1);)EndCode;',
        dataType: "text",
        cache: false,
        success: function (data) {},
        error: function(res){}
    });

}