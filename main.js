const url = "https://pokeapi.co/api/v2/pokemon/";
const myPokemones = document.querySelector(".cajaPokemones");

const cambiarId = async(id)=>{
    let data = await (await fetch(url + `${id}/`)).json();
    console.log(data);
    mostrarPokemon(data);
};

const mostrar = (cantidad)=>{
    for (let i = 1; i <= cantidad; i++) {
        cambiarId(i)
    }
};

const mostrarPokemon = (pokemon)=>{
    myPokemones.insertAdjacentHTML("beforeend", `
    <div class="cajaPokemon">
        <div class="cajaImagen">
            <img src="${pokemon.sprites.front_default}">
        </div>
        <button class="nombre">${pokemon.name}</button>
    </div>`);

    const click = document.querySelectorAll(".nombre");
    console.log(click);
    click.forEach(element => {
        console.log(element);
        element.addEventListener("click",()=>{
            let img = pokemon.sprites.other.home.front_default;
            let defaultImg = "https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif";
            Swal.fire({
                title: `${pokemon.name}`,
                text: 'Modal with a custom image.',
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
            });
        });
    });
};

mostrar(7);