/**
 * Created by Alicia on 2015-06-07.
 */
$(function(){
    // module dynamic create
   // Parse.initialize("3iCdhZxUjfBkNXuic4HKOyrx2MRjkYzkG5xb4jsu", "8AcXns9LfAn1EhN9bquimdncvBijPWmJqJ8RX2T1");

    var query = new Parse.Query("Module");
    query.exists("name");
    query.find({
        success: function(results) {
            for(var i=0; i<results.length; i++) {
                // Init Selected State
                results[i].set("selected", false);
                results[i].save();

                $('<a class="btn btn-default" role="button"></a>').appendTo('#dynamicCreatedBtn')
                    .text(results[i].get("name"))
                    .on('click',function(event){ // 버튼을 클릭했을때 그 버튼의 이름을 가져옴
                        // Init Selected State
                        query = new Parse.Query("Module");
                        query.exists("name");
                        query.find({
                            success: function(results) {
                                for (var i = 0; i < results.length; i++) {
                                    results[i].set("selected", false);
                                    results[i].save();
                                }
                            }
                        });

                        var name = $(this).text();
                        query = new Parse.Query("Module");
                        query.equalTo("name", name);
                        query.find({
                            success: function(results) {
                                query.get(results[0].id, {
                                    success: function(object) {
                                        // object is an instance of Parse.Object.
                                        object.set("selected", true);
                                        object.save();
                                        $('#selectedModule').html("Selected Module : " + name);
                                    },
                                    error: function(object, error) {
                                        // error is an instance of Parse.Error.
                                    }
                                });
                            },
                            error: function(error) {
                                alert("Error: " + error.code + " " + error.message);
                            }
                        });
                    });

            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
});