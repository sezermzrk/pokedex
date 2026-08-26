import { Link } from "expo-router";
import { useEffect,useState } from "react";
import { Image, Text, View, ScrollView, StyleSheet, Pressable} from "react-native";

interface Pokemon {
  name : string;
  image : string;
  url : string;
  imageBack : string;
  types : PokemonType[];
  abilities: string[];
}
interface PokemonType {
  type: {
    name: string;
    url: string;
  };

}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

const colorsByType: { [key: string]: string } = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};
export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect (() => {
    //fetch pokemons
    fetchPokemons()
  },[])
 async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&");
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: Pokemon) => {
          const response = await fetch(pokemon.url);
          const detailedData = await response.json();
          return {
            name:pokemon.name,
            image: detailedData.sprites.front_default,
            imageBack: detailedData.sprites.back_default,
            types : detailedData.types,
            abilities : detailedData.abilities.map(
                      (item: PokemonAbility) => item.ability.name),
           
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (error) {
      console.log(error)
    }
 }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      {pokemons.map((pokemon) => (
        <Link 
        key={pokemon.name}
        href={{ pathname: "/details", params: { name: pokemon.name } }} style={{ backgroundColor: colorsByType[pokemon.types[0].type.name] +50, padding: 10, margin: 10, borderRadius: 10 }}>
        <View key={pokemon.name} >
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name} </Text>
          
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: pokemon.image }} style={{ width: 150, height: 150 }} />
            <Image source={{ uri: pokemon.imageBack }} style={{ width: 150, height: 150 }} />
          </View>
            <Text style={styles.ability}>Abilities:</Text>
            {pokemon.abilities.map((ability) => (
            <Text key={ability} style={styles.ability}>
            {ability}
            </Text>
  ))}
    
          
        </View>
        </Link>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
  ability: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#265747",
    textAlign: "center",
  }
});