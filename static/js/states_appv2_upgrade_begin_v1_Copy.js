
// var conString = "postgres://HMackman:postgres@localhost:5432/ETL_Data_Base";

// var client = new pg.Client(conString);
// client.connect();

// var query2000 = pgClient.query("SELECT Total Revenue from district where State in ('Arizona','Oklahoma','Colorado','Kentucky','West Virginia','Virginia','North Carolina','South Carolina') and Year = 2000");
// var query2000 = pgClient.query("SELECT Total Revenue from district where State in ('Arizona','Oklahoma','Colorado','Kentucky','West Virginia','Virginia','North Carolina','South Carolina') and Year = 2005");
// var query2000 = pgClient.query("SELECT Total Revenue from district where State in ('Arizona','Oklahoma','Colorado','Kentucky','West Virginia','Virginia','North Carolina','South Carolina') and Year = 2010");
// var query2000 = pgClient.query("SELECT Total Revenue from district where State in ('Arizona','Oklahoma','Colorado','Kentucky','West Virginia','Virginia','North Carolina','South Carolina') and Year = 2015");

var layers = {
    two_thousand_layer: new L.layerGroup(),
    two_thousand_five_layer: new L.layerGroup(),
    two_thousand_ten_layer: new L.layerGroup(),
    two_thousand_fifteen_layer: new L.layerGroup(),
    CO_school_districts_layer: new L.layerGroup(),
    AZ_school_districts_layer: new L.layerGroup(),
    OK_school_districts_layer: new L.layerGroup(),
    KY_school_districts_layer: new L.layerGroup(),
    //VA_school_districts_layer: new L.layerGroup(),
    WV_school_districts_layer: new L.layerGroup()
    //NC_school_districts_layer: new L.layerGroup(),
    //SC_school_districts_layer: new L.layerGroup(),
}

var map = L.map("map", {
    center: [37.7749, -97.4194],
    zoom: 5,
    layers: [layers.two_thousand_layer, layers.two_thousand_five_layer, layers.two_thousand_ten_layer, layers.two_thousand_fifteen_layer,layers.CO_school_districts_layer,
    layers.AZ_school_districts_layer, layers.OK_school_districts_layer, layers.KY_school_districts_layer, layers.WV_school_districts_layer]
});

//setting open arrays available to take coordinates based on each year to create layers for each year
var two_thousand_funding = [];
var two_thousand_five_funding = [];
var two_thousand_ten_funding = [];
var two_thousand_fifteen_funding = [];


/*
// opening up csv file through d3
d3.csv("static/data/states.csv", function (error, fundingData) {
    if (error)
        throw error;

    fundingData.forEach(function (data) {
        data.YEAR = +data.YEAR;
        data.STATE = data.STATE;
        data.ENROLL = +data.ENROLL;
        data.TOTAL_REVENUE = +data.TOTAL_REVENUE;
        data.Funding_Per_Enrollment = +data.Funding_Per_Enrollment;
        data.FEDERAL_REVENUE = +data.FEDERAL_REVENUE;
        data.STATE_REVENUE = +data.STATE_REVENUE;
        data.LOCAL_REVENUE = +data.LOCAL_REVENUE;
        data.TOTAL_EXPENDITURE = +data.TOTAL_EXPENDITURE;
        data.INSTRUCTION_EXPENDITURE = +data.INSTRUCTION_EXPENDITURE;
        data.SUPPORT_SERVICES_EXPENDITURE = +data.SUPPORT_SERVICES_EXPENDITURE;
        data.OTHER_EXPENDITURE = +data.OTHER_EXPENDITURE;
        data.CAPITAL_OUTLAY_EXPENDITURE = data.CAPITAL_OUTLAY_EXPENDITURE;
    });
*/

// 
var url2 = "/states2";
d3.json(url2, function(fundingData) {

    for (var i = 0; i < fundingData.length; i++) {
   
        // loop through the csv file and input the data i want into an array

        var year_to_use = fundingData[i].Year;

        switch (year_to_use) {
            case 2000:
                two_thousand_funding.push(
                    [fundingData[i].State, fundingData[i].Funding_Per_Enrollment, fundingData[i].Total_Revenue]
                );
                //alert(fundingData[i].State +"  +++ "+ fundingData[i].Funding_Per_Enrollment+" --- "+fundingData[i].Total_Revenue)
                break;

            case 2005:
                two_thousand_five_funding.push(
                    [fundingData[i].State, fundingData[i].Funding_Per_Enrollment,fundingData[i].Total_Revenue]
                );
                break;

            case 2010:
                two_thousand_ten_funding.push(
                    [fundingData[i].State, fundingData[i].Funding_Per_Enrollment, fundingData[i].Total_Revenue]
                );
                break;

            case 2015:
                two_thousand_fifteen_funding.push(
                    [fundingData[i].State, fundingData[i].Funding_Per_Enrollment, fundingData[i].Total_Revenue]
                );
                break;
        }

    };
    runit();
});


function runit(init) {

    two_thousand_layer = L.layerGroup(two_thousand_layer_data)
    two_thousand_five_layer = L.layerGroup(two_thousand_five_layer_data)
    two_thousand_ten_layer = L.layerGroup(two_thousand_ten_layer_data)
    two_thousand_fifteen_layer = L.layerGroup(two_thousand_fifteen_layer_data)
    CO_school_districts_layer = L.layerGroup(CO_school_districts_layer_data)
    AZ_school_districts_layer = L.layerGroup(AZ_school_districts_layer_data)
    OK_school_districts_layer = L.layerGroup(OK_school_districts_layer_data)
    KY_school_districts_layer = L.layerGroup(KY_school_districts_layer_data)
    //VA_school_districts_layer = L.layerGroup(VA_school_districts_layer_data)
    WV_school_districts_layer = L.layerGroup(WV_school_districts_layer_data)
    //NC_school_districts_layer = L.layerGroup(NC_school_districts_layer_data)
    //SC_school_districts_layer = L.layerGroup(SC_school_districts_layer_data)



    var ots = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    }).addTo(map);

    var ten = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    }).addTo(map);

    var fifteen = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    }).addTo(map);


    var baseMaps = {
        Satellite: ots,
        Dark: ten,
        Light: fifteen
    };


    var overlayMaps = {
        2000: layers.two_thousand_layer,
        2005: layers.two_thousand_five_layer,
        2010: layers.two_thousand_ten_layer,
        2015: layers.two_thousand_fifteen_layer,
        CO_School_Districts: layers.CO_school_districts_layer,
        AZ_School_Districts: layers.AZ_school_districts_layer,
        OK_School_Districts: layers.OK_school_districts_layer,
        KY_School_Districts: layers.KY_school_districts_layer,
        //VA_School_Districts: layers.VA_school_districts_layer,
        WV_School_Districts: layers.WV_school_districts_layer
        //NC_School_Districts: layers.NC_school_districts_layer,
        //SC_School_Districts: layers.SC_school_districts_layer
    };

    function getFundingValue(nameX) {
      //  alert(nameX);
        var strName = chooseColor2000(nameX);
        // alert(strName);
        strName= strName+"|";
        if (strName != null || strName != undefined)
           // alert("null")
            var array1 = strName.split("|");
            return array1[0];

        return 1;
        
    }


     function getColor(Funding_Per_Enrollment) {
       // alert(Funding_Per_Enrollment +" ---- ");
        return Funding_Per_Enrollment >= 27 ? '#F901DD' :
            Funding_Per_Enrollment >= 24 ? '#DA33D2' :
                Funding_Per_Enrollment >= 21 ? '#F151EA' :
                    Funding_Per_Enrollment >= 18 ? '#F781F2' :
                        Funding_Per_Enrollment >= 15 ? '#7E2EE2' :
                            Funding_Per_Enrollment >= 12 ? '#9340FB' :
                                Funding_Per_Enrollment >= 9 ? '#BF8FFB' :
                                    Funding_Per_Enrollment >= 6 ? '#31B0E7' :
                                        Funding_Per_Enrollment >= 3 ? '#5CCDFD' :
                                            Funding_Per_Enrollment >= 0 ? '#AEE6FE' :
                                                '#FFFFFF';
    }



    function chooseOpactiy2000(name) {

        switch (name) {
            case statesData.features[2].properties.name:
                return (0.7);
            case statesData.features[5].properties.name:
                return (0.7);
            case statesData.features[17].properties.name:
                return (0.7);
            case statesData.features[33].properties.name:
                return (0.7);
            case statesData.features[36].properties.name:
                return (0.7);
            case statesData.features[40].properties.name:
                return (0.7);
            case statesData.features[46].properties.name:
                return (0.7);
            case statesData.features[48].properties.name:
                return (0.7);
            default:
                return 0.1;
        }
    };

    function chooseColor2000(name) {
       
       
        switch (name) {
            case statesData.features[0].properties.name:
                return (two_thousand_funding[0][1]+ "|" + two_thousand_funding[0][2]);
            case statesData.features[1].properties.name:
                return (two_thousand_funding[1][1]+ "|" + two_thousand_funding[1][2]);
            case statesData.features[2].properties.name:
                return (two_thousand_funding[2][1]+ "|" + two_thousand_funding[2][2]);
            case statesData.features[3].properties.name:
                return (two_thousand_funding[3][1]+ "|" + two_thousand_funding[3][2]);
            case statesData.features[4].properties.name:
                return (two_thousand_funding[4][1]+ "|" + two_thousand_funding[4][2]);
            case statesData.features[5].properties.name:
                return (two_thousand_funding[5][1]+ "|" + two_thousand_funding[5][2]);
            case statesData.features[6].properties.name:
                return (two_thousand_funding[6][1]+ "|" + two_thousand_funding[6][2]);
            case statesData.features[7].properties.name:
                return (two_thousand_funding[7][1]+ "|" + two_thousand_funding[7][2]);
            case statesData.features[8].properties.name:
                return (two_thousand_funding[8][1]+ "|" + two_thousand_funding[8][2]);
            case statesData.features[9].properties.name:
                return (two_thousand_funding[9][1]+ "|" + two_thousand_funding[9][2]);
            case statesData.features[10].properties.name:
                return (two_thousand_funding[10][1]+ "|" + two_thousand_funding[10][2]);
            case statesData.features[11].properties.name:
                return (two_thousand_funding[11][1]+ "|" + two_thousand_funding[11][2]);
            case statesData.features[12].properties.name:
                return (two_thousand_funding[12][1]+ "|" + two_thousand_funding[12][2]);
            case statesData.features[13].properties.name:
                return (two_thousand_funding[13][1]+ "|" + two_thousand_funding[13][2]);
            case statesData.features[14].properties.name:
                return (two_thousand_funding[14][1]+ "|" + two_thousand_funding[14][2]);
            case statesData.features[15].properties.name:
                return (two_thousand_funding[15][1]+ "|" + two_thousand_funding[15][2]);
            case statesData.features[16].properties.name:
                return (two_thousand_funding[16][1]+ "|" + two_thousand_funding[16][2]);
            case statesData.features[17].properties.name:
                return (two_thousand_funding[17][1]+ "|" + two_thousand_funding[17][2]);
            case statesData.features[18].properties.name:
                return (two_thousand_funding[18][1]+ "|" + two_thousand_funding[18][2]);
            case statesData.features[19].properties.name:
                return (two_thousand_funding[19][1]+ "|" + two_thousand_funding[19][2]);
            case statesData.features[20].properties.name:
                return (two_thousand_funding[20][1]+ "|" + two_thousand_funding[20][2]);
            case statesData.features[21].properties.name:
                return (two_thousand_funding[21][1]+ "|" + two_thousand_funding[21][2]);
            case statesData.features[22].properties.name:
                return (two_thousand_funding[22][1]+ "|" + two_thousand_funding[22][2]);
            case statesData.features[23].properties.name:
                return (two_thousand_funding[23][1]+ "|" + two_thousand_funding[23][2]);
            case statesData.features[24].properties.name:
                return (two_thousand_funding[24][1]+ "|" + two_thousand_funding[24][2]);
            case statesData.features[25].properties.name:
                return (two_thousand_funding[25][1]+ "|" + two_thousand_funding[25][2]);
            case statesData.features[26].properties.name:
                return (two_thousand_funding[26][1]+ "|" + two_thousand_funding[26][2]);
            case statesData.features[27].properties.name:
                return (two_thousand_funding[27][1]+ "|" + two_thousand_funding[27][2]);
            case statesData.features[28].properties.name:
                return (two_thousand_funding[28][1]+ "|" + two_thousand_funding[28][2]);
            case statesData.features[29].properties.name:
                return (two_thousand_funding[29][1]+ "|" + two_thousand_funding[29][2]);
            case statesData.features[30].properties.name:
                return (two_thousand_funding[30][1]+ "|" + two_thousand_funding[30][2]);
            case statesData.features[31].properties.name:
                return (two_thousand_funding[31][1]+ "|" + two_thousand_funding[31][2]);
            case statesData.features[32].properties.name:
                return (two_thousand_funding[32][1]+ "|" + two_thousand_funding[32][2]);
            case statesData.features[33].properties.name:
                return (two_thousand_funding[33][1]+ "|" + two_thousand_funding[33][2]);
            case statesData.features[34].properties.name:
                return (two_thousand_funding[34][1]+ "|" + two_thousand_funding[34][2]);
            case statesData.features[35].properties.name:
                return (two_thousand_funding[35][1]+ "|" + two_thousand_funding[35][2]);
            case statesData.features[36].properties.name:
                return (two_thousand_funding[36][1]+ "|" + two_thousand_funding[36][2]);
            case statesData.features[37].properties.name:
                return (two_thousand_funding[37][1]+ "|" + two_thousand_funding[37][2]);
            case statesData.features[38].properties.name:
                return (two_thousand_funding[38][1]+ "|" + two_thousand_funding[38][2]);
            case statesData.features[39].properties.name:
                return (two_thousand_funding[39][1]+ "|" + two_thousand_funding[39][2]);
            case statesData.features[40].properties.name:
                return (two_thousand_funding[40][1]+ "|" + two_thousand_funding[40][2]);
            case statesData.features[41].properties.name:
                return (two_thousand_funding[41][1]+ "|" + two_thousand_funding[41][2]);
            case statesData.features[42].properties.name:
                return (two_thousand_funding[42][1]+ "|" + two_thousand_funding[42][2]);
            case statesData.features[43].properties.name:
                return (two_thousand_funding[43][1]+ "|" + two_thousand_funding[43][2]);
            case statesData.features[44].properties.name:
                return (two_thousand_funding[44][1]+ "|" + two_thousand_funding[44][2]);
            case statesData.features[45].properties.name:
                return (two_thousand_funding[45][1]+ "|" + two_thousand_funding[45][2]);
            case statesData.features[46].properties.name:
                return (two_thousand_funding[46][1]+ "|" + two_thousand_funding[46][2]);
            case statesData.features[47].properties.name:
                return (two_thousand_funding[47][1]+ "|" + two_thousand_funding[47][2]);
            case statesData.features[48].properties.name:
                return (two_thousand_funding[48][1]+ "|" + two_thousand_funding[48][2]);
            case statesData.features[49].properties.name:
                return (two_thousand_funding[49][1]+ "|" + two_thousand_funding[49][2]);
            case statesData.features[50].properties.name:
                return (two_thousand_funding[50][1]+ "|" + two_thousand_funding[50][2]);
            default:
                return "#FFFFFF";
        }
    };


    var two_thousand_layer_data =
        L.geoJSON(statesData, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    // color: "white",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                    fillColor: getColor(getFundingValue(feature.properties.name)),
                    fillOpacity: chooseOpactiy2000(feature.properties.name),
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.on({
                    // Change when mouse goes over state
                    mouseover: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                        //layer.bindTooltip("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment *****" + "</h2> <hr> <h3>" + chooseColor2000(feature.properties.name) + "</h3>");
                        var str = chooseColor2000(feature.properties.name);
                        var array = str.split("|");
                        layer.bindTooltip("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + array[0] +"</h3>" + "<hr> <h2>" + "Total Revenue" + "</h2> <hr> <h3>" + array[1] +"</h3>");
                    },
                    // Return opacity back to normal
                    mouseout: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: chooseOpactiy2000(feature.properties.name)
                        });
                    },
                    // When a feature (state) is clicked, it is enlarged to fit the screen
                    click: function (event) {
                        map.fitBounds(event.target.getBounds());
                    }
                });
                // Giving each feature a pop-up with information pertinent to it
                // layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2000(feature.properties.name) + "</h3>");

            }
    }).addTo(layers.two_thousand_layer);


    function chooseOpactiy2005(name) {

        switch (name) {
            case statesData.features[2].properties.name:
                return (0.7);
            case statesData.features[5].properties.name:
                return (0.7);
            case statesData.features[17].properties.name:
                return (0.7);
            case statesData.features[33].properties.name:
                return (0.7);
            case statesData.features[36].properties.name:
                return (0.7);
            case statesData.features[40].properties.name:
                return (0.7);
            case statesData.features[46].properties.name:
                return (0.7);
            case statesData.features[48].properties.name:
                return (0.7);
            default:
                return 0.1;
        }
    };

    function chooseColor2005(name) {

        switch (name) {
            case statesData.features[0].properties.name:
                return (two_thousand_five_funding[0][1]+ "|" + two_thousand_five_funding[0][2]);
            case statesData.features[1].properties.name:
                return (two_thousand_five_funding[1][1]+ "|" + two_thousand_five_funding[1][2]);
            case statesData.features[2].properties.name:
                return (two_thousand_five_funding[2][1]+ "|" + two_thousand_five_funding[2][2]);
            case statesData.features[3].properties.name:
                return (two_thousand_five_funding[3][1]+ "|" + two_thousand_five_funding[3][2]);
            case statesData.features[4].properties.name:
                return (two_thousand_five_funding[4][1]+ "|" + two_thousand_five_funding[4][2]);
            case statesData.features[5].properties.name:
                return (two_thousand_five_funding[5][1]+ "|" + two_thousand_five_funding[5][2]);
            case statesData.features[6].properties.name:
                return (two_thousand_five_funding[6][1]+ "|" + two_thousand_five_funding[6][2]);
            case statesData.features[7].properties.name:
                return (two_thousand_five_funding[7][1]+ "|" + two_thousand_five_funding[7][2]);
            case statesData.features[8].properties.name:
                return (two_thousand_five_funding[8][1]+ "|" + two_thousand_five_funding[8][2]);
            case statesData.features[9].properties.name:
                return (two_thousand_five_funding[9][1]+ "|" + two_thousand_five_funding[9][2]);
            case statesData.features[10].properties.name:
                return (two_thousand_five_funding[10][1]+ "|" + two_thousand_five_funding[10][2]);
            case statesData.features[11].properties.name:
                return (two_thousand_five_funding[11][1]+ "|" + two_thousand_five_funding[11][2]);
            case statesData.features[12].properties.name:
                return (two_thousand_five_funding[12][1]+ "|" + two_thousand_five_funding[12][2]);
            case statesData.features[13].properties.name:
                return (two_thousand_five_funding[13][1]+ "|" + two_thousand_five_funding[13][2]);
            case statesData.features[14].properties.name:
                return (two_thousand_five_funding[14][1]+ "|" + two_thousand_five_funding[14][2]);
            case statesData.features[15].properties.name:
                return (two_thousand_five_funding[15][1]+ "|" + two_thousand_five_funding[15][2]);
            case statesData.features[16].properties.name:
                return (two_thousand_five_funding[16][1]+ "|" + two_thousand_five_funding[16][2]);
            case statesData.features[17].properties.name:
                return (two_thousand_five_funding[17][1]+ "|" + two_thousand_five_funding[17][2]);
            case statesData.features[18].properties.name:
                return (two_thousand_five_funding[18][1]+ "|" + two_thousand_five_funding[18][2]);
            case statesData.features[19].properties.name:
                return (two_thousand_five_funding[19][1]+ "|" + two_thousand_five_funding[19][2]);
            case statesData.features[20].properties.name:
                return (two_thousand_five_funding[20][1]+ "|" + two_thousand_five_funding[20][2]);
            case statesData.features[21].properties.name:
                return (two_thousand_five_funding[21][1]+ "|" + two_thousand_five_funding[21][2]);
            case statesData.features[22].properties.name:
                return (two_thousand_five_funding[22][1]+ "|" + two_thousand_five_funding[22][2]);
            case statesData.features[23].properties.name:
                return (two_thousand_five_funding[23][1]+ "|" + two_thousand_five_funding[23][2]);
            case statesData.features[24].properties.name:
                return (two_thousand_five_funding[24][1]+ "|" + two_thousand_five_funding[24][2]);
            case statesData.features[25].properties.name:
                return (two_thousand_five_funding[25][1]+ "|" + two_thousand_five_funding[25][2]);
            case statesData.features[26].properties.name:
                return (two_thousand_five_funding[26][1]+ "|" + two_thousand_five_funding[26][2]);
            case statesData.features[27].properties.name:
                return (two_thousand_five_funding[27][1]+ "|" + two_thousand_five_funding[27][2]);
            case statesData.features[28].properties.name:
                return (two_thousand_five_funding[28][1]+ "|" + two_thousand_five_funding[28][2]);
            case statesData.features[29].properties.name:
                return (two_thousand_five_funding[29][1]+ "|" + two_thousand_five_funding[29][2]);
            case statesData.features[30].properties.name:
                return (two_thousand_five_funding[30][1]+ "|" + two_thousand_five_funding[30][2]);
            case statesData.features[31].properties.name:
                return (two_thousand_five_funding[31][1]+ "|" + two_thousand_five_funding[31][2]);
            case statesData.features[32].properties.name:
                return (two_thousand_five_funding[32][1]+ "|" + two_thousand_five_funding[32][2]);
            case statesData.features[33].properties.name:
                return (two_thousand_five_funding[33][1]+ "|" + two_thousand_five_funding[33][2]);
            case statesData.features[34].properties.name:
                return (two_thousand_five_funding[34][1]+ "|" + two_thousand_five_funding[34][2]);
            case statesData.features[35].properties.name:
                return (two_thousand_five_funding[35][1]+ "|" + two_thousand_five_funding[35][2]);
            case statesData.features[36].properties.name:
                return (two_thousand_five_funding[36][1]+ "|" + two_thousand_five_funding[36][2]);
            case statesData.features[37].properties.name:
                return (two_thousand_five_funding[37][1]+ "|" + two_thousand_five_funding[37][2]);
            case statesData.features[38].properties.name:
                return (two_thousand_five_funding[38][1]+ "|" + two_thousand_five_funding[38][2]);
            case statesData.features[39].properties.name:
                return (two_thousand_five_funding[39][1]+ "|" + two_thousand_five_funding[39][2]);
            case statesData.features[40].properties.name:
                return (two_thousand_five_funding[40][1]+ "|" + two_thousand_five_funding[40][2]);
            case statesData.features[41].properties.name:
                return (two_thousand_five_funding[41][1]+ "|" + two_thousand_five_funding[41][2]);
            case statesData.features[42].properties.name:
                return (two_thousand_five_funding[42][1]+ "|" + two_thousand_five_funding[42][2]);
            case statesData.features[43].properties.name:
                return (two_thousand_five_funding[43][1]+ "|" + two_thousand_five_funding[43][2]);
            case statesData.features[44].properties.name:
                return (two_thousand_five_funding[44][1]+ "|" + two_thousand_five_funding[44][2]);
            case statesData.features[45].properties.name:
                return (two_thousand_five_funding[45][1]+ "|" + two_thousand_five_funding[45][2]);
            case statesData.features[46].properties.name:
                return (two_thousand_five_funding[46][1]+ "|" + two_thousand_five_funding[46][2]);
            case statesData.features[47].properties.name:
                return (two_thousand_five_funding[47][1]+ "|" + two_thousand_five_funding[47][2]);
            case statesData.features[48].properties.name:
                return (two_thousand_five_funding[48][1]+ "|" + two_thousand_five_funding[48][2]);
            case statesData.features[49].properties.name:
                return (two_thousand_five_funding[49][1]+ "|" + two_thousand_five_funding[49][2]);
            case statesData.features[50].properties.name:
                return (two_thousand_five_funding[50][1]+ "|" + two_thousand_five_funding[50][2]);
            default:
                return "#FFFFFF";
        }
    };


    var two_thousand_five_layer_data =
        L.geoJSON(statesData, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    // color: "white",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                    fillColor: getColor(getFundingValue(feature.properties.name)),
                    fillOpacity: chooseOpactiy2005(feature.properties.name),
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.on({
                    // Change when mouse goes over state
                    mouseover: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                       // layer.bindTooltip("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2005(feature.properties.name) + "</h3>");
                        var str = chooseColor2005(feature.properties.name);
                        var array = str.split("|");
                        
                        layer.bindTooltip("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + array[0] +"</h3>" + "<hr> <h2>" + "Total Revenue" + "</h2> <hr> <h3>" + array[1] +"</h3>");
                    },
                    // Return opacity back to normal
                    mouseout: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: chooseOpactiy2005(feature.properties.name)
                        });
                    },
                    // When a feature (state) is clicked, it is enlarged to fit the screen
                    click: function (event) {
                        map.fitBounds(event.target.getBounds());
                    }
                });
                // Giving each feature a pop-up with information pertinent to it
                //layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2005(feature.properties.name) + "</h3>");

            }
    }).addTo(layers.two_thousand_five_layer);



    function chooseOpactiy2010(name) {

        switch (name) {
            case statesData.features[2].properties.name:
                return (0.7);
            case statesData.features[5].properties.name:
                return (0.7);
            case statesData.features[17].properties.name:
                return (0.7);
            case statesData.features[33].properties.name:
                return (0.7);
            case statesData.features[36].properties.name:
                return (0.7);
            case statesData.features[40].properties.name:
                return (0.7);
            case statesData.features[46].properties.name:
                return (0.7);
            case statesData.features[48].properties.name:
                return (0.7);
            default:
                return 0.1;
        }
    };


    function chooseColor2010(name) {

        switch (name) {
            case statesData.features[0].properties.name:
                return (two_thousand_ten_funding[0][1]+ "|" + two_thousand_ten_funding[0][2]);
            case statesData.features[1].properties.name:
                return (two_thousand_ten_funding[1][1]+ "|" + two_thousand_ten_funding[1][2]);
            case statesData.features[2].properties.name:
                return (two_thousand_ten_funding[2][1]+ "|" + two_thousand_ten_funding[2][2]);
            case statesData.features[3].properties.name:
                return (two_thousand_ten_funding[3][1]+ "|" + two_thousand_ten_funding[3][2]);
            case statesData.features[4].properties.name:
                return (two_thousand_ten_funding[4][1]+ "|" + two_thousand_ten_funding[4][2]);
            case statesData.features[5].properties.name:
                return (two_thousand_ten_funding[5][1]+ "|" + two_thousand_ten_funding[5][2]);
            case statesData.features[6].properties.name:
                return (two_thousand_ten_funding[6][1]+ "|" + two_thousand_ten_funding[6][2]);
            case statesData.features[7].properties.name:
                return (two_thousand_ten_funding[7][1]+ "|" + two_thousand_ten_funding[7][2]);
            case statesData.features[8].properties.name:
                return (two_thousand_ten_funding[8][1]+ "|" + two_thousand_ten_funding[8][2]);
            case statesData.features[9].properties.name:
                return (two_thousand_ten_funding[9][1]+ "|" + two_thousand_ten_funding[9][2]);
            case statesData.features[10].properties.name:
                return (two_thousand_ten_funding[10][1]+ "|" + two_thousand_ten_funding[10][2]);
            case statesData.features[11].properties.name:
                return (two_thousand_ten_funding[11][1]+ "|" + two_thousand_ten_funding[11][2]);
            case statesData.features[12].properties.name:
                return (two_thousand_ten_funding[12][1]+ "|" + two_thousand_ten_funding[12][2]);
            case statesData.features[13].properties.name:
                return (two_thousand_ten_funding[13][1]+ "|" + two_thousand_ten_funding[13][2]);
            case statesData.features[14].properties.name:
                return (two_thousand_ten_funding[14][1]+ "|" + two_thousand_ten_funding[14][2]);
            case statesData.features[15].properties.name:
                return (two_thousand_ten_funding[15][1]+ "|" + two_thousand_ten_funding[15][2]);
            case statesData.features[16].properties.name:
                return (two_thousand_ten_funding[16][1]+ "|" + two_thousand_ten_funding[16][2]);
            case statesData.features[17].properties.name:
                return (two_thousand_ten_funding[17][1]+ "|" + two_thousand_ten_funding[17][2]);
            case statesData.features[18].properties.name:
                return (two_thousand_ten_funding[18][1]+ "|" + two_thousand_ten_funding[18][2]);
            case statesData.features[19].properties.name:
                return (two_thousand_ten_funding[19][1]+ "|" + two_thousand_ten_funding[19][2]);
            case statesData.features[20].properties.name:
                return (two_thousand_ten_funding[20][1]+ "|" + two_thousand_ten_funding[20][2]);
            case statesData.features[21].properties.name:
                return (two_thousand_ten_funding[21][1]+ "|" + two_thousand_ten_funding[21][2]);
            case statesData.features[22].properties.name:
                return (two_thousand_ten_funding[22][1]+ "|" + two_thousand_ten_funding[22][2]);
            case statesData.features[23].properties.name:
                return (two_thousand_ten_funding[23][1]+ "|" + two_thousand_ten_funding[23][2]);
            case statesData.features[24].properties.name:
                return (two_thousand_ten_funding[24][1]+ "|" + two_thousand_ten_funding[24][2]);
            case statesData.features[25].properties.name:
                return (two_thousand_ten_funding[25][1]+ "|" + two_thousand_ten_funding[25][2]);
            case statesData.features[26].properties.name:
                return (two_thousand_ten_funding[26][1]+ "|" + two_thousand_ten_funding[26][2]);
            case statesData.features[27].properties.name:
                return (two_thousand_ten_funding[27][1]+ "|" + two_thousand_ten_funding[27][2]);
            case statesData.features[28].properties.name:
                return (two_thousand_ten_funding[28][1]+ "|" + two_thousand_ten_funding[28][2]);
            case statesData.features[29].properties.name:
                return (two_thousand_ten_funding[29][1]+ "|" + two_thousand_ten_funding[29][2]);
            case statesData.features[30].properties.name:
                return (two_thousand_ten_funding[30][1]+ "|" + two_thousand_ten_funding[30][2]);
            case statesData.features[31].properties.name:
                return (two_thousand_ten_funding[31][1]+ "|" + two_thousand_ten_funding[31][2]);
            case statesData.features[32].properties.name:
                return (two_thousand_ten_funding[32][1]+ "|" + two_thousand_ten_funding[32][2]);
            case statesData.features[33].properties.name:
                return (two_thousand_ten_funding[33][1]+ "|" + two_thousand_ten_funding[33][2]);
            case statesData.features[34].properties.name:
                return (two_thousand_ten_funding[34][1]+ "|" + two_thousand_ten_funding[34][2]);
            case statesData.features[35].properties.name:
                return (two_thousand_ten_funding[35][1]+ "|" + two_thousand_ten_funding[35][2]);
            case statesData.features[36].properties.name:
                return (two_thousand_ten_funding[36][1]+ "|" + two_thousand_ten_funding[36][2]);
            case statesData.features[37].properties.name:
                return (two_thousand_ten_funding[37][1]+ "|" + two_thousand_ten_funding[37][2]);
            case statesData.features[38].properties.name:
                return (two_thousand_ten_funding[38][1]+ "|" + two_thousand_ten_funding[38][2]);
            case statesData.features[39].properties.name:
                return (two_thousand_ten_funding[39][1]+ "|" + two_thousand_ten_funding[39][2]);
            case statesData.features[40].properties.name:
                return (two_thousand_ten_funding[40][1]+ "|" + two_thousand_ten_funding[40][2]);
            case statesData.features[41].properties.name:
                return (two_thousand_ten_funding[41][1]+ "|" + two_thousand_ten_funding[41][2]);
            case statesData.features[42].properties.name:
                return (two_thousand_ten_funding[42][1]+ "|" + two_thousand_ten_funding[42][2]);
            case statesData.features[43].properties.name:
                return (two_thousand_ten_funding[43][1]+ "|" + two_thousand_ten_funding[43][2]);
            case statesData.features[44].properties.name:
                return (two_thousand_ten_funding[44][1]+ "|" + two_thousand_ten_funding[44][2]);
            case statesData.features[45].properties.name:
                return (two_thousand_ten_funding[45][1]+ "|" + two_thousand_ten_funding[45][2]);
            case statesData.features[46].properties.name:
                return (two_thousand_ten_funding[46][1]+ "|" + two_thousand_ten_funding[46][2]);
            case statesData.features[47].properties.name:
                return (two_thousand_ten_funding[47][1]+ "|" + two_thousand_ten_funding[47][2]);
            case statesData.features[48].properties.name:
                return (two_thousand_ten_funding[48][1]+ "|" + two_thousand_ten_funding[48][2]);
            case statesData.features[49].properties.name:
                return (two_thousand_ten_funding[49][1]+ "|" + two_thousand_ten_funding[49][2]);
            case statesData.features[50].properties.name:
                return (two_thousand_ten_funding[50][1])+ "|" + two_thousand_ten_funding[50][2];
            default:
                return "#FFFFFF";
        }
    };



    var two_thousand_ten_layer_data =
        L.geoJSON(statesData, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    // color: "white",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                    fillColor: getColor(getFundingValue(feature.properties.name)),
                    fillOpacity: chooseOpactiy2010(feature.properties.name),
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.on({
                    // Change when mouse goes over state
                    mouseover: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                       // layer.bindTooltip("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2010(feature.properties.name) + "</h3>");
                        var str = chooseColor2010(feature.properties.name);
                        var array = str.split("|");
                        
                        layer.bindTooltip("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + array[0] +"</h3>" + "<hr> <h2>" + "Total Revenue" + "</h2> <hr> <h3>" + array[1] +"</h3>");
                    },
                    // Return opacity back to normal
                    mouseout: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: chooseOpactiy2010(feature.properties.name)
                        });
                    },
                    // When a feature (state) is clicked, it is enlarged to fit the screen
                    click: function (event) {
                        map.fitBounds(event.target.getBounds());
                    }
                });
                // Giving each feature a pop-up with information pertinent to it
                // layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2010(feature.properties.name) + "</h3>");

            }
    }).addTo(layers.two_thousand_ten_layer);


    function chooseOpactiy2015(name) {

        switch (name) {
            case statesData.features[2].properties.name:
                return (0.7);
            case statesData.features[5].properties.name:
                return (0.7);
            case statesData.features[17].properties.name:
                return (0.7);
            case statesData.features[33].properties.name:
                return (0.7);
            case statesData.features[36].properties.name:
                return (0.7);
            case statesData.features[40].properties.name:
                return (0.7);
            case statesData.features[46].properties.name:
                return (0.7);
            case statesData.features[48].properties.name:
                return (0.7);
            default:
                return 0.1;
        }
    };

    function chooseColor2015(name) {

        switch (name) {
            case statesData.features[0].properties.name:
                return (two_thousand_fifteen_funding[0][1]+ "|" + two_thousand_fifteen_funding[0][2]);
            case statesData.features[1].properties.name:
                return (two_thousand_fifteen_funding[1][1]+ "|" + two_thousand_fifteen_funding[1][2]);
            case statesData.features[2].properties.name:
                return (two_thousand_fifteen_funding[2][1]+ "|" + two_thousand_fifteen_funding[2][2]);
            case statesData.features[3].properties.name:
                return (two_thousand_fifteen_funding[3][1]+ "|" + two_thousand_fifteen_funding[3][2]);
            case statesData.features[4].properties.name:
                return (two_thousand_fifteen_funding[4][1]+ "|" + two_thousand_fifteen_funding[4][2]);
            case statesData.features[5].properties.name:
                return (two_thousand_fifteen_funding[5][1]+ "|" + two_thousand_fifteen_funding[5][2]);
            case statesData.features[6].properties.name:
                return (two_thousand_fifteen_funding[6][1]+ "|" + two_thousand_fifteen_funding[6][2]);
            case statesData.features[7].properties.name:
                return (two_thousand_fifteen_funding[7][1]+ "|" + two_thousand_fifteen_funding[7][2]);
            case statesData.features[8].properties.name:
                return (two_thousand_fifteen_funding[8][1]+ "|" + two_thousand_fifteen_funding[8][2]);
            case statesData.features[9].properties.name:
                return (two_thousand_fifteen_funding[9][1]+ "|" + two_thousand_fifteen_funding[9][2]);
            case statesData.features[10].properties.name:
                return (two_thousand_fifteen_funding[10][1]+ "|" + two_thousand_fifteen_funding[10][2]);
            case statesData.features[11].properties.name:
                return (two_thousand_fifteen_funding[11][1]+ "|" + two_thousand_fifteen_funding[11][2]);
            case statesData.features[12].properties.name:
                return (two_thousand_fifteen_funding[12][1]+ "|" + two_thousand_fifteen_funding[12][2]);
            case statesData.features[13].properties.name:
                return (two_thousand_fifteen_funding[13][1]+ "|" + two_thousand_fifteen_funding[13][2]);
            case statesData.features[14].properties.name:
                return (two_thousand_fifteen_funding[14][1]+ "|" + two_thousand_fifteen_funding[14][2]);
            case statesData.features[15].properties.name:
                return (two_thousand_fifteen_funding[15][1]+ "|" + two_thousand_fifteen_funding[15][2]);
            case statesData.features[16].properties.name:
                return (two_thousand_fifteen_funding[16][1]+ "|" + two_thousand_fifteen_funding[16][2]);
            case statesData.features[17].properties.name:
                return (two_thousand_fifteen_funding[17][1]+ "|" + two_thousand_fifteen_funding[17][2]);
            case statesData.features[18].properties.name:
                return (two_thousand_fifteen_funding[18][1]+ "|" + two_thousand_fifteen_funding[18][2]);
            case statesData.features[19].properties.name:
                return (two_thousand_fifteen_funding[19][1]+ "|" + two_thousand_fifteen_funding[19][2]);
            case statesData.features[20].properties.name:
                return (two_thousand_fifteen_funding[20][1]+ "|" + two_thousand_fifteen_funding[20][2]);
            case statesData.features[21].properties.name:
                return (two_thousand_fifteen_funding[21][1]+ "|" + two_thousand_fifteen_funding[21][2]);
            case statesData.features[22].properties.name:
                return (two_thousand_fifteen_funding[22][1]+ "|" + two_thousand_fifteen_funding[22][2]);
            case statesData.features[23].properties.name:
                return (two_thousand_fifteen_funding[23][1]+ "|" + two_thousand_fifteen_funding[23][2]);
            case statesData.features[24].properties.name:
                return (two_thousand_fifteen_funding[24][1]+ "|" + two_thousand_fifteen_funding[24][2]);
            case statesData.features[25].properties.name:
                return (two_thousand_fifteen_funding[25][1]+ "|" + two_thousand_fifteen_funding[25][2]);
            case statesData.features[26].properties.name:
                return (two_thousand_fifteen_funding[26][1]+ "|" + two_thousand_fifteen_funding[26][2]);
            case statesData.features[27].properties.name:
                return (two_thousand_fifteen_funding[27][1]+ "|" + two_thousand_fifteen_funding[27][2]);
            case statesData.features[28].properties.name:
                return (two_thousand_fifteen_funding[28][1]+ "|" + two_thousand_fifteen_funding[28][2]);
            case statesData.features[29].properties.name:
                return (two_thousand_fifteen_funding[29][1]+ "|" + two_thousand_fifteen_funding[29][2]);
            case statesData.features[30].properties.name:
                return (two_thousand_fifteen_funding[30][1]+ "|" + two_thousand_fifteen_funding[30][2]);
            case statesData.features[31].properties.name:
                return (two_thousand_fifteen_funding[31][1]+ "|" + two_thousand_fifteen_funding[31][2]);
            case statesData.features[32].properties.name:
                return (two_thousand_fifteen_funding[32][1]+ "|" + two_thousand_fifteen_funding[32][2]);
            case statesData.features[33].properties.name:
                return (two_thousand_fifteen_funding[33][1]+ "|" + two_thousand_fifteen_funding[33][2]);
            case statesData.features[34].properties.name:
                return (two_thousand_fifteen_funding[34][1]+ "|" + two_thousand_fifteen_funding[34][2]);
            case statesData.features[35].properties.name:
                return (two_thousand_fifteen_funding[35][1]+ "|" + two_thousand_fifteen_funding[35][2]);
            case statesData.features[36].properties.name:
                return (two_thousand_fifteen_funding[36][1]+ "|" + two_thousand_fifteen_funding[36][2]);
            case statesData.features[37].properties.name:
                return (two_thousand_fifteen_funding[37][1]+ "|" + two_thousand_fifteen_funding[37][2]);
            case statesData.features[38].properties.name:
                return (two_thousand_fifteen_funding[38][1]+ "|" + two_thousand_fifteen_funding[38][2]);
            case statesData.features[39].properties.name:
                return (two_thousand_fifteen_funding[39][1]+ "|" + two_thousand_fifteen_funding[39][2]);
            case statesData.features[40].properties.name:
                return (two_thousand_fifteen_funding[40][1]+ "|" + two_thousand_fifteen_funding[40][2]);
            case statesData.features[41].properties.name:
                return (two_thousand_fifteen_funding[41][1]+ "|" + two_thousand_fifteen_funding[41][2]);
            case statesData.features[42].properties.name:
                return (two_thousand_fifteen_funding[42][1]+ "|" + two_thousand_fifteen_funding[42][2]);
            case statesData.features[43].properties.name:
                return (two_thousand_fifteen_funding[43][1]+ "|" + two_thousand_fifteen_funding[43][2]);
            case statesData.features[44].properties.name:
                return (two_thousand_fifteen_funding[44][1]+ "|" + two_thousand_fifteen_funding[44][2]);
            case statesData.features[45].properties.name:
                return (two_thousand_fifteen_funding[45][1]+ "|" + two_thousand_fifteen_funding[45][2]);
            case statesData.features[46].properties.name:
                return (two_thousand_fifteen_funding[46][1]+ "|" + two_thousand_fifteen_funding[46][2]);
            case statesData.features[47].properties.name:
                return (two_thousand_fifteen_funding[47][1]+ "|" + two_thousand_fifteen_funding[47][2]);
            case statesData.features[48].properties.name:
                return (two_thousand_fifteen_funding[48][1]+ "|" + two_thousand_fifteen_funding[48][2]);
            case statesData.features[49].properties.name:
                return (two_thousand_fifteen_funding[49][1]+ "|" + two_thousand_fifteen_funding[49][2]);
            case statesData.features[50].properties.name:
                return (two_thousand_fifteen_funding[50][1]+ "|" + two_thousand_fifteen_funding[50][2]);
            default:
                return "#FFFFFF";
        }
    };



    var two_thousand_fifteen_layer_data =
        L.geoJSON(statesData, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    // color: "white",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                    fillColor: getColor(getFundingValue(feature.properties.name)),
                    fillOpacity: chooseOpactiy2015(feature.properties.name),
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.on({
                    // Change when mouse goes over state
                    mouseover: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                        var str = chooseColor2015(feature.properties.name);
                        var array = str.split("|");
                        
                        layer.bindTooltip("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + array[0] +"</h3>" + "<hr> <h2>" + "Total Revenue" + "</h2> <hr> <h3>" + array[1] +"</h3>");
                    },
                    // Return opacity back to normal
                    mouseout: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: chooseOpactiy2015(feature.properties.name)
                        });
                    },
                    // When a feature (state) is clicked, it is enlarged to fit the screen
                    click: function (event) {
                        map.fitBounds(event.target.getBounds());
                    }
                });
                // Giving each feature a pop-up with information pertinent to it
                // layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2015(feature.properties.name) + "</h3>");

            }
    }).addTo(layers.two_thousand_fifteen_layer);




    var CO_school_districts_layer_data =
        L.geoJSON(colorado, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    color: "white",
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

            }
    }).addTo(layers.CO_school_districts_layer);


    var AZ_school_districts_layer_data =
        L.geoJSON(arizona, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    color: "white",
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

            }
    }).addTo(layers.AZ_school_districts_layer);

    var OK_school_districts_layer_data =
        L.geoJSON(oklahoma, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    color: "white",
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

            }
    }).addTo(layers.OK_school_districts_layer);

    var KY_school_districts_layer_data =
        L.geoJSON(kentucky, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    color: "white",
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

            }
    }).addTo(layers.KY_school_districts_layer);

    // var VA_school_districts_layer_data =
    //     L.geoJSON(virginia, {
    //         // Style each feature (in this case a neighborhood)
    //         style: function (feature) {
    //             return {
    //                 color: "white",
    //                 weight: 1.5
    //             };
    //         },
    //         onEachFeature: function (feature, layer) {
    //             // Set mouse events to change map styling
    //             layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per  sssssss Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

    //         }
    // }).addTo(layers.VA_school_districts_layer);

    var WV_school_districts_layer_data =
        L.geoJSON(west_virginia, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    color: "white",
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

            }
    }).addTo(layers.WV_school_districts_layer);


    // var NC_school_districts_layer_data =
    //     L.geoJSON(north_carolina, {
    //         // Style each feature (in this case a neighborhood)
    //         style: function (feature) {
    //             return {
    //                 color: "white",
    //                 weight: 1.5
    //             };
    //         },
    //         onEachFeature: function (feature, layer) {
    //             // Set mouse events to change map styling
    //             layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

    //         }
    //     }).addTo(layers.NC_school_districts_layer);

    //     var SC_school_districts_layer_data =
    //     L.geoJSON(south_carolina, {
    //         // Style each feature (in this case a neighborhood)
    //         style: function (feature) {
    //             return {
    //                 color: "white",
    //                 weight: 1.5
    //             };
    //         },
    //         onEachFeature: function (feature, layer) {
    //             // Set mouse events to change map styling
    //             layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + (feature.properties.name) + "</h3>");

    //         }
    // }).addTo(layers.SC_school_districts_layer);


    L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend"),
            fundingLimits = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
        labels = [];

        for (var i = 0; i < fundingLimits.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(fundingLimits[i] + 1) + '"></i> ' +
                fundingLimits[i] + (fundingLimits[i + 1] ? '&ndash;' + fundingLimits[i + 1] + '<br>' : '+');
        }

        return div;
    };
    // Adding legend to the map
    legend.addTo(map);
};