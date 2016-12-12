/**
 * Created by Graeme Smith on 12/12/2016.
 */

describe('LearnJavascript', function(){
    it('can show question view', function(){
        learnjavascript.showView('#quesion-1');
        expect($('.view-container .question-view').length).toEqual(1);
    });
});