anychart.onDocumentReady(function(scores) {

    // Set the data
    var data = {
      header: ["Character", "Score"],
      rows: [
        ["零", scores[0]],
        ["一", scores[1]],
        ["二", scores[2]],
        ["三", scores[3]],
        ["四", scores[4]],
        ["五", scores[5]],
        ["六", scores[6]],
        ["七", scores[7]],
        ["八", scores[8]],
        ["九", scores[9]],
        ["十", scores[10]],
        ["百", scores[11]],
        ["千", scores[12]],
        ["万", scores[13]],
        ["亿", scores[14]],
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