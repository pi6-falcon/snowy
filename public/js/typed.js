!function($){

    "use strict";
    var scopeThis = this;
    var Typed = function(el, options){

        // for variable scope's sake
        scopeThis = this;

        // chosen element to manipulate text
        scopeThis.el = $(el);
        // options
        scopeThis.options = $.extend({}, $.fn.typed.defaults, options);

        // text content of element
        scopeThis.text = scopeThis.el.text();

        // typing speed
        scopeThis.typeSpeed = scopeThis.options.typeSpeed;

        // typing speed
        scopeThis.loop = scopeThis.options.loop;

        // amount of time to wait before backspacing
        scopeThis.backDelay = scopeThis.options.backDelay;

        // input strings of text
        scopeThis.strings = scopeThis.options.strings;

        // character number position of current string
        scopeThis.strPos = 0;

        // current array position
        scopeThis.arrayPos = 0;

        // current string based on current values[] array position
        scopeThis.string = scopeThis.strings[scopeThis.arrayPos];

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        scopeThis.stopNum = 0;

        // number in which to stop going through array
        // set to strings[] array (length - 1) to stop deleting after last string is typed
        scopeThis.stopArray = scopeThis.strings.length-1;

        // All systems go!
        scopeThis.init();
    }

        Typed.prototype =  {

            constructor: Typed

            , init: function(){
                // begin the loop w/ first current string (global scopeThis.string)
                // current string will be passed as an argument each time after this
                scopeThis.typewrite(scopeThis.string, scopeThis.strPos);
                scopeThis.el.after("<span id=\"typed-cursor\">|</span>");
            }

            // pass current string state to each function
            , typewrite: function(curString, curStrPos){

                // varying values for setTimeout during typing
                // can't be global since number changes each time loop is executed
                var humanize = Math.round(Math.random() * (100 - 30)) + scopeThis.typeSpeed;

                // ------ optional ------ //
                // custom backspace delay
                // if (scopeThis.arrayPos == 1){
                //  scopeThis.backDelay = 50;
                // }
                // else{ scopeThis.backDelay = 500; }

                // containg entire typing function in a timeout
                setTimeout(function() {

                    // make sure array position is less than array length
                    if (scopeThis.arrayPos < scopeThis.strings.length){

                        // start typing each new char into existing string
                        // curString is function arg
                        scopeThis.el.text(scopeThis.text + curString.substr(0, curStrPos));

                        // check if current character number is the string's length
                        // and if the current array position is less than the stopping point
                        // if so, backspace after backDelay setting
                        if (curStrPos > curString.length && scopeThis.arrayPos < scopeThis.stopArray){
                            clearTimeout();
                            setTimeout(function(){
                                scopeThis.backspace(curString, curStrPos);
                            }, scopeThis.backDelay);
                        }

                        // else, keep typing
                        else{
                            // add characters one by one
                            curStrPos++;
                            // loop the function
                            scopeThis.typewrite(curString, curStrPos);
                            // if the array position is at the stopping position
                            // finish code, on to next task
                            if (scopeThis.arrayPos == scopeThis.stopArray && curStrPos == curString.length){
                                // animation that occurs on the last typed string
                                // place any finishing code here

                                if(scopeThis.loop){
                                        scopeThis.arrayPos=0;
                                        curStrPos=0;
                                }else{
                                scopeThis.options.callback();
                                clearTimeout();}
                            }
                        }
                    }

                // humanized value for typing
                }, humanize);

            }

            , backspace: function(curString, curStrPos){

                // varying values for setTimeout during typing
                // can't be global since number changes each time loop is executed
                var humanize = Math.round(Math.random() * (100 - 30)) + scopeThis.typeSpeed;

                setTimeout(function() {

                        // ----- this part is optional ----- //
                        // check string array position
                        // on the first string, only delete one word
                        // the stopNum actually represents the amount of chars to
                        // keep in the current string. In my case it's 14.
                        // if (scopeThis.arrayPos == 1){
                        //  scopeThis.stopNum = 14;
                        // }
                        //every other time, delete the whole typed string
                        // else{
                        //  scopeThis.stopNum = 0;
                        // }

                    // ----- continue important stuff ----- //
                        // replace text with current text + typed characters
                        scopeThis.el.text(scopeThis.text + curString.substr(0, curStrPos));

                        // if the number (id of character in current string) is
                        // less than the stop number, keep going
                        if (curStrPos > scopeThis.stopNum){
                            // subtract characters one by one
                            curStrPos--;
                            // loop the function
                            scopeThis.backspace(curString, curStrPos);
                        }
                        // if the stop number has been reached, increase
                        // array position to next string
                        else if (curStrPos <= scopeThis.stopNum){
                            clearTimeout();
                            scopeThis.arrayPos = scopeThis.arrayPos+1;
                            // must pass new array position in this instance
                            // instead of using global arrayPos
                            scopeThis.typewrite(scopeThis.strings[scopeThis.arrayPos], curStrPos);
                        }

                // humanized value for typing
                }, humanize);

            }

        }

    $.fn.typed = function (option) {
        return this.each(function () {
          var $this = $(this)
            , data = $this.data('typed')
            , options = typeof option == 'object' && option
          if (!data) $this.data('typed', (data = new Typed(this, options)))
          if (typeof option == 'string') data[option]()
        });
    }

    $.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        // typing and backspacing speed
        typeSpeed: 0,
        // time before backspacing
        backDelay: 500,
        loop:false,
        // ending callback function
        callback: function(){ null }
    }


}(window.jQuery);
