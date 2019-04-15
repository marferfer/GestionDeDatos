package es.urjc.code.pokedex;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.bson.BsonDocument;
import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		//Una unica vez
		MongoClientOptions options = MongoClientOptions.builder().connectionsPerHost(100).build();
        MongoClient client = new MongoClient(new ServerAddress(), options);

        MongoDatabase db = client.getDatabase("pokemon").withReadPreference(ReadPreference.secondary());
        MongoCollection<BsonDocument> coll = db.getCollection("pokemon", BsonDocument.class); //generic interface
        
        
        
        
        
		//METODO PARA MODIFICAR UNA TABLA DE LA BASE DE DATOS || EN ESTE CASO LAS DE IMAGENES
		/*List<String> pokemons = new LinkedList<>();
		int cont = 0;
        for (BsonDocument p : coll.find()) {
			cont++;
			//coll.updateOne(Filters.eq("pokedex_number", cont), new Document("$set", new Document("photos", Arrays.asList("img/pokemon/"+cont+".png"))));
			String objId = "" + p.get("photos");
			String str = objId;
			pokemons.add(str);
			
		}
        
        System.out.println(pokemons);*/
        
		SpringApplication.run(App.class, args);
	}
}
