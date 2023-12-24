const d = document,
    $fragmaneto = d.createDocumentFragment(),
    $template = d.getElementById('flags').content,
    $flagSection = d.getElementById("flags-section"),
    $inputFilter = d.querySelector(".filter"),
    $inputSearch = d.querySelector(".search");

const themes = ()=>{
    let $butTheme = d.getElementById("theme");
    $butTheme.addEventListener("click",(e)=>{
        d.body.classList.toggle("bodyDark");
        d.querySelector("header").classList.toggle("headerDark");
    });
};

const dataPeticion = async () => {
    const error = d.createElement('h1');
   try{
    let data = `data.json`;
    let res = await fetch(data);

    if(!res.ok){
        throw new Error("Ocurrión un Error en la Petición");
    };

    let json = await res.json();

    json.forEach(el => {
        let {name,nativeName, population,region,subregion,capital,topLevelDomain,currencies,languages,alpha3Code
        } = el;

        $template.querySelector('.flag-img').src = el.flags.svg;
        $template.querySelector('.flag-img').alt = el.name;
        $template.querySelector('.flag-name').innerHTML = el.name;
        $template.querySelector('.flag-name').innerHTML = el.name;
        $template.querySelector(".flag-population").textContent = el.population;
        $template.querySelector(".flag-region").textContent = el.region;
        $template.querySelector(".flag-capital").textContent = el.capital;

        let $clone = d.importNode($template,true);
        $fragmaneto.appendChild($clone);
    });

    $flagSection.appendChild($fragmaneto)

        console.log($fragmaneto)

    console.log(json);
    // return json;

   }catch(err){
        console.error(err);
        error.innerHTML = err;
        error.classList.add("error");
        d.querySelector('main').appendChild(error)
   }
};

const filtroRegion = ()=>{
   let flag = d.querySelectorAll(".flag");
   flag.forEach((el)=> console.log(el.querySelectorAll(".flag-region").value))
}
d.addEventListener("keyup",(e)=>{
   filtroRegion()
})
d.addEventListener("DOMContentLoaded",()=>{
    dataPeticion();
    themes();
})
 



