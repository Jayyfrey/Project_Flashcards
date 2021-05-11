import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {deleteDeck} from "./../utils/api/index.js";

    function HomePage ({ decks, pageRerenderTrigger,setPageRerenderTrigger }) {
    const [deckId,setDeckId] = useState(null);
    const history = useHistory();
    //const [pageRerenderTrigger,setPageRerenderTrigger] = useState();
    // using effect to trigger re-render once either deck or card is deleted
    useEffect(() => {
        if ((pageRerenderTrigger === "deckHomepage") || (pageRerenderTrigger === "deckCreateDeck") || (pageRerenderTrigger === "deckViewDeck")) {
            history.go(0);
        }
        setPageRerenderTrigger();
    },[history,setPageRerenderTrigger,pageRerenderTrigger]);

    const handleModalDeleteButton = async (event) => {
        if ((deckId != null)) {
            await deleteDeck(deckId);
            setDeckId(null);
            setPageRerenderTrigger("deckHomepage")
        } else {
            /* Second escape route since setDeckId is async */
            return "Retrieving the data for removal..."
        }
    }
    
    const handleDeleteButton = async (event) => {
        if (event.target.getAttribute("deckid") === null) {
            return (
                "Getting information about the handler..."
            );
        }
        setDeckId(event.target.getAttribute("deckid"));

    }

    /* First "Escape" route since listDecks is async*/
    if(decks === undefined) {
        return "Content is Loading...";
    }

    const decksList = decks.map ((deck) => {
        /* Third "Escape" route */
        if (deck === undefined) {
            return "Still removing the deck, please wait...";
        }

        const cardsInCurrentDeck = deck.cards
        const suffix = (cardsInCurrentDeck === 1) ? "card" : "cards";

        return (
            <div    className = "deck container rounded border border-secondary mb-2" 
                    key = {deck.id} 
                    deckid={deck.id}>
                <div className = "row">

                    <div className = "deck-title col-12 d-flex justify-content-between">
                        <h3> {deck.name} </h3>
                        <p> {cardsInCurrentDeck.length} {suffix}</p>
                    </div>

                    <div className = "deck-overview col-12 text-left">
                        <p> {deck.description} </p>
                    </div>

                    <div className = "col-12 d-flex justify-content-between mb-2">

                        <div>
                            <Link   to = {`/decks/${deck.id}`} 
                                    type = "button" 
                                    className = "btn btn-secondary mr-2">
                                    View
                            </Link>
                            <Link   to = {`/decks/${deck.id}/study`} 
                                    deckid={deck.id} 
                                    type = "button" 
                                    className = "btn btn-primary">
                                    Study
                            </Link>
                        </div>

                        <button onClick = {handleDeleteButton} 
                                deckid={deck.id} 
                                data-toggle="modal" 
                                data-target="#exampleModal" 
                                type = "button" 
                                className = "btn btn-danger" 
                                aria-label = "Right Align">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                 width="20" 
                                 height="20" 
                                 fill="white" 
                                 className="bi bi-trash-fill" 
                                 viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                        
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className = "deck-list w-75 container">
            <Link   to = "/decks/new" 
                    type = "button" 
                    className = "btn btn-secondary mb-3">
                    Create Deck
            </Link>
            {decksList}
            {/* This is modal part */}
            <div    className="modal" 
                    id="exampleModal" 
                    tabIndex="-1" 
                    role="dialog" 
                    aria-labelledby="exampleModalLabel" 
                    aria-hidden="true">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                    <div className="modal-header">

                        <h5     className="modal-title" 
                                id="exampleModalLabel">
                                Delete this deck?
                        </h5>

                        <button     type="button" 
                                    className="close" 
                                    data-dismiss="modal" 
                                    aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>

                    </div>

                    <div className="modal-body">
                        You will not be able to recover it.
                    </div>

                    <div className="modal-footer">

                        <button     type="button"
                                    className="btn btn-secondary" 
                                    data-dismiss="modal">
                                    Cancel
                        </button>

                        <button     type="button" 
                                    onClick = {handleModalDeleteButton} 
                                    className="deleteButton btn btn-primary" 
                                    deckid = {"Not Assigned"} 
                                    data-dismiss="modal">
                                    OK
                        </button>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;