package es.urjc.code.pokedex;

import org.bson.BsonDocument;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		MongoClientOptions options = MongoClientOptions.builder().connectionsPerHost(100).build();
        MongoClient client = new MongoClient(new ServerAddress(), options);

        MongoDatabase db = client.getDatabase("test").withReadPreference(ReadPreference.secondary());
        MongoCollection<BsonDocument> coll = db.getCollection("test", BsonDocument.class); //generic interface
		SpringApplication.run(App.class, args);
	}
}
