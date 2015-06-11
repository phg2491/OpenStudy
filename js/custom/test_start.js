/**
 * Created by Alicia on 2015-06-07.
 */
$(function(){
   // Parse.initialize("3iCdhZxUjfBkNXuic4HKOyrx2MRjkYzkG5xb4jsu", "8AcXns9LfAn1EhN9bquimdncvBijPWmJqJ8RX2T1");
    var QuizSet = new Array();
    var moduleName;

    // find selected module
    var module = Parse.Object.extend("Module");
    var query = new Parse.Query(module);
    query.equalTo("selected", true);
    query.first({
        success: function(object) {
            moduleName = object.get("name");

            // Successfully retrieved the object.
            var quizQuery = new Parse.Query(moduleName);
            quizQuery.exists("objectId");
            quizQuery.equalTo("state", false); // Don't Repeat Quiz
            quizQuery.find({
                success: function(results) {
                    // Init Progress Bar
                    var countQuery = new Parse.Query(moduleName);
                    countQuery.exists("objectId");
                    countQuery.count({
                        success: function(count) {
                            // The count request succeeded. Show the count
                            var progressWidth = (count - results.length) / count * 100;
                            $('#progressBar').width(progressWidth +'%').html(count - results.length +' / '+count);
                        },
                        error: function(error) {
                            // The request failed
                        }
                    });


                    // Quiz Information get
                    for (var i = 0; i < results.length; i++) {
                        var object = {
                            "id" : results[i].id,
                            "level" : results[i].get('level'),
                            "question" : results[i].get('question'),
                            "answer" : results[i].get('answer')
                        };
                        QuizSet.push(object);
                    }
                    QuizSet.sort(function () {
                        return Math.random() - Math.random();  // 배열 랜덤 정렬
                    });

                    $('#level').val(QuizSet[0].level); // 답 가져옹
                    $('#question').val(QuizSet[0].question); // 답 가져옹

                    quizQuery = new Parse.Query(moduleName);
                    quizQuery.get(QuizSet[0].id, {
                        success: function(_object) {
                            // The object was retrieved successfully.
                            _object.set("state",true);
                            _object.save();
                            console.log(_object.get("state"));
                        },
                        error: function(object, error) {
                            // The object was not retrieved successfully.
                            // error is a Parse.Error with an error code and description.
                            console.log('state update error', error);
                        }
                    });


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

    $('#nextBtn').on("click", function(event){

        var myAnswer = $('#answer').val(); // 답 입력
        var goodAnswer = QuizSet[0].answer;

        quizQuery = new Parse.Query(moduleName);
        quizQuery.get(QuizSet[0].id, {
            success: function(_object) {
                // The object was retrieved successfully.
                _object.set("myAnswer", myAnswer);
                if(myAnswer == goodAnswer){
                    _object.set("correct", true);
                    window.location.reload();
                }
                else{
                    window.location.reload();
                }
                _object.save();
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                console.log('state update error', error);
            }
        });
        /*

        // 비교
        if(myAnswer == goodAnswer){
            quizQuery = new Parse.Query(moduleName);
            quizQuery.get(QuizSet[0].id, {
                success: function(_object) {
                    // The object was retrieved successfully.
                    console.log(myAnswer);
                    _object.set("myAnswer", myAnswer);
                    _object.set("correct", true);
                    _object.save();
                    window.location.reload();
                },
                error: function(object, error) {
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and description.
                    console.log('state update error', error);
                }
            });
        }
        else{
            window.location.reload();
        }
        */
    });

    $('#endBtn').on("click", function(event){
        console.log('end btn clicked');
    });
});
