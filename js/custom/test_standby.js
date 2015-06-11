/**
 * Created by Alicia on 2015-06-11.
 */
$(function(){
   // Parse.initialize("3iCdhZxUjfBkNXuic4HKOyrx2MRjkYzkG5xb4jsu", "8AcXns9LfAn1EhN9bquimdncvBijPWmJqJ8RX2T1");

    var module = Parse.Object.extend("Module");
    var query = new Parse.Query(module);
    query.equalTo("selected", true);
    query.first({
        success : function(object){
            var name = object.get("name");
            var field = object.get("field");
            var script = object.get("script");
            var author = object.get("author");

            $('#selectedModuleName').val(name);
            $('#field').val(field);
            $('#simpleScript').val(script);
            $('#author').val(author);
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

    // init module information
    query = new Parse.Query(module);
    query.equalTo("selected", true);
    query.first({
        success: function(object) {
            // Successfully retrieved the object.
            var quizQuery = new Parse.Query(object.get("name"));
            quizQuery.exists("objectId");
            quizQuery.find({
                success: function(results) {
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        object.set("correct", false);
                        object.set("state",false);
                        object.set("myAnswer","NULL");
                        object.save();
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });




});