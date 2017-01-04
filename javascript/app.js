/**
 * Created by Graeme Smith on 19/12/2016.
 */

'use strict';
var learnjavascript={};
learnjavascript.questions=[
    {
        description:"What is truth?",
        code:"function problem() {return __;}"
    },
    {
        description:"Easy Maths?",
        code:"function problem() {return 42 === 7* __;}"
    }
];
learnjavascript.triggerEvent= function(name, args) {
    $('.view-container>*').trigger(name, args);
};
learnjavascript.template = function(name){
    return $('.templates .' + name).clone();
};
learnjavascript.applyObject= function(obj,elem){
    for (var key in obj){
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
};
learnjavascript.flashElement = function(elem, content){
    elem.fadeOut('fast', function(){
        elem.html(content);
        elem.fadeIn();
    });
};
learnjavascript.buildCorrectFlash = function(questionNum){
    var correctFlash = learnjavascript.template('correct-flash');
    var link =correctFlash.find('a');
    if(questionNum < learnjavascript.questions.length){
        link.attr('href','#question-'+(questionNum + 1));
    }else{
        link.attr('href', '');
        link.text("You're Finished!")
    }
    return correctFlash;
};
learnjavascript.questionView = function(data){
    var questionNumber =parseInt(data, 11);
    var view= learnjavascript.template('question-view');
    var questionData =learnjavascript.questions[questionNumber-1];
    var resultFlash =view.find('.result');
    function checkAnswer(){
        var answer= view.find('.answer').val();
        var test =questionData.code.replace('__', answer)+';problem();';
        return eval(test);
    }
    function checkAnswerClick(){
        if(checkAnswer()){
            var flashContent =learnjavascript.buildCorrectFlash(questionNumber)
            learnjavascript.flashElement( resultFlash,flashContent);
        }else {
            learnjavascript.flashElement(resultFlash,'InCorrect!');
        }
        return false;
    }
    if (questionNumber < learnjavascript.questions.length) {
        var buttonItem = learnjavascript.template('skip-btn');
        buttonItem.find('a').attr('href', '#question-' + (questionNumber + 1));
        $('.nav-list').append(buttonItem);
        view.bind('removingView', function() {
            buttonItem.remove();
        });
    }
    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text('Question #'+ questionNumber);
    learnjavascript.applyObject(questionData,view);
    return view;
};
learnjavascript.landingView= function(){
    return learnjavascript.template('landing-view');
};
learnjavascript.showView = function(hash) {
    var routes = {
        '#question': learnjavascript.questionView,
        '#': learnjavascript.landingView,
        '':learnjavascript.landingView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]];
    if (viewFn) {
        learnjavascript.triggerEvent('removingView', []);
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
};
learnjavascript.appOnReady = function() {
    window.onhashchange = function() {
        learnjavascript.showView(window.location.hash);
    };
    learnjavascript.showView(window.location.hash);
};