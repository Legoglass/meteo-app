
// (posibil sa trebuiasaca scoase parantelze de la oras si api ) apiKey = https://api.openweathermap.org/data/2.5/weather?q={Braila}&appid={78316046239297ffc3fc837f12dba50b}&units=metric


//apiKey este o cheie unica de pe sit-ul de mai jos 
// api URL este URL ul care impreuna cu KEy funrizeaza totate datele meteo

const apiKey = "78316046239297ffc3fc837f12dba50b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Am selectat imput-ul de oras si butonul

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

//Am creat functia prin care se vor lua datele de pe servar si actualizate pe site 
//async este o functie speciala care practic promite sa atribuie niste date in viitor 
// functiei iam atribuit un atribut , acesta fiind ' city' 
//am creat o const la care i am tribuit raspunsul servarului , "await fetch() este o  atributie pentru cerere de pe server "  + 
// + atributul functiei "city" + `$()` care practic este o interporale si sinsereaza
//Key -ul de care am nveoie , ca o paranteaza , daca foloseam (apiKey) acesta ar fi adaugat la cod
// pur si simplu apiKey in loc de valaoarea lui 
//apoi am verificat informatiile de pe api si am setat ca variabila sa astepte raspunsul
//de la server pana a face schimbarile pe site

async function checkWeather(city) {
    const response = await fetch(apiUrl + city +  `&appid=${apiKey}` );
    var data = await response.json();
    console.log(data);

    //am selectat fiecare element din HTML care va suferi schimbari

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C" ;
    document.querySelector(".temp-min").innerHTML = data.main.temp_min+"°C"+"/"+ data.main.temp_max+"°C";
    document.querySelector(".wdescription").innerHTML = data.weather[0].main;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    
}

//am aplicat un event la buton care activeaza functia de mai sus

searchBtn.addEventListener("click" , ()=> { 
    checkWeather(searchBox.value);
})

//am aplicat un event la tasa=ta enter care activeaza functia de mai sus

searchBox.addEventListener("keyup" , function () {
        if (event.key == "Enter") {
            checkWeather(searchBox.value);
        }

    })


//Functie pentru actualizarea datei pe pagina
//new Dare() este o functie implicita care preia data actualizata
//formattedDate , am arangaj modul in care se va afisa data pe ecran
//am selectat elemntul din HTML
//am zis ca elemntul din HTML sa fie suprascris de formatul datei prestabilte cu data actualizata 
function updateData() { 
    const currentDate = new Date(); 
    const formattedDate = currentDate.toLocaleDateString("en-US" , {
        weekday: "long" , 
        year: "numeric",
        month : "long" , 
        day: "numeric"
    }) ;
    const dateElement = document.querySelector(".date");

    dateElement.textContent = formattedDate;
} 

updateData();
setInterval(updateData , 1000);
checkWeather();








