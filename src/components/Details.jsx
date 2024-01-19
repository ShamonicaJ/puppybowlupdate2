import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const PlayerDetails = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        async function fetchPlayerDetails() {
            try {
                const response = await fetch(
                    `https://fsa-puppy-bowl.herokuapp.com/api/2306-fsa-et-web-pt-sf/players/${id}`
                );
                const result = await response.json();
                setPlayer(result.data.player);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPlayerDetails();
    }, [id]);

    if (!player) {
        return <div>Loading...</div>;
    }

    return (
        <div className="PCardDetail">
            <img src={player.imageUrl} alt={player.name} />
            <h2 style={{ textDecoration: "underline" }}>Name</h2>
            <h3>{player.name}</h3>
            <h2 style={{ textDecoration: "underline" }}>Breed</h2>
            <h3>{player.breed}</h3>
            <h2 style={{ textDecoration: "underline" }}>Status</h2>
            <h3 style={{ color: "red", fontWeight: "bolder" }}>{player.status}</h3>
            <button className="detailButton">
            <Link to="/AllPlayers">Go Back</Link>
            </button>
        </div>
    );
};

export default PlayerDetails;