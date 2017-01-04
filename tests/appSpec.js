/**
 * Created by Graeme Smith on 12/12/2016.
 */

describe('Learn JavaScript', function(){
    it('can show question view',function(){
        learnjavascript.showView('#question-1');
        expect($('.view-container .question-view').length).toEqual(1);
    });
    it ('shows the landing page view when there is no hash',function(){
        learnjavascript.showView('') ;
        expect($('.view-container .landing-view').length).toEqual(1);
    });
    it('passes the hash view parameter to the view function', function(){
        spyOn(learnjavascript,'questionView');
        learnjavascript.showView('#question-42');
        expect(learnjavascript.questionView).toHaveBeenCalledWith('42');
    });
    it('invokes the router when loading', function(){
        spyOn(learnjavascript,'showView');
        learnjavascript.appOnReady();
        expect(learnjavascript.showView).toHaveBeenCalledWith(window.location.hash);
    });
    it('subscribes to the hash change event', function(){
        learnjavascript.appOnReady();
        spyOn(learnjavascript,'showView');
        $(window).on('hashchange', function(){}).trigger('hashchange');
        expect(learnjavascript.showView).toHaveBeenCalledWith(window.location.hash);
    });
    it('can flash an element while setting the text', function() {
        var elem = $('<p>');
        spyOn(elem, 'fadeOut').and.callThrough();
        spyOn(elem, 'fadeIn');
        learnjavascript.flashElement(elem, "new text");
        expect(elem.text()).toEqual("new text");
        expect(elem.fadeOut).toHaveBeenCalled();
        expect(elem.fadeIn).toHaveBeenCalled();
    });
    it('can redirect to the main view after the last problem is answered', function() {
        var flash = learnjavascript.buildCorrectFlash(2);
        expect(flash.find('a').attr('href')).toEqual("");
        expect(flash.find('a').text()).toEqual("You're Finished!");
    });
    it('can trigger events on the view', function() {
        var callback = jasmine.createSpy('callback');
        var div = $('<div>').bind('fooEvent', callback);
        $('.view-container').append(div);
        learnjavascript.triggerEvent('fooEvent', ['bar']);
        expect(callback).toHaveBeenCalled();
        expect(callback.calls.argsFor(0)[1]).toEqual('bar');
    });
    describe('question view', function(){
        var view;
        beforeEach(function() {
            view = learnjavascript.questionView('1');
        });
        it('has a title that includes the question number',function(){
//var view =learnjavascript.questionView('1');
            expect(view.find('.title').text()).toEqual('Question #1');
        }) ;
        it('shows the description', function() {
            expect(view.find('[data-name="description"]').text()).toEqual('What is truth?');
        });
        it('shows the problem code', function() {
            expect(view.find('[data-name="code"]').text()).toEqual('function problem() {return
            __;}');
    });
    describe('answer section', function() {
        var resultFlash;
        beforeEach(function() {
            spyOn(learnjavascript, 'flashElement');
            resultFlash = view.find('.result');
        });
        describe('when the answer is correct', function() {
            beforeEach(function() {
                view.find('.answer').val('true');
                view.find('.check-btn').click();
            });
            it('flashes the result', function() {
                var flashArgs =learnjavascript.flashElement.calls.argsFor(0);
                expect(flashArgs[0]).toEqual(resultFlash);
                expect(flashArgs[1].find('span').text()).toEqual('Correct!');
            });
            it('shows a link to the next problem', function() {
                var link = learnjavascript.flashElement.calls.argsFor(0)[1].find('a');
                expect(link.text()).toEqual('Next Question');
                expect(link.attr('href')).toEqual('#question-2');
            });
        });
        it('rejects an incorrect answer', function() {
            view.find('.answer').val('false');
            view.find('.check-btn').click();
            expect(learnjavascript.flashElement).toHaveBeenCalledWith(resultFlash,
                'InCorrect!');
        });