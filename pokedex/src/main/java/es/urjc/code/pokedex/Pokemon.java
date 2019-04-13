package es.urjc.code.pokedex;

import java.util.Arrays;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Pokemon {
	@Id
	private ObjectId _id;

	private String[] abilities;
	private float against_bug;
	private float against_dark;
	private float against_dragon;
	private float against_electric;
	private float against_fairy;
	private float against_fight;
	private float against_fire;
	private float against_flying;
	private float against_ghost;
	private float against_grass;
	private float against_ground;
	private float against_ice;
	private float against_normal;
	private float against_poison;
	private float against_psychic;
	private float against_rock;
	private float against_steel;
	private float against_water;
	private int attack;
	private int base_egg_steps;
	private int base_happiness;
	private int base_total;
	private String capture_rate;
	private String classfication;
	private int defense;
	private int experience_growth;
	private float height_m;
	private int hp;
	private String japanese_name;
	private String name;
	private float percentage_male;
	private int pokedex_number;
	private int sp_attack;
	private int sp_defense;
	private int speed;
	private String type1;
	private String type2;
	private float weight_kg;
	private int generation;
	private int is_legendary;

	// Constructors
	public Pokemon() {
	}

	public Pokemon(ObjectId _id, String name) {
		this._id = _id;
		this.name = name;
	}

	// ObjectId needs to be converted to string
	public String get_id() {
		return _id.toHexString();
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String[] getAbilities() {
		return abilities;
	}

	public void setAbilities(String[] abilities) {
		this.abilities = abilities;
	}

	public float getAgainst_bug() {
		return against_bug;
	}

	public void setAgainst_bug(float against_bug) {
		this.against_bug = against_bug;
	}

	public float getAgainst_dark() {
		return against_dark;
	}

	public void setAgainst_dark(float against_dark) {
		this.against_dark = against_dark;
	}

	public float getAgainst_dragon() {
		return against_dragon;
	}

	public void setAgainst_dragon(float against_dragon) {
		this.against_dragon = against_dragon;
	}

	public float getAgainst_electric() {
		return against_electric;
	}

	public void setAgainst_electric(float against_electric) {
		this.against_electric = against_electric;
	}

	public float getAgainst_fairy() {
		return against_fairy;
	}

	public void setAgainst_fairy(float against_fairy) {
		this.against_fairy = against_fairy;
	}

	public float getAgainst_fight() {
		return against_fight;
	}

	public void setAgainst_fight(float against_fight) {
		this.against_fight = against_fight;
	}

	public float getAgainst_fire() {
		return against_fire;
	}

	public void setAgainst_fire(float against_fire) {
		this.against_fire = against_fire;
	}

	public float getAgainst_flying() {
		return against_flying;
	}

	public void setAgainst_flying(float against_flying) {
		this.against_flying = against_flying;
	}

	public float getAgainst_ghost() {
		return against_ghost;
	}

	public void setAgainst_ghost(float against_ghost) {
		this.against_ghost = against_ghost;
	}

	public float getAgainst_grass() {
		return against_grass;
	}

	public void setAgainst_grass(float against_grass) {
		this.against_grass = against_grass;
	}

	public float getAgainst_ground() {
		return against_ground;
	}

	public void setAgainst_ground(float against_ground) {
		this.against_ground = against_ground;
	}

	public float getAgainst_ice() {
		return against_ice;
	}

	public void setAgainst_ice(float against_ice) {
		this.against_ice = against_ice;
	}

	public float getAgainst_normal() {
		return against_normal;
	}

	public void setAgainst_normal(float against_normal) {
		this.against_normal = against_normal;
	}

	public float getAgainst_poison() {
		return against_poison;
	}

	public void setAgainst_poison(float against_poison) {
		this.against_poison = against_poison;
	}

	public float getAgainst_psychic() {
		return against_psychic;
	}

	public void setAgainst_psychic(float against_psychic) {
		this.against_psychic = against_psychic;
	}

	public float getAgainst_rock() {
		return against_rock;
	}

	public void setAgainst_rock(float against_rock) {
		this.against_rock = against_rock;
	}

	public float getAgainst_steel() {
		return against_steel;
	}

	public void setAgainst_steel(float against_steel) {
		this.against_steel = against_steel;
	}

	public float getAgainst_water() {
		return against_water;
	}

	public void setAgainst_water(float against_water) {
		this.against_water = against_water;
	}

	public int getAttack() {
		return attack;
	}

	public void setAttack(int attack) {
		this.attack = attack;
	}

	public int getBase_egg_steps() {
		return base_egg_steps;
	}

	public void setBase_egg_steps(int base_egg_steps) {
		this.base_egg_steps = base_egg_steps;
	}

	public int getBase_happiness() {
		return base_happiness;
	}

	public void setBase_happiness(int base_happiness) {
		this.base_happiness = base_happiness;
	}

	public int getBase_total() {
		return base_total;
	}

	public void setBase_total(int base_total) {
		this.base_total = base_total;
	}

	public String getCapture_rate() {
		return capture_rate;
	}

	public void setCapture_rate(String capture_rate) {
		this.capture_rate = capture_rate;
	}

	public String getClassfication() {
		return classfication;
	}

	public void setClassfication(String classfication) {
		this.classfication = classfication;
	}

	public int getDefense() {
		return defense;
	}

	public void setDefense(int defense) {
		this.defense = defense;
	}

	public int getExperience_growth() {
		return experience_growth;
	}

	public void setExperience_growth(int experience_growth) {
		this.experience_growth = experience_growth;
	}

	public float getHeight_m() {
		return height_m;
	}

	public void setHeight_m(float height_m) {
		this.height_m = height_m;
	}

	public int getHp() {
		return hp;
	}

	public void setHp(int hp) {
		this.hp = hp;
	}

	public String getJapanese_name() {
		return japanese_name;
	}

	public void setJapanese_name(String japanese_name) {
		this.japanese_name = japanese_name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPercentage_male() {
		return percentage_male;
	}

	public void setPercentage_male(float percentage_male) {
		this.percentage_male = percentage_male;
	}

	public int getPokedex_number() {
		return pokedex_number;
	}

	public void setPokedex_number(int pokedex_number) {
		this.pokedex_number = pokedex_number;
	}

	public int getSp_attack() {
		return sp_attack;
	}

	public void setSp_attack(int sp_attack) {
		this.sp_attack = sp_attack;
	}

	public int getSp_defense() {
		return sp_defense;
	}

	public void setSp_defense(int sp_defense) {
		this.sp_defense = sp_defense;
	}

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
	}

	public String getType1() {
		return type1;
	}

	public void setType1(String type1) {
		this.type1 = type1;
	}

	public String getType2() {
		return type2;
	}

	public void setType2(String type2) {
		this.type2 = type2;
	}

	public float getWeight_kg() {
		return weight_kg;
	}

	public void setWeight_kg(float weight_kg) {
		this.weight_kg = weight_kg;
	}

	public int getGeneration() {
		return generation;
	}

	public void setGeneration(int generation) {
		this.generation = generation;
	}

	public int isIs_legendary() {
		return is_legendary;
	}

	public void setIs_legendary(int is_legendary) {
		this.is_legendary = is_legendary;
	}

	@Override
	public String toString() {
		return "Pokemon [_id=" + _id + ", abilities=" + Arrays.toString(abilities) + ", against_bug=" + against_bug
				+ ", against_dark=" + against_dark + ", against_dragon=" + against_dragon + ", against_electric="
				+ against_electric + ", against_fairy=" + against_fairy + ", against_fight=" + against_fight
				+ ", against_fire=" + against_fire + ", against_flying=" + against_flying + ", against_ghost="
				+ against_ghost + ", against_grass=" + against_grass + ", against_ground=" + against_ground
				+ ", against_ice=" + against_ice + ", against_normal=" + against_normal + ", against_poison="
				+ against_poison + ", against_psychic=" + against_psychic + ", against_rock=" + against_rock
				+ ", against_steel=" + against_steel + ", against_water=" + against_water + ", attack=" + attack
				+ ", base_egg_steps=" + base_egg_steps + ", base_happiness=" + base_happiness + ", base_total="
				+ base_total + ", capture_rate=" + capture_rate + ", classfication=" + classfication + ", defense="
				+ defense + ", experience_growth=" + experience_growth + ", height_m=" + height_m + ", hp=" + hp
				+ ", japanese_name=" + japanese_name + ", name=" + name + ", percentage_male=" + percentage_male
				+ ", pokedex_number=" + pokedex_number + ", sp_attack=" + sp_attack + ", sp_defense=" + sp_defense
				+ ", speed=" + speed + ", type1=" + type1 + ", type2=" + type2 + ", weight_kg=" + weight_kg
				+ ", generation=" + generation + ", is_legendary=" + is_legendary + "]";
	}
}