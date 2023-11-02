import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import { COLORS, FONTS } from "../constants";
import { Card, ActivityIndicator } from 'react-native-paper'
import { Link } from "expo-router";

const NewsCard = ({ item }) => {
    return (
        <Link href={item.url} asChild>
            <TouchableOpacity>
                <Card style={style.CardContainer}>
                    <Card.Title title={item.title} style={style.NewsTitle}
                        titleVariant='titleMedium'
                        titleNumberOfLines={2}
                    />
                    <Card.Cover
                        source={{ uri: item.urlToImage }}
                        style={style.NewsImage}
                    />
                    <Card.Content>
                        <Text numberOfLines={3}>
                            {item.description}
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </Link>
    );
};

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month}`;
}
const NewsWidget = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/everything?q=NBA&pageSize=10&from=${getDate}&sortBy=popularity&apiKey=207ebfb92a7b450998044884cd52bd3d&language=en&searchIn=title,description`)
            .then(({ data }) => {
                //console.log("defaultApp -> data", data.articles)
                setData(data.articles)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList horizontal={true}
                    data={data}
                    keyExtractor={(item, index) => {
                        //console.log("index", index)
                        return index.toString();
                    }}
                    renderItem={({ item }) => {
                        //console.log("item", item)
                        return (<NewsCard item={item} />)
                    }}
                />
            )}
        </SafeAreaView>
    );
};
export default NewsWidget

const style = StyleSheet.create({
    CardContainer: {
        backgroundColor: COLORS.orange,
        margin: 5,
        width: 300,
        height: 250,
    },
    NewsImage: {
        marginHorizontal: 5,
        width: 290,
        height: 120,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#121212",
        backgroundColor: "transparent",
    },
    NewsTitle: {
        textAlign: "left",
        color: "#121212",
        left: 3,
        fontWeight: "bold",
    }
})