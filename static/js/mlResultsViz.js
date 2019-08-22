Plotly.d3.csv("https://raw.githubusercontent.com/somotos1/education_dive/master/static/data/prediction_vs_actual.csv", function(err, rows){
    // if (err) throw err;
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    var allStateNames = unpack(rows, 'State'),
    allYear = unpack(rows, 'Year'),
    allActualScores = unpack(rows, 'AverageScore'),
    allPredictedScores = unpack(rows, 'PredictedAvgScore'),
    allSubjects = unpack(rows, "Subject"),
    listofStates = [],
    currentState,
    currentActualScore = [],
    currentPredictedScore = [],
    currentYear = [];

    console.log(allStateNames);

    for (var i = 0; i < allStateNames.length; i++ ){
        if (listofStates.indexOf(allStateNames[i]) === -1 ){
            listofStates.push(allStateNames[i]);
        }
    }

    function getStateData(chosenState) {
        currentActualScore = [];
        currentPredictedScore = [];
        currentYear = [];
        for (var i = 0 ; i < allStateNames.length ; i++){
            if (allSubjects[i] === "Mathematics") {
                if ( allStateNames[i] === chosenState ) {
                currentActualScore.push(allActualScores[i]);
                currentPredictedScore.push(allPredictedScores[i]);
                currentYear.push(allYear[i]);
            }
        }
    }};

        // Default State Data
        setBubblePlot('Alabama');

        function setBubblePlot(chosenState) {
            getStateData(chosenState);
    
            var trace1 = {
                x: currentYear,
                y: currentActualScore,
                mode: 'lines+markers',
                name: 'Actual Score',
                marker: {
                    size: 12,
                    opacity: 0.5,
                    color: "#1380EC"
                }
            };

            var trace2 = {
                x: currentYear,
                y: currentPredictedScore,
                mode: 'lines+markers',
                name: 'Predicted Score',
                marker: {
                    size: 12,
                    opacity: 0.5,
                    color: "#FF69B4"
                }
            };

            var data = [trace1, trace2];

            var layout = {
                title:'2015 - 2017: Predicted Average Score vs Actual Average Score<br>'+ chosenState + ': Mathematics',
            };
    
            Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
        };

        var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        stateSelector = innerContainer.querySelector('.statedata');

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length;  i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        }
    
        assignOptions(listofStates, stateSelector);
    
        function updateState(){
            setBubblePlot(stateSelector.value);
        }
    
        stateSelector.addEventListener('change', updateState, false);
    });