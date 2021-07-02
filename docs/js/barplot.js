var barplot = function(input) {
    anychart.onDocumentReady(function(input) {

        // Set the data
        var data = {
          header: ["Character", "Score"],
          rows: [
            ["零", input[0]],
            ["一", input[1]],
            ["二", input[2]],
            ["三", input[3]],
            ["四", input[4]],
            ["五", input[5]],
            ["六", input[6]],
            ["七", input[7]],
            ["八", input[8]],
            ["九", input[9]],
            ["十", input[10]],
            ["百", input[11]],
            ["千", input[12]],
            ["万", input[13]],
            ["亿", input[14]],
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
