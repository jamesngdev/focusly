import Sound from "./components/Sound.tsx";
import FocusCountDown from "@/components/FocusCountDown.tsx";
import Quizlet from "@/components/Quizlet.tsx";
import Setting from "@/components/Setting.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {
    return (
        <>
            <Sound/>
            <FocusCountDown/>
            <Setting/>
            <Quizlet/>
            <Toaster/>
            {/*<Background/>*/}
        </>
    )
}

export default App;