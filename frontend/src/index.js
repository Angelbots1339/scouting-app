import React from 'react';
import ReactDOM from 'react-dom';
import ScoutPage from './components/scout/ScoutPage'
import SuperScoutPage from './components/superScout/SuperScoutPage'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PitForm from "./components/scout/PitForm";
import TeamPage from "./components/superScout/TeamPage";
import TeamGrid from "./components/superScout/TeamGrid";
import GameForm from "./components/scout/GameForm";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="scout" element={<ScoutPage/>}>
                <Route path="pitform" element={<PitForm/>}/>
                <Route path="gameform" element={<GameForm/>}/>
            </Route>
            <Route path="superscout" element={<SuperScoutPage />}>
                <Route path={":teamNumber"} element={<TeamPage/>}/>
                <Route path={"teamGrid"} element={<TeamGrid/>}/>
            </Route>
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
