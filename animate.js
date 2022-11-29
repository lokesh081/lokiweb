
var temp = 0;

document.addEventListener("scroll", function(){

    var navbar = $('.navbar');
    var sec1 =document.querySelector('.sec-1').getBoundingClientRect();

    if(temp < sec1.top){
        console.log('down');
        temp = sec1.top;

        navbar.css('top','0px');
    }
    if(temp > sec1.top){
        console.log('up');
        temp = sec1.top;
        navbar.css('top','-60px');
    }
    if(temp == sec1.top){

    }
   


});