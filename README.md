# Pokemon
> Página para visualizar las imagenes de pokemones, observar sus estadisticas y modificarlas.

## Funcionalidades
> Se pueden realizar las siguientes acciones con los datos:
- Visualizar pokemones y sus estadísticas: `PokéApi y SweetAlert2`
- Editar estadísticas de los pokemones: `<input type="range>"`
- Enviar información de las estadisticas modificadas: `MockAPi"`

## ¿Cómo funciona?
> A continuación se detalla como funciona la página.

### 1. Visualizar pokemones

**Method** : `GET`

**Version** : `v2`

**URL** : `https://pokeapi.co/api/v2/pokemon/`

**Storage** : `main.js`

**Response** : 

```js
document.addEventListener("click", async (e)=>{
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
```

---

### 2. Enviar estadísticas a MockApi

**Method** : `POST`

**URL** : `https://650ee92e54d18aabfe999cc6.mockapi.io/pokemon/`

**Storage** : `main.js`

**Response** :

```js
const enviar =  async(estadistica)=>{
    let config = {
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(estadistica)
    };
    let res = await (await fetch(urlMockApi, config)).json();
    console.log(res);
};
```
