
import { Image, Text, View, ScrollView, StyleSheet} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function Details() {

  const params = useLocalSearchParams();
  const [color, setColor] = useState('#FFFFFF');

  const pokemonName = (params.name as string).toUpperCase();
  console.log("Params in RootLayout:", params); // Log the params to see their structure

  useEffect(() => {
    fetchPokemonDetails(params.name as string);
    const randomHex = '#' + Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    setColor(randomHex);
  }, []);
  async function fetchPokemonDetails(name: string) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      console.log("Pokemon Details:", data); // Log the fetched data to see its structure
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Stack.Screen options={{ title: pokemonName}} />
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
    <Image source={{ uri: params.image as string }} style={{ width: 150, height: 150 }} />
      <Text style={{ color }}>{pokemonName}</Text>
    </ScrollView>
    </>
  );
}

