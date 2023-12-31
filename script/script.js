const d = document,
    $fragmaneto = d.createDocumentFragment(),
    $template = d.querySelector('.flags').content,
    $flagSection = d.getElementById("flags-section"),
    $inputFilter = d.querySelector(".filter"),
    $inputSearch = d.querySelector(".search");
    
 function themes(){
    let $butTheme = d.querySelector(".theme");
    $butTheme.addEventListener("click",(e)=>{
        if($butTheme.textContent === "Dark Mode"){
            $butTheme.innerHTML = '<i class="fas fa-moon"></i>Ligth Mode';
        }else{
            $butTheme.innerHTML = '<i class="fas fa-moon"></i>Dark Mode';
        }
        d.body.classList.toggle("bodyDark");
        d.querySelector("header").classList.toggle("headerDark");
        d.querySelector("nav").classList.toggle("darkNav")
        $flagSection.querySelectorAll(".flag").forEach(el => el.classList.toggle("darkFlag"));
        d.querySelector("footer").querySelector("a").classList.toggle("darkFooter");
    });
};

const flags = (el)=>{
        $template.querySelector('.flag-img').src = el.flags.svg;
        $template.querySelector('.flag-img').alt = el.name;
        $template.querySelector('.flag-name').innerHTML = el.name;
        $template.querySelector(".flag-population").textContent = el.population
        $template.querySelector(".flag-region").innerHTML = el.region;
        $template.querySelector(".flag-capital").innerHTML = el.capital;
        $template.querySelector(".flag").id = el.alpha3Code;
    
        let $clone = d.importNode($template,true);
        $fragmaneto.appendChild($clone);
};

const infoCountry = (json)=>{
    $flagSection.querySelectorAll(".flag").forEach(flag => {
        flag.addEventListener("click",()=>{
            json.forEach(el => {
                if(el.alpha3Code === flag.id){
                    localStorage.setItem("flag",JSON.stringify(el));
                    location.href = "Detail.html";
                    // para abrit en otra ventana = window.open("Detail.html","_blank");
                };
            });
        });
    });
}

const filtroSearch =(json)=>{
    console.log(json);
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
       json.forEach(el =>{
            if(e.key === 'Escape') $inputFilter.value = null;

            if(el.region.toLowerCase().includes($inputFilter.value.toLowerCase())) flags(el);
        });
        $flagSection.appendChild($fragmaneto);
        infoCountry(json);
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
        json.forEach(el => {
            flags(el);
        });
        filtroRegion(json);
        filtroSearch(json);
        $flagSection.appendChild($fragmaneto);
        infoCountry(json);
    }catch(err){
        console.error(err);
        error.innerHTML = err;
        error.classList.add("error");
        d.querySelector('main').appendChild(error);
   };
};

d.addEventListener("DOMContentLoaded",()=>{
    dataPeticion();
    themes();
});
 



