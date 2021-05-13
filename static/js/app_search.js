// from data.js
var sightings = data;
var shapes = data.map(d => d["shape"])
    .filter((value, index, self) => self.indexOf(value) === index)
var cities = data.map(d => d["city"])
    .filter((value, index, self) => self.indexOf(value) === index)
var state = data.map(d => d["state"])
    .filter((value, index, self) => self.indexOf(value) === index)
var country = data.map(d => d["country"])
    .filter((value, index, self) => self.indexOf(value) === index)
//console.log(cities)

var tbody = d3.select("tbody");

// function to display full table of sightings
function displayData(ufos){ 
  tbody.text("")
  ufos.forEach(function(ufoSighting){
  new_tr = tbody.append("tr")
  Object.entries(ufoSighting).forEach(function([key, value]){
      new_td = new_tr.append("td").text(value)	
  })
})}

// show sightings in console log and on screen
console.log(sightings);
displayData(sightings)

// clear the table for new filters
function deleteTable() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};
  
// 'Filter Table' button
var button = d3.select("#filter-btn");
// 'Refresh' button
var buttonRefresh = d3.select("#refresh-btn");

// filter the database
button.on("click", function(event) {
  
  d3.event.preventDefault();
  deleteTable();

    // Select the input element and get the raw HTML node
    var dateInput = d3.select("#datetime");
    var cityInput = d3.select("#city")
    var stateInput = d3.select("#state");
    var countryInput = d3.select("#country");
    var shapeInput = d3.select("#shape");
  
    // Sanity check the inputs in console log
    console.log(dateInput.property("value"));
    console.log(cityInput.property("value"));
    console.log(stateInput.property("value"));
    console.log(countryInput.property("value"));
    console.log(shapeInput.property("value"));
  
    //create a variable which filters the table to allow some or all criteria to be provided - add .string.tolowercase to ensure that the lookup
    //isn't impacted by mixed cases
  
   var filtered = sightings.filter(ufoSighting =>{
    return (ufoSighting.datetime===dateInput.property("value") || !dateInput.property("value") ) && 
              (ufoSighting.city===cityInput.property("value").toString().toLowerCase() || !cityInput.property("value")) &&
              (ufoSighting.state===stateInput.property("value").toString().toLowerCase() || !stateInput.property("value")) &&
              (ufoSighting.country===countryInput.property("value").toString().toLowerCase() || !countryInput.property("value")) &&
              (ufoSighting.shape===shapeInput.property("value").toString().toLowerCase() || !shapeInput.property("value"))
   })
  
   //apply the displayData function to update the table
   displayData(filtered);

 
  // display message if no records found
  if (filtered.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>So far the government has successfully covered up any sightings matching those fields... keep your eyes open and your mind sharp!</h4>");
  };
  
  // display the database
  console.log(filtered.length);
}); 

buttonRefresh.on("click", Refresh);

    // Complete the event handler function for the form
function Refresh() {

    // Delete any previously applied filters
  deleteTable();

  // // Display full table
  displayData(sightings)

  // // Reset filter field
    document.getElementById('datetime').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('country').value = '';
    document.getElementById('shape').value = '';
}