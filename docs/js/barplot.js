function initializeBarPlot(modelOutput) {
    console.log("Initializing Bar Plot ...");
    
    console.log("Bar Plot Data:");
    console.log(modelOutput);
    console.log(modelOutput[0]);

    if (modelOutput === undefined) {
        console.log("Model Output Data is NOT Defined.");
    } else {
        anychart.onDocumentReady(function() {

            // Set the data
            var data = {
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
            ]};
            
            // Create the chart
            var chart = anychart.column();
            
            // Add data
            chart.data(data);
            
            // Set the chart title
            chart.title("");
            
            // Draw
            chart.container("container");
            chart.draw();
        });
    }
}

function updateBarPlot(chart, modelOutput) {
    console.log("Updating Bar Plot ...");

    console.log("Bar Plot Data:");
    console.log(modelOutput);
    console.log(modelOutput[0]);

    if (modelOutput === undefined) {
        console.log("Model Output Data is NOT Defined.");
    } else {
        // Set the data
        var data = {
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
        ]};
    
        // Add data
        chart.data(data);
    }
}
