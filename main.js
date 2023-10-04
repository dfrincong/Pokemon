const url = "https://pokeapi.co/api/v2/pokemon/";
const uri = "http://127.0.0.7:5013/pokemon";
const myPokemones = document.querySelector(".cajaPokemones");
let n = Number(prompt("ingrese el número de pokemones a ver (entre 1 y 1292): "));

// para enviar informacion a mockapi
const enviar =  async(estadistica)=>{
    let config = {
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(estadistica)
    };
    let res = await (await fetch(uri, config)).json();
    console.log(res);
};

// FUNCIONNALIDADES PARA MOSTRAR POKEMONES
const cambiarId = async(id)=>{
    let data = await (await fetch(url + `${id}/`)).json();
    // console.log(data);
    mostrarPokemon(data);
};

const mostrar = (cantidad)=>{
    if (cantidad <= 1292  && cantidad >= 1) {
        for (let i = 1; i <= cantidad; i++) {
            if (i <= 1017) {
                cambiarId(i);  // después del id "1017" el siguiente id es "10001"
            } else if (i <= 1292) {
                cambiarId(i+8983);
            } 
        }
    } else {
        alert("número de pokemones erroneo");
        location.reload();
    }  
};

const mostrarPokemon = (pokemon)=>{
    myPokemones.insertAdjacentHTML("beforeend", `
    <div class="cajaPokemon">
        <div class="cajaImagen">
            <img src="${pokemon.sprites.front_default}">
        </div>
        <button class="nombre" data-name="${pokemon.name}">${pokemon.name}</button>
    </div>`);
};


// MOSTRAR TARJETA DE ESTADÏSTICAS
document.addEventListener("click", async (e)=>{
    // console.log(e.target);

    // .matches (Similar a querySelector)
    if(e.target.matches(".nombre")){
        let pokemon = await (await fetch(url + `${e.target.dataset.name}/`)).json();
        let img = pokemon.sprites.other.home.front_default;
        let defaultImg = "https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif";
        Swal.fire({
            title: `${pokemon.name}`,
            imageUrl:  `${(img) ?  img : defaultImg}`,
            html: `
                ${pokemon.stats.map(data=>`
                    <input 
                        type="range" 
                        id="${data.stat.name}" 
                        value="${data.base_stat}"
                        max="200">
                    <label for="${data.stat.name}"> 
                        ${data.base_stat} 
                        ${data.stat.name}</label><br>
                        `).join("")}
            `,
            imageWidth: "60%",
            imageHeight: "80%",
            background: "lightblue",
            cancelButtonText: 'Visto',
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            reverseButtons: true
        });

        // HACER LA ESTADISTICA INTERACTIVA
        const rangoInputs = document.querySelectorAll('input[type="range"]');
        rangoInputs.forEach(entrada => {
            // console.log(entrada);
            const statName = entrada.id;
            entrada.addEventListener('input', (e)=>{
                // console.log(e.target.value);
                const label = document.querySelector(`label[for="${statName}"]`);
                label.textContent = entrada.value + " " + statName;
            });
        });
    };
});

mostrar(n);