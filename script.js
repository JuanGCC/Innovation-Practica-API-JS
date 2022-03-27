const CaracteristicasPokemon = document.getElementById("CaracteristicasPokemon");
const inputPokeName = document.getElementById("pokeName");
const pokeImg = document.getElementById("pokeImg");
const NombrePokemonAccion = document.getElementById("NombrePokemonAccion");
const StatsPokemon = document.getElementById("StatsPokemon");
const BotonMovimientos = document.getElementById("BotonMovimientos");
const MovimientoPokemon = document.getElementById("MovimientoPokemon");
document.getElementById("CambioPokemon").addEventListener("click",(e) => {
    console.log("Hola "+ inputPokeName.value)
    CaracteristicasPokemon.innerHTML = "";
    StatsPokemon.innerHTML= "";
    MovimientoPokemon.innerHTML="";
        fetchPokemon(inputPokeName.value.toLowerCase())
}, false);
const fetchPokemon = (Pokemon) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`;
    fetch(url)
    .then((res) =>{
        if (res.status != "200") {
            console.log(res);
            
            pokeImage("./pokebola.png")
        }else{
            return res.json();
        }
    }).then((data) => {
        let movimientos = "";
        console.log(data);
        CaracteristicasPokemon.innerHTML = `<strong>Type</strong>: ${data.types[0].type.name}`
        for (const key in data.stats) {
            
            StatsPokemon.innerHTML += `
                                        <li id="li"><strong>${data.stats[key].stat.name}</strong> ${data.stats[key].base_stat}</li>
                                     `;
           
        }
        StatsPokemon.innerHTML += `
                                        <li id="li"><strong>Weight</strong> ${data.weight}</li>
                                     `;
                                     console.log(data.moves);
        for (const key2 in data.moves) {
            MovimientoPokemon.innerHTML += `<div class="col-3"><label class= "from-control"><strong>${data.moves[key2].move.name}</strong><label></div>`;
        }
        BotonMovimientos.innerHTML = `<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"">Movimientos</button>`
        NombrePokemonAccion.innerHTML = `<strong>${Pokemon.toUpperCase()}</strong>`;
        
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        console.log(pokeImg);
        $('[data-toggle="popover"]').popover({
            html: true
        }).click(function(e) {
        $(this).popover('toggle');
        e.preventDefault();
        });
    })
};


const pokeImage = (url) => {
    pokeImg.src = url;
}
// fetch('https://pokeapi.co/api/v2/pokemon/chikorita')
//   .then(response => response.json())
//   .then(data => console.log(data));
