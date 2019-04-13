package es.urjc.code.pokedex;

import es.urjc.code.pokedex.Pokemon;
import es.urjc.code.pokedex.PokemonRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {
	@Autowired
	private PokemonRepository repository;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<String> getAllPokemon() {
		List<String> pokemons = new LinkedList<>();
		for (Pokemon p : repository.findAll()) {
			String name = p.get_id() + "-" + p.getName();
			pokemons.add(name);
		}
		return pokemons;
	}
	
	/*@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Pokemon> getAllPokemon() {
		return repository.findAll();
	}*/

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Pokemon getPokemonById(@PathVariable("id") ObjectId id) {
		return repository.findBy_id(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void modifyPokemonById(@PathVariable("id") ObjectId id, @Valid @RequestBody Pokemon pokemons) {
		pokemons.set_id(id);
		repository.save(pokemons);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Pokemon createPokemon(@Valid @RequestBody Pokemon pokemons) {
		pokemons.set_id(ObjectId.get());
		repository.save(pokemons);
		return pokemons;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deletePokemon(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
}