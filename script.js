const d = document,
    $fragmaneto = d.createDocumentFragment(),
    $template = d.getElementById('flags').content,
    $flagSection = d.getElementById("flags-section");

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

        $template.getElementById('flag-img').src = el.flags.svg;
        $template.getElementById('flag-img').alt = el.name;
        $template.getElementById('flag-name').innerHTML = el.name;
        $template.getElementById('flag-name').innerHTML = el.name;
        $template.getElementById("flag-population").textContent = el.population;
        $template.getElementById("flag-region").textContent = el.region;
        $template.getElementById("flag-capital").textContent = el.capital;

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


dataPeticion()


