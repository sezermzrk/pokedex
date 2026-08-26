import { useEffect,useState } from "react";
import { Image, Text, View, ScrollView } from "react-native";

interface Pokemon {
  name : string;
  image : string;
  url : string;
  imageBack : string;
}

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
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (error) {
      console.log(error)
    }
 }
  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
          <Image source={{ uri: pokemon.image }} style={{ width: 100, height: 100 }} />
          <Image source={{ uri: pokemon.imageBack }} style={{ width: 100, height: 100 }} />
        </View>
      ))}
    </ScrollView>
  );
}
