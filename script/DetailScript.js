
const d = document,
    flag = JSON.parse(localStorage.getItem("flag")),
    $template = d.getElementById("flags").content,
    $fragmaneto = d.createDocumentFragment(),
    $flagSection = d.querySelector("#section-flags"),
    $backButton = d.getElementById("back-button");

$backButton.addEventListener("click",()=> location.href = "Home.html");

const BordesCountries =  async (flag)=>{
    try{
        let res = await fetch("data.json");

        if(!res.ok) throw("Ocurrió un erro en la Petición");

        let json = await res.json();
        
        $template.querySelector('.flag-img').src = flag.flags.svg;
        $template.querySelector('.flag-img').alt = flag.name;
        $template.querySelector('.flag-name').innerHTML = flag.name;
        $template.querySelector(".native-name").innerHTML = flag.nativeName;
        $template.querySelector(".flag-population").innerHTML = flag.population;
        $template.querySelector(".flag-region").innerHTML = flag.region;
        $template.querySelector(".sub-region").innerHTML = flag.subregion;
        $template.querySelector(".flag-capital").innerHTML = flag.capital;
    
        // isert Info Segndaria
        let languages = [],
            currencies =[],
            borders =[];
    
        $template.querySelector(".top-Ldomain").innerHTML = flag.topLevelDomain.join(", ");
        
        flag.currencies.forEach(el => currencies.push(el.name))
        $template.querySelector(".currencies").innerHTML = currencies.join(", ");
    
        flag.languages.forEach(el=>languages.push(el.name));
        $template.querySelector(".languages").innerHTML = languages.join(", ");

        if(Array.isArray(flag.borders)){
            json.forEach(el  =>{
                if(flag.borders.includes(el.alpha3Code)) borders.push(el.name);
            })

            borders.forEach(el => {
                let country = d.createElement("p");
                country.classList.add("borders");
                country.innerHTML = el;
                $template.querySelector(".border-countries").appendChild(country);
            })
        }else{
            $template.querySelector(".border-countries").innerHTML = "";
        }
        $flagSection.appendChild($template);

    }catch(err){
        $flagSection.innerHTML = `<h1>${err}</h1>`
    };
};

d.addEventListener("DOMContentLoaded",()=>{
   BordesCountries(flag);
});