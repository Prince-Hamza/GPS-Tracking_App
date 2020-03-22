import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const UIButton = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 70,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

       

        backgroundColor: 'magenta',        
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        elevation: 5,
        borderRadius:50
       
    },

    text: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
});