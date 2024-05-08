import { useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

export default function BibStatus(){

const [loading, setLoading] = useState(true);

if (loading) {
 return <ActivityIndicator />   
}

return(
    <p>Hier kommen dann Statusanzeigen hin</p>
);
}