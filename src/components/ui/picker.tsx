import { Spacing } from "@/constants/theme"
import { useTheme } from "@/hooks/use-theme"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native"
import { ThemedText } from "../themed-text"
import { ThemedView } from "../themed-view"

export interface PickerProps {
    defaultValue: string,
    currentValue: string | undefined,
    choices: string[],
    onSelect: (choice: string | undefined) => void
}

export function Picker({ defaultValue, currentValue, choices, onSelect }: PickerProps) {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedChoice, setSelectedChoice] = useState<string>(currentValue ?? defaultValue)

    const handleSelect = (choice: string | undefined) => {
        setSelectedChoice(choice ?? defaultValue);
        setIsOpen(false)
        if (onSelect) onSelect(choice);
    };

    const containerBorder: ViewStyle = {
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: isOpen ? 0 : 20,
        borderBottomEndRadius: isOpen ? 0 : 20,
    }

    return (
        <View style={styles.wrapper} >
            <Pressable
                style={[styles.container, { ...containerBorder }]}
                onPress={() => setIsOpen((prev) => {
                    if (isOpen) {
                        setSelectedChoice(defaultValue)
                        onSelect(undefined)
                    }
                    return !prev
                })}>
                <ThemedView style={styles.content}>
                    <ThemedText style={styles.text}>{selectedChoice}</ThemedText>
                    <ThemedView style={styles.chevron}>
                        <Feather name='chevron-down' size={22} color={theme.textInverted} />
                    </ThemedView>
                </ThemedView>
            </Pressable>

            {isOpen && (
                <ThemedView style={styles.dropdownList}>
                    <ScrollView style={styles.scrollView} nestedScrollEnabled >
                        {choices.map((choice) => (
                            <Pressable key={choice} style={[styles.choiceItem, { backgroundColor: '#372343' }]} onPress={() => handleSelect(choice)} >
                                <ThemedText style={styles.choiceText}>{choice}</ThemedText>
                            </Pressable>
                        )
                        )}
                    </ScrollView>
                </ThemedView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        borderWidth: 1,
        borderColor: '#f187ef',
        paddingHorizontal: Spacing.one
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#372343',
        padding: Spacing.one,
        borderRadius: 20
    },
    text: {
        fontSize: 16,
        paddingRight: Spacing.one,
        color: '#ffffff'
    },
    chevron: {
        backgroundColor: '#f187ef',
        borderRadius: 20,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        height: 22,
        width: 22
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#f187ef',
        backgroundColor: '#efefef',
    },
    scrollView: {
        maxHeight: 220,
    },
    choiceItem: {
        backgroundColor: 'transparent',
        paddingVertical: Spacing.two,
        paddingHorizontal: Spacing.one
    },
    choiceText: {
        fontSize: 20,
        color: '#ffffff'
    },
})