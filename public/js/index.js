$(function(){
  $.get("http://10.0.1.15:3000/api/real_estate_data?filter[limit]=1", function(res){
    var columns = [];
    for(var obj in res[0]){
      columns.push({
        title: obj, 
        field: obj, 
        sortable:true, 
        editor: numbers(obj) ? 'number' : 'textarea', 
        headerFilter:"input"
      })
    }
    $("#example-table").tabulator({
      headerFilterPlaceholder:"Search",
      fitColumns:true,
      columns: columns,
      cellEdited: function(id, field, val){
          var data = {};
          data[field] = val;
          console.log(data);
          $.ajax({
            url : 'http://10.0.1.15:3000/api/real_estate_data/' + id,
            data : JSON.stringify(data),
            type : 'PATCH',
            contentType : 'application/json',
            processData: false,
            dataType: 'json',
            crossDomain: true
            });
      },
      responsive:true,
      resizableColumns:true,
      pagination:'local'

    });
    $("#example-table").tabulator("setData", 'http://10.0.1.15:3000/api/real_estate_data');
    $("#example-table").tabulator("setFilter", {field:"city"});

    $(window).resize(function(){
      $("#example-table").tabulator("redraw");
    });
  })
});

function numbers(field){
  return field ==='beds' || field === 'baths' || field ==='sqFt'
  || field === 'price' || field === 'latitude' || field === 'longitude' || field === 'id' || field === 'zip'; 
}