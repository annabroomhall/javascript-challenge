// Assign the data from `data.js` to a descriptive variable
var sightings = data;
var shapes = data.map(d => d["shape"])
    .filter((value, index, self) => self.indexOf(value) === index)
var cities = data.map(d => d["city"])
    .filter((value, index, self) => self.indexOf(value) === index)

// Select the button
var button = d3.select("#filter-btn");
var buttonRefresh = d3.select("#refresh-btn");

// Select the form
var form = d3.select("#filters");

var tbody = d3.select("tbody");

function displayData(ufos){ 
  tbody.text("")
  ufos.forEach(function(ufoSighting){
  new_tr = tbody.append("tr")
  Object.entries(ufoSighting).forEach(function([key, value]){
      new_td = new_tr.append("td").text(value)	
  })
})}

displayData(sightings)

// Clear table for new filters
function deleteTable() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};

// Create event handlers 
button.on("click", runEnter);

// Complete the event handler function for the form
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Delete any previously applied filters
  deleteTable();

  // Select the input element and get the raw HTML node
    var dateInput = d3.select("#datetime");

  // Get the value property of the input element
    var dateValue = dateInput.property("value");
  
  //console.log(dateValue);

    var filteredData = sightings.filter(sightings => sightings.datetime === dateValue);

    //sanity check with console.log
    console.log((filteredData.length));

    displayData(filteredData);
  
  // display message if no records found
    if (filteredData.length == 0) {
        d3.select("tbody")
        .append("tr")
        .append("td")
            .attr("colspan", 7)
            .html("<h4>So far the government has successfully covered up any sightings matching those fields... keep your eyes open and your mind sharp!</h4>");
    };

// Create event handlers 
buttonRefresh.on("click", Refresh);

    // Complete the event handler function for the form
function Refresh() {

    // Delete any previously applied filters
  deleteTable();

  // // Display full table
  displayData(sightings)

  // // Reset filter field
    document.getElementById('datetime').value = '';
}
}