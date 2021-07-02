anychart.onDocumentReady(function() {

    // Set the data
    var data = {
        header: ["Character", "Score"],
        rows: [
        ["零", 0.1],
        ["一", 0.05],
        ["二", 0],
        ["三", 0.3],
        ["四", 0.05],
        ["五", 0],
        ["六", 0.1],
        ["七", 0],
        ["八", 0],
        ["九", 0],
        ["十", 0.2],
        ["百", 0],
        ["千", 0.2],
        ["万", 0],
        ["亿", 0],
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
