// let myPokemon = document.querySelector("#myPokemon");

// myPokemon.addEventListener("click", async()=> {
//     let res = await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json();
//     let img = res.sprites.front_default;
//     let defaultImg = "https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif" 

//     Swal.fire({
//         title: `${res.name}`,
//         text: 'Modal with a custom image.',
//         // imageUrl: `${res.sprites.front_default}`,
//         imageUrl:  `${(img) ?  img : defaultImg}`,
//         html: `
//             ${res.stats.map(data=>`
//                 <input 
//                     type="range" 
//                     id="uno" 
//                     value="${data.base_stat}">
//                 <label for="uno"> 
//                     ${data.base_stat} 
//                     ${data.stat.name}</label><br>
//                     `).join("")}   
//         `,
//         imageWidth: "80%",
//         imageHeight: "80%",
//     });
// });

const url = "https://pokeapi.co/api/v2/pokemon/";
let myPokemon = document.querySelector("#myPokemon");

const cambiarId = (id)=>{
    fetch(url + `${id}/`)
        .then(res => res.json())
        .then(data => console.log(data));
};

const mostrar = (cantidad)=>{
    for (let i = 1; i <= cantidad; i++) {
        cambiarId(i)
    }
};

mostrar(3);