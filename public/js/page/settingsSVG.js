/**
 * Created by Bryuhanov_VV on 03.03.2017.
 */
function setSVG(){
    $("#F001")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F002")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F003")//Нагрука
        .css("fill","#e6e5ff")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F004")//Глубина
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(3500,0)");
    $("#F005")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F007")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F009")//давление прижимов верхних колодок
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F010")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F011")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F012")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F013")//Давление привода инжектора
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1900,0)");
    $("#F014")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1000,0)");
    $("#F015")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1000,0)");
    $("#F018")
        .css("fill","#00FF80")
        .css("text-anchor","end")
        .attr("transform","translate(1000,0)");
    $("#F000")//Дата и время
        .css("fill","#00608E")
        .css("text-anchor","end")
        .attr("transform","translate(5600,0)");
//Кнопки
    $('#bottom g').each(function(){
        var id = $(this).attr('id');
        $('svg style').append('#'+id+'{cursor:pointer;}').append('#'+id+':active rect{fill:#004167}');
    });

    $('svg style')
        .append('#resetZeroButton{cursor:pointer;}')
        .append('#resetZeroButton:active path{opacity:0.4}')
        .append('#F004{cursor:pointer;}')
        .append('#F004:active{opacity:0.4}')
        .append('#resetButton{cursor:pointer;}')
        .append('#resetButton:active{opacity:0.4}')
        .append('#powerButton{cursor:pointer;}')
        .append('#powerButton:active{opacity:0.4}');

    // $('svg style').after('<linearGradient id="id14" gradientUnits="userSpaceOnUse" x1="32930.2" y1="27035.1" x2="32930.2" y2="25077.2">' +
    //     '<stop offset="0" style="stop-opacity:1; stop-color:#007EB3"/>' +
    //     '<stop offset="1" style="stop-opacity:1; stop-color:#004167"/>' +
    //     '</linearGradient>');

    $("#arrowDown").hide();$("#arrowUp").hide();
}