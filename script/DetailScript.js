
const d = document,
    flag = JSON.parse(localStorage.getItem("flag")),
    $template = d.getElementById("flags").content,
    $fragmaneto = d.createDocumentFragment(),
    $flagSection = d.querySelector("#section-flags");
    console.log(flag)


const BordesCountries =  async (bordersCodes)=>{
    try{
      let res = await fetch("data.json");

      if(!res.ok) throw("Ocurrió un erro en la Petición");

      let json = await res.json(),
      borders = [];
      

      json.forEach(el => {
        if(bordersCodes.includes(el.alpha3Code))borders.push(el.name);
      });
      return {borders}
    }catch(err){
        $flagSection.innerHTML = `<h1>${err}</h1>`
    };
};
const FlagInfo  = (el) =>{
    $template.querySelector('.flag-img').src = el.flags.svg;
    $template.querySelector('.flag-img').alt = el.name;
    $template.querySelector('.flag-name').innerHTML = el.name;
    $template.querySelector(".native-name").innerHTML = el.nativeName;
    $template.querySelector(".flag-population").innerHTML = el.population;
    $template.querySelector(".flag-region").innerHTML = el.region;
    $template.querySelector(".sub-region").innerHTML = el.subregion;
    $template.querySelector(".flag-capital").innerHTML = el.capital;

    // isert Info Segndaria
    let languages = [],
        currencies =[];

    $template.querySelector(".top-Ldomain").innerHTML = el.topLevelDomain.join(", ");
    
    el.currencies.forEach(el => currencies.push(el.name))
    $template.querySelector(".currencies").innerHTML = currencies.join(", ");

    el.languages.forEach(el=>languages.push(el.name));
    $template.querySelector(".languages").innerHTML = languages.join(", ");

    
    $template.querySelector(".border-countries").innerHTML =+ BordesCountries(el.borders);
    $flagSection.appendChild($template)

    
}

d.addEventListener("DOMContentLoaded",()=>{
    FlagInfo(flag);
});