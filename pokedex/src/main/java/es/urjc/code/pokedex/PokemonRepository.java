package es.urjc.code.pokedex;

import es.urjc.code.pokedex.Pokemon;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PokemonRepository extends MongoRepository<Pokemon, String> {
  Pokemon findBy_id(ObjectId _id);
}


