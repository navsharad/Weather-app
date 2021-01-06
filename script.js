const DARKSKY_API_KEY = 'YOUR_API_KEY';

const locationElement = document.querySelector('.location');
const weatherElement = document.querySelector('.weather');
const degreesElement = document.querySelector('.degrees');
const toggleButtonElement = document.querySelector('input[type="checkbox"]');
const iconElement = document.querySelector('#icon');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        let request = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${long}`;

        fetch(request)
         .then(res => res.json())
         .then(data => {
             let {temperature, icon, summary } = data.currently;
             let timezone = data.timezone;

             locationElement.textContent = timezone;
             weatherElement.textContent = summary;
             degreesElement.innerHTML = Math.round(temperature) + '&#8457;';
             
             // toggle button to convert units
             let unit = 'f';
             toggleButtonElement.addEventListener('click', () => {
                 if (unit ==='f') {
                     temperature = convertDegrees(temperature, 'f');
                     degreesElement.innerHTML = Math.round(temperature) + '&#8451;'; 
                     unit = 'c';
                    }
                    else{
                        temperature = convertDegrees(temperature, 'c');
                        degreesElement.innerHTML = Math.round(temperature) + '&#8457;'; 
                        unit = 'f';
                    } 
                })
                
            //set icon
            icon = icon.replace(/-/g, "_").toUpperCase();
            console.log(icon)
            const skycons = new Skycons({"color": "teal"});
            skycons.set("icon", Skycons.icon.slice(1, -1)); //fix this
            skycons.play();
         
            })
    })
} else {
    alert('Please enable geolocation to use app');
}

function convertDegrees(degrees, unit) {
    if (unit === 'f') {
        return ((degrees - 32) * 5/9);
    } else if(unit === 'c') {
        return ((degrees * 9/5) + 32);
    } else {
        return -1;
    }
}