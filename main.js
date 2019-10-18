class TypeWriter {
    /**
    * Thanks to Traversy Media YouTube video
    * Source : https://codepen.io/bradtraversy/pen/jeNjwP
    * @constructor
    * args{
    * txtElement : an HTML element that has the text to type which is in our case span element
    * words : ARRAY ,taken from txtElement array
    * wait : default value is 3000 ms
    * }
    * Varibles Description {
    * wordIndex : the index of every word in words array
    * }
    * @type()
    *function Description{
    *  It types every word in the array(words) which is span element and waits then delete the text
    * current: index of the word that it is typing
    * fullTxt : get full text of the current word
    * typeSpeed : the speed of typing which will change if deleting and cannot be used the same value outside of the scope
    * setTimeout(function(){ eventToDo }, timeItTakes) : evrey 500 ms (half second) it types one letter by calling type function
    * }
    **/
    constructor(txtElement , words , wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait , 10);
    /* used parseInt to make sure the arg is integer , 10 means the base of the 1st arg*/
    this.type();
    this.isDeleting = false;
}
// Type Method and to add method we used prototype
    type(){
    const current = this.wordIndex % this.words.length; // 0%3=0 1%3=1 2%3=2 3%3=0
    // Get full text of the current word
    const fullTxt = this.words[current];
    // check if deleting
    if (this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0 , this.txt.length - 1);
    }else{
        // add char
        // substring(start:number , end:number) not including the last char that is why we added one
        this.txt = fullTxt.substring(0 , this.txt.length + 1);
    }
    // Insert txt into element
    this.txtElement.innerHTML = `<span class = "txt" >${this.txt}</span>`; // ${} makes it evalutes to certain var and not a string
    // Initial type speed
    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed = typeSpeed / 2;
    }
    // If word is complete
    if(!this.isDeleting && this.txt == fullTxt){
        // make puase at end
        typeSpeed = this.wait;
        //Set delete to true
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt == ''){
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        // puase before start typing
        typeSpeed = 500;
    }
    setTimeout(() => this.type() , typeSpeed);
}}

/**
* Event Listener used to add so many events and not one
* Syntax : element.addEventListener(event , function , useCapture);
**/
// Init On DOM Load
document.addEventListener('DOMContentLoaded',init);


function init(){
    /**
    * @init()
    * function Description{
    * Init where we need to get the elements(span and its attributes)
    * txtElement : used to grab the element itself by its class name which is txt-type
    * }
    **/
    const txtElement = document.querySelector('.txt-type');
    const wait = txtElement.getAttribute("data-wait");
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    // we need to parse the array otherwise it's gonna look at it as string
    // Init TypeWriter object
    new TypeWriter(txtElement , words , wait);
}
// WORKED ON THE ABOVE : YARA
