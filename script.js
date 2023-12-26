

const d = document,
    $fragmaneto = d.createDocumentFragment(),
    $template = d.getElementById('flags').content,
    $flagSection = d.getElementById("flags-section"),
    $inputFilter = d.querySelector(".filter"),
    $inputSearch = d.querySelector(".search");

    function themes(){
        let $butTheme = d.querySelector(".theme");
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
        $template.querySelector(".flag").id = el.alpha3Code
        ;


        let $clone = d.importNode($template,true);
        $fragmaneto.appendChild($clone);
}

const filtroSearch =(json)=>{
    console.log(json)
    $inputSearch.addEventListener("input",(e)=>{
        let nameSearch = e.target.value.toLowerCase()
        json.forEach(el => {
            if( nameSearch === el.name.toLowerCase() || 
            el.name.toLowerCase().includes(nameSearch)){
                flags(el);
            };
        });
    });
};

const filtroRegion = (json)=>{
    d.addEventListener("keyup",(e)=>{
        $flagSection.innerHTML = "";
        // console.log($inputSearch.value)
       json.forEach(el =>{
            if(e.key === 'Escape') $inputFilter.value = null;
            console.log(e.key)

            if(el.region.toLowerCase().includes($inputFilter.value.toLowerCase())){ 
                flags(el)
            }
        });
        $flagSection.appendChild($fragmaneto);
    });
 };

 const CompletInfoPage = (json)=>{
    $flagSection.querySelectorAll(".flag").forEach(el =>{
        el.addEventListener("click",(e)=>{
            json.forEach(flag => {
                if(flag.alpha3Code === el.id){
                   
                };
            });
        });
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
    // console.log(json)
    json.forEach(el => { flags(el)});

    filtroRegion(json);
    filtroSearch(json);

    $flagSection.appendChild($fragmaneto);
    
   CompletInfoPage(json);

   }catch(err){
        console.error(err);
        error.innerHTML = err;
        error.classList.add("error");
        d.querySelector('main').appendChild(error)
   };
};

// console.log(dataPeticion())
d.addEventListener("DOMContentLoaded",()=>{
    dataPeticion();
    themes();

});
 



