import React, {useState,useEffect} from "react"
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck,deleteDeck,deleteCard } from "./../utils/api/index.js";

// The longest file in this project, need to refactor at some point
function ViewDeck({ pageRerenderTrigger,setPageRerenderTrigger }) {
    const history = useHistory();
    const [currentDeck, setCurrentDeck] = useState("Not Fetched Yet");
    const [deckToDelete, setDeckToDelete] = useState(null);
    const [cardToDelete, setCardToDelete] = useState(null);
    //const [pageRerenderTrigger,setPageRerenderTrigger] = useState();
    const parameters = useParams();
    const deckId = parameters.deckId;

    useEffect(() => {
        async function getDeck () {
            const fetchedDeck =  await readDeck(deckId);
            setCurrentDeck(fetchedDeck); 
        }
        getDeck();
    },[deckId])

    // using effect to trigger re-render once either deck or card is deleted
    useEffect(() => {
        if (pageRerenderTrigger === "cardViewDeck") {
            history.go(0);
            setPageRerenderTrigger()
        } else if (pageRerenderTrigger === "deckViewDeck") {
            history.push("/")
        }
        
    },[history, pageRerenderTrigger, setPageRerenderTrigger]);

    // This is MODAL button handler
    const handleModalDeleteButton = async (event) => {
        if (deckToDelete === null && cardToDelete === null) {
            return (
                "Getting information about the handler..."
            );
        }

        if (deckToDelete != null) {
            console.log("Deck to Delete: ", deckToDelete)
            deleteDeck(deckToDelete);
            setDeckToDelete(null);
            setPageRerenderTrigger("deckViewDeck");
        } else if (cardToDelete != null){
            console.log("Card to Delete: ", cardToDelete)
            await deleteCard(cardToDelete);
            setCardToDelete(null);
            setPageRerenderTrigger("cardViewDeck");
        }
    }


    // This is icon (delete) button handler
    const handleDeleteButton = async (event) => {
        setDeckToDelete(event.target.getAttribute("deckid"));
        setCardToDelete(event.target.getAttribute("cardid"));
        console.log(event.target)

        if (deckToDelete === null && cardToDelete === null) {
            return (
                "Getting information about the handler..."
            );
        }
    }

    if (currentDeck === "Not Fetched Yet") {
        return "Content is loading..."
    }

    // Rendering cards
    const currentCardsList = currentDeck.cards.map((card,index) => {
        return (
            <div key={index} className = "container d-flex row border rounded mb-2">

                <p className = "w-50"> {card.front} </p>

                <div className = "w-50">

                    <p className = ""> {card.back} </p>

                    <button type = "button" 
                            onClick = {handleDeleteButton} 
                            cardid={card.id} 
                            data-toggle="modal" 
                            data-target="#deleteModal" 
                            className = "btn btn-danger mb-2 float-right" 
                            aria-label = "Right Align">
                        <svg    xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                fill="white" 
                                className="bi bi-trash-fill" 
                                viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>

                    <Link   to = {`/decks/${deckId}/cards/${card.id}/edit`} 
                            className = "btn btn-secondary mr-2 float-right">
                            Edit
                    </Link>

                </div>
            </div>
        )
    })

    // Rendering main UI
    return (
        <div>           
            <div className = "container w-75">
                <nav aria-label = "breadcrumb">
                    <ol className = "breadcrumb">
                        <li className = "breadcrumb-item active"> <Link to = "/"> Home </Link> </li>
                        <li className = "breadcrumb-item"> {currentDeck.name} </li>
                    </ol>
                </nav>
            </div>
            <div className = "container w-75">

                <h4> {currentDeck.name} </h4>

                <p> {currentDeck.description} </p>

                <div className = "d-flex justify-content-between mb-2">
                    <div>
                        <Link to = {`/decks/${deckId}/edit`} className = "btn btn-secondary mr-2">Edit</Link>

                        <Link to = {`/decks/${deckId}/study`} className = "btn btn-primary mr-2">Study</Link>

                        <Link to = {`/decks/${deckId}/cards/new`} className = "btn btn-primary mr-2">Add Cards</Link>
                    </div>
                    <button onClick = {handleDeleteButton} 
                            deckid={deckId} 
                            data-toggle="modal" 
                            data-target="#deleteModal" 
                            type = "button" 
                            className = "btn btn-danger" 
                            aria-label = "Right Align">

                            <svg    xmlns="http://www.w3.org/2000/svg" 
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
            <div className = "container w-75">

                <h4> Cards </h4>

                {currentCardsList}

            </div>

            {/* Modal, only appears if delete button is clicked */}
            <div    className="modal" 
                    id="deleteModal" 
                    tabIndex="-1" 
                    role="dialog" 
                    aria-labelledby="deleteModalLabel" 
                    aria-hidden="true">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Delete this deck?</h5>

                        <button type="button" 
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

                        <button type="button" 
                                className="btn btn-secondary" 
                                data-dismiss="modal">
                                Cancel
                        </button>

                        <button type="button" 
                                onClick = {handleModalDeleteButton} 
                                className="btn btn-primary" 
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

export default ViewDeck;