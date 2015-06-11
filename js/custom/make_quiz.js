/**
 * Created by Alicia on 2015-06-06.
 */

var Module;
var moduleName;
var QuizSet;
var quizCount = 0;

$(function(){
    //init
 //   Parse.initialize("3iCdhZxUjfBkNXuic4HKOyrx2MRjkYzkG5xb4jsu", "8AcXns9LfAn1EhN9bquimdncvBijPWmJqJ8RX2T1");

    // Recently Created Module Searching
    var query = new Parse.Query("Module");
    query.exists("name");
    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            moduleName = results[results.length-1].get("name");
            updatingCount(moduleName);  // Async
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

    // Button Event
    $('#saveBtn').on("click", function(event){
        var level = $('#level').val();
        var question = $('#question').val();
        var answer = $('#answer').val();

        // Created QuizSet
        var Module = Parse.Object.extend(moduleName);
        QuizSet = new Module();
        QuizSet.save({
            level : level,
            question: question,
            answer : answer,
            myAnswer : null,
            correct : false,
            state : false
        });
    });

    // Counting Current Question
    function updatingCount(item){
        var countQuery = new Parse.Query(item);
        countQuery.find("level");
        countQuery.count({
            success: function(count) {
                // The count request succeeded. Show the count
                $('#quizCount').html(+ count);
            },
            error: function(error) {
                // The request failed
            }
        });
    }
});



