
setInterval(updateClock,1000);

const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');
updateClock();
function updateClock(){
    const date = new Date();
    var secondsRatio = date.getSeconds()/60;
    var minutesRatio = (secondsRatio + date.getMinutes())/60;
    var hoursRatio = (minutesRatio + date.getHours())/12;

    console.log(date.getSeconds());

    setRotation(hourHand,hoursRatio);
    setRotation(minuteHand,minutesRatio);
    setRotation(secondHand,secondsRatio);

}

function setRotation(element,rotation){
    element.style.setProperty('--rotation',rotation * 360);
}