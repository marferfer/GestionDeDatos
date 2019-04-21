package es.urjc.code.pokedex;

import es.urjc.code.pokedex.Pokemon;
import es.urjc.code.pokedex.PokemonRepository;

import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mongodb.BasicDBList;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import javax.validation.Valid;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {
	@Autowired
	private PokemonRepository repository;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<String> getAllPokemon(@RequestBody Order order) {
		MongoClientOptions options = MongoClientOptions.builder().connectionsPerHost(100).build();
		MongoClient client = new MongoClient(new ServerAddress(), options);

		MongoDatabase db = client.getDatabase("pokemon").withReadPreference(ReadPreference.secondary());
		MongoCollection<BsonDocument> coll = db.getCollection("pokemon", BsonDocument.class); // generic interface
		/*
		 * if (order.getOrden() == "ascendente") { Bson sort = new Document("name", 1);
		 * }
		 */
		//System.out.println(order);
		List<String> pokemons = new LinkedList<>();
		for (Pokemon p : repository.findAll()) {
			String name = p.get_id() + "-" + p.getName();
			pokemons.add(name);
		}
		return pokemons;
	}

	/*
	 * @RequestMapping(value = "/", method = RequestMethod.GET) public List<Pokemon>
	 * getAllPokemon() { return repository.findAll(); }
	 */

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public List<String> getPokemonById(@PathVariable("id") String id) {
		List<String> pokemons = new LinkedList<>();
		if (id.substring(0, 1).equals("5")) { //Comprobar si es un id
			//System.out.println(id.charAt(0));
			ObjectId _id = new ObjectId(id);
			Gson g = new Gson();
			String pokemon = g.toJson(repository.findBy_id(_id));
			pokemons.add(pokemon);
		}
		else { //En caso contrario es una orden	
			MongoClientOptions options = MongoClientOptions.builder().connectionsPerHost(100).build();
	        MongoClient client = new MongoClient(new ServerAddress(), options);
	
	        MongoDatabase db = client.getDatabase("pokemon").withReadPreference(ReadPreference.secondary());
	        MongoCollection<BsonDocument> coll = db.getCollection("pokemon", BsonDocument.class); //generic interface
	        Gson g = new Gson(); 
	        Order order = g.fromJson(id, Order.class);
	        Bson sort = new Document("name", 1);
	        if (order.getOrden().equals("Descendente")) {
				sort = new Document("name", -1);
			}
	        Bson filter = null;
	        Document gen = new Document();
	        BasicDBList listGen = new BasicDBList();
	        //Filtro por generación
	        for (int i = 0; i < order.getGeneracion().length; i++) {
        		listGen.add(new Document("generation", order.getGeneracion()[i]));
        	}
	        if (!listGen.isEmpty()) {
	        	gen = new Document("$or", listGen);
	        }
	        else {
	        	gen = new Document("generation", new Document("$gt", -1));
	        }
	        //Filtro por tipo
	        BasicDBList listType = new BasicDBList();
	        Document type = new Document();
	        for (int i = 0; i < order.getTipo().length; i++) {
        		listType.add(new Document("type1", order.getTipo()[i]));
        		listType.add(new Document("type2", order.getTipo()[i]));
        	}
	        if (!listType.isEmpty()) {
	        	type = new Document("$or", listType);
	        }
	        else {
	        	type = new Document("generation", new Document("$gt", 0));
	        }
	        
	        //Filtro por legendario
	        Document legendario;
	        if (order.isLegendario()) {
	        	legendario = new Document("is_legendary", 1);
	        }
	        else {
	        	legendario = new Document("is_legendary", "0");
	        }
	        //Aplicación de todos los filtros
	        if (order.getGeneracion().length > 0 || order.getTipo().length > 0 || order.isLegendario()) {
	        	BasicDBList allFilters = new BasicDBList();
	        	allFilters.add(type);
	        	allFilters.add(gen);
	        	allFilters.add(legendario);
	        	filter = new Document("$and", allFilters);
	        }
	        else {
	        	filter = new Document("generation", new Document("$gt", 0));
	        }
			for (BsonDocument p : coll.find().filter(filter).sort(sort)) {
				String objId = "" + p.get("_id");
				String name = "" + p.get("name");
				String str = objId.split("=")[1].split("}")[0] + "-" + name.split("'")[1];
				
				pokemons.add(str);
			}
		}
		return pokemons;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void modifyPokemonById(@PathVariable("id") ObjectId id, @Valid @RequestBody Pokemon pokemon) {
		pokemon.set_id(id);
		repository.save(pokemon);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Pokemon createPokemon(@Valid @RequestBody Pokemon pokemon) {
		pokemon.set_id(ObjectId.get());
		repository.save(pokemon);
		return pokemon;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deletePokemon(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
}