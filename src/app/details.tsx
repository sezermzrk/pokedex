
import { Image, Text, View, ScrollView, StyleSheet} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function Details() {

  const params = useLocalSearchParams();
  console.log("Params in RootLayout:", params); // Log the params to see their structure

  useEffect(() => {
    fetchPokemonDetails(params.name as string);
  }, []);
  async function fetchPokemonDetails(name: string) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
      const data = await response.json();
      console.log("Pokemon Details:", data); // Log the fetched data to see its structure
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Stack.Screen options={{ title: params.name as string}} />
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{params.name}</Text>
    </ScrollView>
    </>
  );
}

