/**
 * Created by Alicia on 2015-06-06.
 */

$(function(){
    // init parse
    //console.log('Init Parse');

  //  Parse.initialize("3iCdhZxUjfBkNXuic4HKOyrx2MRjkYzkG5xb4jsu", "8AcXns9LfAn1EhN9bquimdncvBijPWmJqJ8RX2T1");

    $('#makeModuleBtn').on("click", function(event){
        console.log('Make Module Btn Clicked');
        var Module = Parse.Object.extend("Module");
        var moduleInstance = new Module();

        // get document
        var moduleName = $("#moduleNameTextInput").val();
        var field = $("#fieldNameTextInput").val();
        var script = $("#scriptTextInput").val();
        var author = $("#authorTextInput").val();
        moduleInstance.save({
            name : moduleName,
            field : field,
            script : script,
            author : author,
            selected : false    // which is selected
        });
    });

});
