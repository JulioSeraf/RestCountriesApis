const d = document;
async function dataPeticion(){
    const error = d.createElement('h1');
   try{
    let data = `data.json`
    let res = await fetch(data);

    if(!res.ok){
        throw new Error("Ocurrión un Error en la Petición");
    }
    let json = await res.json();
    console.log(json)
    return json;
   }catch(err){
        console.error(err);
        error.innerHTML = err;
        error.classList.add("error");
        d.querySelector('main').appendChild(error)
   }
}
console.log(dataPeticion())