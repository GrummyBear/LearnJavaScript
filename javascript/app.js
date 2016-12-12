/**
 * Created by davem on 27/11/2016.
 */
var learnjavascript={};

learnjavascript.showView = function (hash){
    var questionView =$('<div class = "question-view">').text('Arriving soon!');
    $('.view-container').empty().append(questionView);
}