var jsonRivg = {};
var flagTimer = true;
var data_rivg;

function dataRivg() {
            data_rivg = globalData;

    //console.log(data_rivg);

    if(!$.isEmptyObject(data_rivg)){
        if(vidQuery!="RivgAjax") if(data_rivg.DU_1==1){updateData('Главное');startMainPage();}
        choiceContainer = $("#settings");
        choiceContainer.find("input:checked").each(function () {
             key = $(this).attr("name");
            if (key && jsonRivgFull[key]) {
                jsonRivg[key] = jsonRivgFull[key];
            }
        });

        if ($("#replaceTime").val() == '')$("#replaceTime").val(1800);
            var tmpStr = '';
        $.each(data_rivg, function (key, value) {

            if (key in jsonRivg) {

                jsonRivg[key].data.push([new Date().getTime() + 10800000, value.replace(",",".")]);
                tmpStr = tmpStr + "<p id='"+key+"'>" +    key +" = "+jsonRivg[key].data.length+"</p>";
                //$("#countDot").html(tmpStr);
                if (jsonRivg[key].data.length > $("#replaceTime").val()) {
                    len =  jsonRivg[key].data.length - $("#replaceTime").val();
                    for (l=0;l < len;l++)
                         jsonRivg[key].data.splice(0, 1)
                }
            }
        });

        strRivg = JSON.stringify(jsonRivg);
        //console.log(strRivg);
        if(strRivg != '{}')
            mytestfunc(strRivg);

        $('#F000').text(JsonObj.F000);//Дата с архива
        if (!flagTimer)clearTimeout(timerStop[3]);
        else timerStop[3] = setTimeout(dataRivg, $("#rivgTimeOut").val());


        }else
        timerStop[3] = setTimeout(dataRivg,$("#rivgTimeOut").val());

}
