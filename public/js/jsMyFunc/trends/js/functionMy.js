/**
 * Created by Администратор on 05.01.2016.
 */

var user = "test-user";
var step = 0;
// var strDataRivg;
var jsonRivgFull= {};
var plot;

/*var updateLegendTimeout = null;
var latestPosition = null;
var updateLegend = null;*/
//**********************************************************************************************************************

// $(document).ready(function() {
function startTrend() {

   $("input[name=realTrend]:checkbox").change(function(e){

        $(this).val($("input[name=realTrend]:checked").length > 0 ? "true" : "false");
        if($(this).val()=='true') {
            flagTimer = true;
            dataRivg();
            //timerStop = setTimeout(dataRivg,10000);
        }else flagTimer = false;

    });


    /*$("#placeholder").bind("plothover", function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout)
            updateLegendTimeout = setTimeout(updateLegend, 50);



    });*/

    funcNoMy();
var data = settJSON();

            //console.log(data);
            var strTmp = ''; var str = '';var jsonRivg={};
            $.each(data, function(key,value) {
                 //console.log("key "+key+" value "+value.check);
                  strTmp = strTmp + "<tr><td><input readonly type=\"text\" style=\"height: 15px; width: 15px; background-color:"+value.ColorTrend+
                      "\" name=\"color"+value.Tag_Index+"\"/></td><td style=\"padding-left:5px\"><label class=\"cbx-label\" for=\""+value.Tag_Index+
                      "\">"+value.name+" ("+value.ed_izm+")</label>  " + "<input type=\"checkbox\" "+value.check+" id=\""+value.Tag_Index+"\" name=\""+value.Tag_Index+
                      "\"></td></tr>";

                   str = "<table align=\"center\">"+strTmp+"</table>";


                    //if(value.check=='checked'){
                        jsonRivg[value.Tag_Index] = {};
                        jsonRivgFull[value.Tag_Index] = jsonRivg[value.Tag_Index];
                        jsonRivgFull[value.Tag_Index].label = value.name;
                        jsonRivgFull[value.Tag_Index].color = value.ColorTrend;
                        jsonRivgFull[value.Tag_Index].data = [];
                    //}
                   // console.log(jsonRivgFull);


            });

           //console.log(str);

           document.getElementById("settings").innerHTML = str;

            dataRivg();


    //openSettings();


};





//**********************************************************************************************************************
//**********************************************************************************************************************
//**********************************************************************************************************************
var mytestfunc = function (data_my) {


    //Для datedicer датапикера их на странице два
//                    $.datepicker.setDefaults(
//                    $.extend($.datepicker.regional["ru"]));

    // datetimepicker();
    //$("#datepicker1").datepicker();
    //$("#datepicker1").datepicker( $.datepicker.regional[ "ru" ] );
    //$("#datepicker1").datepicker( "option", "dateFormat","dd/mm/yy");
    //Сайт датапикера http://xdsoft.net/jqplugins/datetimepicker/
//    $.datetimepicker.setLocale('ru');
//    $("#datepicker1").datetimepicker();
//    //$("#datepicker1").datetimepicker( "option", "dateFormat","dd/mm/yy HH:MM");
////**********************************************************************************************************************
//                $("#datepicker1").datetimepicker({
////                    beforeShow: function(input) {
////                        $(input).css("background-color","#ff9");
////                    },
////                    onSelect: function(dateText, inst) {
////                        $(this).css("background-color","");
////                        alert("Выбрано: " + dateText +
////                                "\n\nid: " + inst.id +
////                                "\nselectedDay: " + inst.selectedDay +
////                                "\nselectedMonth: " + inst.selectedMonth +
////                                "\nselectedYear: " + inst.selectedYear);
////                    },
//                    onClose: function(dateText, inst) {
//                        SetResult();
//                        //alert("Сработало!!!!");
//                    }
//                });
////**********************************************************************************************************************

//Для трендов-------------------------------------------------------------------

    //var datasets =   JSON.parse("{"+data_my+"}");
     datasets =   JSON.parse(data_my);


    //console.log(obj);
    //console.log(datasets);
    // hard-code color indices to prevent them from shifting as
    // countries are turned on/off

    //var i = 0;
    //$.each(datasets, function (key, val) {
    //    val.color = i;
    //    ++i;
    //});
    // insert checkboxes
     choiceContainer = $("#settings");
    //    $.each(datasets, function (key, val) {
    //        choiceContainer.append("<br/><input type='radio' name='" + key +
    //            "' checked='checked' id='id" + key + "'/>" +
    //            "<label for='id" + key + "'>"
    //            + val.label + "</label>");
    //    });
    //choiceContainer.find("input").click(plotAccordingToChoices);
    function plotAccordingToChoices() {

         data = [];
           // console.log(choiceContainer);
        choiceContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            //console.log("key "+key+" datasets[key] " +datasets[key]);
            if (key && datasets[key]) {
              //  console.log("date= "+datasets[key]+"key= "+key);
                data.push(datasets[key]);
            }
            //console.log(data);
        });

        time_options =
        {
            yaxis: {show: true
                //: 0
            },
            xaxis: {
                mode: "time",
                    //timeformat: "%d/%m/%y %H:%M:%S"
                    timeformat: "%H:%M:%S"
            },
            /*lines: {
                show: true,
                // fill: true,
                // fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] }
            },
            points: {
                show: true,
                    radius: 1
            },*/
            grid: {
                backgroundColor: {
                    colors: ["#B0D5FF", "#5CA8FF"]
                }
            },
            // selection: {
            //     mode: "xy"
            // },
            crosshair: {mode: "x"},
            grid: {
                hoverable: true,
                    autoHighlight: false
            },
            legend: {
                container: $("#legend")
            }

        };

// Create the overview plot
//          time_overview_options = {
//             series: {
//                 lines: {
//                     show: true,
//                     // fill: true,
//                     // fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] }
//                 },
//                 //   points: {
//                 //    	show: true,
//                 //    	radius: 3
//                 // },
//                 shadowSize: 0
//             },
//             grid: {
//                 backgroundColor: {
//                     colors: ["#B0D5FF", "#5CA8FF"]
//                 }
//             },
//             xaxis: {
//                 mode: "time",
//                 ticks: 4,
//                 // timeformat: "%0m/%0d %0H:%0M"
//             },
//             yaxis: {
//                 ticks: 5,
//             },
//             legend: {
//                 show: false
//             },
//             selection: {
//                 mode: "xy"
//             }
//         };

        if (data.length > 0) {
            plot = $.plot("#placeholder", data, time_options);
        }



        // if (data.length > 0) {
        //     //console.log(data);
        //     plot = $.plot($("#placeholder"), data, time_options);
        //     //var time_overview = $.plot($("#time_overview"), data, time_overview_options);
        //
        //     // now connect the two
        //     //console.log(data);
        //     //console.log("data.length1 "+data[0].data.length);
        //     $("#placeholder").bind("plotselected", function(event, ranges) {
        //
        //         // clamp the zooming to prevent eternal zoom
        //
        //         if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
        //             ranges.xaxis.to = ranges.xaxis.from + 0.00001;
        //         }
        //
        //         if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
        //             ranges.yaxis.to = ranges.yaxis.from + 0.00001;
        //         }
        //
        //         // do the zooming
        //
        //         plot = $.plot("#placeholder", data,
        //             $.extend(true, {}, time_options, {
        //                 xaxis: {
        //                     min: ranges.xaxis.from,
        //                     max: ranges.xaxis.to
        //                 },
        //                 yaxis: {
        //                     min: ranges.yaxis.from,
        //                     max: ranges.yaxis.to
        //                 }
        //             })
        //         );
        //
        //         //console.log("data.length2 "+data[0].data.length);
        //         //console.log("test_Count= "+test_Count);
        //         //test_Count++;
        //         // don't fire event on the overview to prevent eternal loop
        //
        //         //time_overview.setSelection(ranges, true);
        //     });
        //
        //     /*$("#time_overview").bind("plotselected", function(event, ranges) {
        //         console.log("test_Count= "+test_Count);
        //         plot.setSelection(ranges);
        //         test_Count++;
        //     });*/
        //
        // }

        legends = $("#legend .legendLabel");


             dataset = plot.getData();
            for (k = 0; k < dataset.length; ++k) {
                 series = dataset[k];
                 j = series.data.length - 1;
                //console.log(series.data);
                //console.log("s " + series.data[j][1]+" j "+j+" series.data[0] "+series.data[0].length);
                if (series.data.length !== 0)
                    legends.eq(k).text(series.label.replace(/:/g, ": " + series.data[j][1]));
            }

    }

    plotAccordingToChoices();


     legends = $("#legend .legendLabel");
    legends.each(function () {
        // fix the widths so they don't jump around
        $(this).css('width', $(this).width());
        //console.log(this);
    });


/*

    updateLegend =function(){
        updateLegendTimeout = null;
        var pos = latestPosition;
        var axes = plot.getAxes();
        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
            pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
            return;
        }

        var i, j, dataset = plot.getData();
        for (i = 0; i < dataset.length; ++i) {
            var series = dataset[i];
            // Find the nearest points, x-wise

            for (j = 0; j < series.data.length; ++j) {
                if (series.data[j][0] > pos.x) {
                    break;
                }
            }
            if(series.data.length != 0) {
                // Now Interpolate
                var y, p1 = series.data[j - 1], p2 = series.data[j];
                console.log("p1 "+p1+" p2 "+p2+" j "+j);
                if (p1 == null) {
                    y = p2[1];
                }
                else if (p2 == null) {
                    y = p1[1];
                }
                else {
                    y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
                }
            }
            legends.eq(i).text(series.label.replace(/:/g, ": " + y));

        }
    }*/




};




