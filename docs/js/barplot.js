function barplot(probabilityData) {
    console.log("Bar Plot Probability Data:");
    console.log(probabilityData);
    console.log(probabilityData[0]);
    
    if (probabilityData === undefined) {
        console.log("Model Output Probability Data is NOT Defined.");
    } else {
        anychart.onDocumentReady(function(probabilityData) {

            // Set the data
            var data = {
                header: ["Character", "Probability"],
                rows: [
                ["零", probabilityData[0]],
                ["一", probabilityData[1]],
                ["二", probabilityData[2]],
                ["三", probabilityData[3]],
                ["四", probabilityData[4]],
                ["五", probabilityData[5]],
                ["六", probabilityData[6]],
                ["七", probabilityData[7]],
                ["八", probabilityData[8]],
                ["九", probabilityData[9]],
                ["十", probabilityData[10]],
                ["百", probabilityData[11]],
                ["千", probabilityData[12]],
                ["万", probabilityData[13]],
                ["亿", probabilityData[14]],
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
