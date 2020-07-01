/* 
    Utility function for translations
    It will search a key on the known translations
    returning the correct one based on the passed language.
    It will return the query if no match found
*/
import { Languages } from "../store/models";
import store from '../store'

const englishTranslations = {
    'Interface Color': 'Interface Color',
    'light': 'Light',
    'dark': 'Dark',
    'Clock Display': 'Clock Display',
    '12 Hour': '12 Hour',
    '24 Hour': '24 Hour',
    'On': 'On',
    'Off': 'Off',
    'Language': 'Language',
    'english': 'English',
    'greek': 'Greek',
    'Send Messages on CTRL+ENTER':'Send Messages on CTRL+ENTER',
    'username' : 'User Name',
    'Sorry this username is already taken': 'Sorry, this username is already taken.',
    'Reset to defaults': 'Reset to defaults',
    'Chat': 'Chat',
    'Settings': 'Settings',
    'Type a message': 'Type a message',
    'You have unread messages': 'You have unread messages',
    'Users': 'Users'
}
const greekTranslations = {
    'Interface Color': 'Χρώμα Διεπαφής',
    'light': 'Ανοιχτό',
    'dark': 'Σκούρο',
    'Clock Display': 'Μορφή Ρολογιού',
    '12 Hour': '12 Ωρο',
    '24 Hour': '24 Ωρο',
    'On': 'Ναι',
    'Off': 'Όχι',
    'Language': 'Γλώσσα',
    'english': 'Αγγλικά',
    'greek': 'Ελληνικά',
    'Send Messages on CTRL+ENTER':'Αποστολή μηνυμάτων με CTRL+ENTER',
    'username' : 'Όνομα Χρήστη',
    'Sorry this username is already taken': 'Δυστυχώς αυτό το όνομα χρησιμοποιείται ήδη.',
    'Reset to defaults': 'Επαναφορά',
    'Chat': 'Συνομιλία',
    'Settings': 'Ρυθμίσεις',
    'Type a message': 'Πληκτρολογήστε το μήνυμα σας',
    'You have unread messages': 'Έχετε αδιάβαστα μυνήματα',
    'Users': 'Χρήστες'
}
const translations = {
    english: englishTranslations,
    greek: greekTranslations
}

export default (
    text: keyof typeof englishTranslations | keyof typeof greekTranslations,
    language: typeof Languages[number] = store.getState().settings.selectedLanguage
) => {
    if (translations[language].hasOwnProperty(text)) {
        return translations[language][text];
    } else {
        return text
    }

}
