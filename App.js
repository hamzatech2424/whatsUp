import React from "react"
import MainNavigation from "./src/Navigation/mainNavigation"
import {Provider} from 'react-redux';
import store from "./src/Store";
import ChatScreen from "./src/Screens/chatScreen";
import AudioRecorderScreen from "./src/Screens/audioRecorderScreen";
import ThirdiSplashScreen from "./src/Screens/thirdiSplashScreen";
import SkiaScreen from "./src/Screens/skiaScreen";

const App = () => {
  return (
    <Provider store={store}>
     <MainNavigation /> 
     </Provider>
  )
}

export default App