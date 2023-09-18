const TypeWriter = function(txtElement,words,wait = 1000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
}

//type method
TypeWriter.prototype.type = function(){
    //index of word
    const curr = this.wordIndex % this.words.length;
    //get full txt of curr word
    const fulltxt = this.words[curr];
    // console.log(fulltxt);
    //checking delete
    if(this.isDeleting){
        //remove
        this.txt = fulltxt.substring(0,this.txt.length-1);
    }else{
        //add
        this.txt = fulltxt.substring(0,this.txt.length+1);
    }

    //insert txt into the element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    //type speed
    let typeSpeed = 200;
    if(this.isDeleting) typeSpeed /= 2;
    
    // chk word is complete and move next

    if(!this.isDeleting && this.txt === fulltxt){
        typeSpeed = this.wait; // make pause after complete a word
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex++;//chng to next word

        typeSpeed = 1000; //make pause before next
    }

    setTimeout(()=> this.type(),typeSpeed);
}

//init on DOM load
 document.addEventListener('DOMContentLoaded',init);

 function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement,words,wait);
 }