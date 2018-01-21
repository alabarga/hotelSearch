$( document ).ready(function() {
//  $.getJSON( "http://private-de5055-greenscore.apiary-mock.com/hotels", function( data ) {
  $.getJSON( "http://129.158.75.245:3000/hotels", function( data ) {
    $.each( data, function( key, val ) {
      var hotel = "<div class=\"col-md-4 col-sm-6 wow zoomIn\" data-wow-delay=\"0."+key+"s\">" +
        "  <div class=\"tour_container\">";
        if(val.greenScore > 5) {
          hotel +="<div class=\"ribbon_3 popular\"><span>Verde</span></div>\n"
        }
        hotel +="<div class=\"img_container\">" +
        "<a href=\"single_tour.html\">" +
        "<img src=\""+val.image+"\" class=\"img-responsive\" alt=\"Image\" style='height: 300px; position: center'>" +
        "<div class=\"short_info\">" +
        "</div>" +
        "</a>" +
        "</div>" +
        "<div class=\"tour_title\">" +
        "  <h3><strong>"+val.name+"</strong></h3>" +
        "<div class=\"rating\">";

        for(var i = 0; i < val.greenScore; i++){
          hotel += "<i class=\"icon-smile voted\"></i>"
        }
        hotel += "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
        $("#result").append(hotel);
    });
  });
});
