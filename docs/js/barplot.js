function initializeBarPlot(modelOutput) {
    console.log("Initializing Bar Plot ...");

    anychart.onDocumentReady(function() {

        // Set the data
        /*var data = {
            header: ["Character", "Probability"],
            rows: [
            ["零", modelOutput[0]],
            ["一", modelOutput[1]],
            ["二", modelOutput[2]],
            ["三", modelOutput[3]],
            ["四", modelOutput[4]],
            ["五", modelOutput[5]],
            ["六", modelOutput[6]],
            ["七", modelOutput[7]],
            ["八", modelOutput[8]],
            ["九", modelOutput[9]],
            ["十", modelOutput[10]],
            ["百", modelOutput[11]],
            ["千", modelOutput[12]],
            ["万", modelOutput[13]],
            ["亿", modelOutput[14]],
        ]};*/

        var data = anychart.data.set([
            {x: "零", value: modelOutput[0]},
            {x: "一", value: modelOutput[1]},
            {x: "二", value: modelOutput[2]},
            {x: "三", value: modelOutput[3]},
            {x: "四", value: modelOutput[4]},
            {x: "五", value: modelOutput[5]},
            {x: "六", value: modelOutput[6]},
            {x: "七", value: modelOutput[7]},
            {x: "八", value: modelOutput[8]},
            {x: "九", value: modelOutput[9]},
            {x: "十", value: modelOutput[10]},
            {x: "百", value: modelOutput[11]},
            {x: "千", value: modelOutput[12]},
            {x: "万", value: modelOutput[13]},
            {x: "亿", value: modelOutput[14]},
        ]);
        
        // Create the chart
        var chart = anychart.column();
        
        // Add data
        chart.data(data);
        
        // Set the chart title
        chart.title("");
        
        // Draw
        chart.container("container");
        chart.draw();

        function addPoint(char, prob) {
            // Append data
            data.append({x: char, value: prob});
        };
    });
}

