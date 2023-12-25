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

const flags = (el)=>{
        $template.querySelector('.flag-img').src = el.flags.svg;
        $template.querySelector('.flag-img').alt = el.name;
        $template.querySelector('.flag-name').innerHTML = el.name;
        $template.querySelector('.flag-name').innerHTML = el.name;
        $template.querySelector(".flag-population").textContent = el.population;
        $template.querySelector(".flag-region").textContent = el.region;
        $template.querySelector(".flag-capital").textContent = el.capital;

        let $clone = d.importNode($template,true);
        $fragmaneto.appendChild($clone);
}

const filtroRegion = (json)=>{
    d.addEventListener("keyup",(e)=>{
        $flagSection.innerHTML = "";
        // console.log($inputSearch.value)
       json.forEach(el =>{
            let search = el.name.toLowerCase().match(new RegExp($inputSearch.value, "gi"));
            if(e.key === 'Escape') $inputFilter.value = '';

            if(el.region.toLowerCase().includes($inputFilter.value.toLowerCase())) flags(el);
            
            if(el.name.toLowerCase() === $inputSearch.value.toLowerCase()) flags(el)
            
        });
        $flagSection.appendChild($fragmaneto);
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

    json.forEach(el => flags(el));

    filtroRegion(json);

    $flagSection.appendChild($fragmaneto);

   }catch(err){
        console.error(err);
        error.innerHTML = err;
        error.classList.add("error");
        d.querySelector('main').appendChild(error)
   }
};

console.log(dataPeticion())
d.addEventListener("DOMContentLoaded",()=>{
    dataPeticion();
    themes();
})
 



