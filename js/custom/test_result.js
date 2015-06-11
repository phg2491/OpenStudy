/**
 * Created by Alicia on 2015-06-07.
 */
$(function(){
  //  Parse.initialize("3iCdhZxUjfBkNXuic4HKOyrx2MRjkYzkG5xb4jsu", "8AcXns9LfAn1EhN9bquimdncvBijPWmJqJ8RX2T1");

    var QuizSet = new Array();

    var amountQuizSet;
    var correctQuizSet;
    var incorrectQuizSet;

    var index = 0;
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
            quizQuery.find({
                success: function(results) {
                    amountQuizSet = results.length;

                    // get correct quiz count
                    // refactoring needs
                    var countQuery = new Parse.Query(moduleName);
                    countQuery.equalTo("correct", true);
                    countQuery.count({
                        success: function(count) {
                            // The count request succeeded. Show the count
                            correctQuizSet = count;
                            incorrectQuizSet = amountQuizSet - correctQuizSet;

                            //console.log(amountQuizSet);
                            //console.log(correctQuizSet);
                            //console.log(incorrectQuizSet);
                            $('#amount').html(amountQuizSet);
                            $('#correct').html(correctQuizSet);
                        },
                        error: function(error) {
                            // The request failed
                        }
                    });
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });

            quizQuery = new Parse.Query(moduleName);
            quizQuery.equalTo("correct",false);
            quizQuery.find({
                success: function(results) {
                    for(var i=0; i<results.length; i++){
                        var object = {
                            "id" : results[i].id,
                            "level" : results[i].get('level'),
                            "question" : results[i].get('question'),
                            "answer" : results[i].get('answer'),
                            "myAnswer" : results[i].get('myAnswer')
                        };
                        QuizSet.push(object);
                        $('#level').val(QuizSet[index].level);
                        $('#question').val(QuizSet[index].question);
                        $('#answer').val(QuizSet[index].answer);
                        $('#myAnswer').val(QuizSet[index].myAnswer);
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            })
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

    // next incorrect answer
    $('#nextBtn').on("click", function(event){
        if(index <amountQuizSet)
        index++;
        $('#level').val(QuizSet[index].level);
        $('#question').val(QuizSet[index].question);
        $('#answer').val(QuizSet[index].answer);
        $('#myAnswer').val(QuizSet[index].myAnswer);
    });

    $('#backBtn').on("click", function(event){
        if(index > 0)
            index--;
        $('#level').val(QuizSet[index].level);
        $('#question').val(QuizSet[index].question);
        $('#answer').val(QuizSet[index].answer);
        $('#myAnswer').val(QuizSet[index].myAnswer);
    });
});
