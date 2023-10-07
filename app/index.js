import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, } from '../constants';
import NavBar from './NavBar'
import HeaderMenu from './HeaderMenu';

/*This is the high level "Page"
The four pages of MainPage, TeamsPage, PlayersPage, and LearnPage reside here.
They are displayed from the NavBar.
Going into sub pages the NavBar disappears until back at the high level. Similar to Canvas Dashboard. This can be changed if need be.
*/

const Home = () =>{
    const router = useRouter();
    return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark}}>
        <HeaderMenu/>
        <NavBar/>
    </SafeAreaView>
    )
}
export default Home;