const poke_container = document.getElementById('poke_container');

const pokemon_number = 151;

const colors = {
	fire: '#f54d4c',
	grass: '#85cf5e',
	electric: '#e6da48',
	water: '#5aa6f7',
	ground: '#e8c651',
	rock: '#c9b76a',
	fairy: '#f1a8f7',
	poison: '#aa5aa6',
	bug: '#bdc82a',
	dragon: '#8674e5',
	psychic: '#f66abb',
	flying: '#7ea6f7',
	fighting: '#a3524a',
	normal: '#b7b8b2',
	steel:	"#bfbad8",
	dark: "#866b5a",
	ice: "#8eeaf7",
	ghost: "#766ed6"
};

const main_types = Object.keys(colors);
const getPokemon = async id =>{
	const url=`https://pokeapi.co/api/v2/pokemon/${id}/`
	
	 
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
}

const fetchPokemons = async ()=>{
	for(let i=1; i<=pokemon_number;i++){
		await getPokemon(i);
	}
}

fetchPokemons(); 



function createPokemonCard(pokemon){
	const pokeEl = document.createElement('div');
	pokeEl.classList.add('pokemon');
	
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const poke_types = pokemon.types.map(t => t.type.name);
	if(poke_types.length > 1){
		t = poke_types.join("-");
		const color = t.split("-");
		pokeEl.style.background = "linear-gradient(to right,"+colors[color[0]]+","+colors[color[1]]+")";
		console.log(colors[color[1]])
	} 
	else{
		t = main_types.find(t=>poke_types.indexOf(t)>-1)
		const color = colors[t]
		pokeEl.style.backgroundColor = color;
		console.log("test2: "+color +"" + t) 
	}
	
	const pokeInnerHTML = `
		<div class="img-container">
			<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/> 
		</div> 
		 
		<div class="info">
			<span class="number"> #${pokemon.id.toString().padStart(3,'0')}</span>
			<h3 class="name">${name}</h3>
			<small class="type">
				Type: <span>${t}</span>
			</small>
		</div>
	`;
	pokeEl.innerHTML = pokeInnerHTML;
	poke_container.appendChild(pokeEl)
}




// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible') 
});