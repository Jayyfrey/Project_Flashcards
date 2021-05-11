import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomePage from "./../cards/HomePage";
import Study from "./../cards/Study";
import ViewDeck from "./../cards/ViewDeck";
import CreateDeck from "./../cards/CreateDeck";
import EditDeck from "./../cards/EditDeck";
import CreateCard from "./../cards/CreateCard";
import EditCard from "./../cards/EditCard";
import NoMatch from "./../cards/NoMatch";
import {listCards,listDecks} from "./../utils/api/index.js";

function Layout() {

  const [decks, setDecks] = useState();
  const [formData, setFormData] = useState({});
  const [pageRerenderTrigger,setPageRerenderTrigger] = useState();
  const handleChange = ({target}) => {
      setFormData({
          ...formData,
          [target.name]: target.value,
      })
  }

  useEffect( () => {
    async function loadDecks () {
      const getDecks = await (listDecks())

      if (Array.isArray(getDecks)) {
        setDecks(getDecks);
      } else if (Array.isArray(getDecks) === false) {
        setDecks([getDecks]);
      } else {
        setDecks(getDecks);
        getDecks.map( async (deck) => {
          const getCards = await listCards(deck.id);
          deck["cards"] = getCards;
        })
      }}

    loadDecks();

  },[]) 



  return (
    <div>
    <Header />
      <Switch>

        <Route exact path="/">
          <HomePage decks={decks} pageRerenderTrigger={pageRerenderTrigger} setPageRerenderTrigger={setPageRerenderTrigger}/>
        </Route>

        <Route exact path="/decks/:deckId/study"> 
          <Study/>
        </Route>

        <Route exact path="/decks/new/">
          <CreateDeck pageRerenderTrigger={pageRerenderTrigger} setPageRerenderTrigger={setPageRerenderTrigger} decks={decks}/>
        </Route>

        <Route exact path="/decks/:deckId/edit">
          <EditDeck/>
        </Route>

        <Route exact path="/decks/:deckId/cards/new">
          <CreateCard formData={formData} setFormData={setFormData} handleChange={handleChange}/>
          </Route>

        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCard formData={formData} setFormData={setFormData} handleChange={handleChange}/>
        </Route>

        <Route exact path="/decks/:deckId">
          <ViewDeck pageRerenderTrigger={pageRerenderTrigger} setPageRerenderTrigger={setPageRerenderTrigger}/>
        </Route>

        <Route>
          <NoMatch />
        </Route>

      </Switch>
    </div>
  )
}

export default Layout;