/**
 * Created by Bryuhanov_VV on 16.11.2016.
 */
function file() {
    var page1 = "<div id='mydiv' style=" +
        "font-family:Tahoma, Helvetica, sans-serif;/*font-size:50px;*/" +
        "font-style: inherit;width: 100%; color: #00FF80; /*border: 2px solid #656bff;*/'>"+
        "<div style='display: flex; justify-content: center; align-items: center; height:656px;max-width:1024px;background-size:cover;  position: relative;overflow:hidden;/*border: 2px solid #656bff;*/'>"+
        "<input type='button' value='Сохранить файл' style='background: none; border: none; outline: none; color: white;' onclick='saveXLS();'>"+
        "</div>";

    //console.log(typeof mashin_img_engine_speed_gauge_needle);

    $("#content_skr").html(page1).show();
}


