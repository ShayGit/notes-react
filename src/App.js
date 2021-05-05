import './App.css';

import { Route, Switch } from "react-router-dom";

import Header from './components/Header';
import NotesScreen from './screens/NotesScreen';
import PrivateRoute from './components/PrivateRoute';
import React   from 'react';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Switch>
          <Route exact path="/signin" name="Signin Page">
            <SigninScreen screen="signin"/>
          </Route>
          <Route exact path="/signup" name="Signup Page">
          <SignupScreen />
          </Route>
          <PrivateRoute name="Home" path="/">
           <NotesScreen/>
          </PrivateRoute>
        </Switch>
      </main>
    </div>
  );
}

export default App;
