
$(document).ready(function() {
  var $h1 = $("h1");
  var $button = $("a");

  $button.bind("click", function(e){
    e.preventDefault();
    if (!navigator.geolocation){
      $h1.text("您的浏览器不支持地理位置");
      return;
    }

    function success(position){
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $h1.text("正在获取温度...");
      var request = $.ajax({
        url: '/search?latitude=' + latitude + '&longitude=' + longitude,
        type: 'GET',
        dataType: 'json',
        // data: {param1: 'value1'}
      })
      .done(function(data) {
        console.log("success");
        console.log(data);
        $h1.text('纬度' + parseInt(latitude) + '° 经度' + parseInt(longitude) + '°' + ' 温度 ' + data.temperature + '℃');

      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });

    }

    function error(){
      $h1.text("无法获得您的位置");
    }
    $h1.text("定位中...");
    navigator.geolocation.getCurrentPosition(success, error);
  });




});
