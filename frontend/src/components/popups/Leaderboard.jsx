import React, { useEffect, useState } from 'react';
// import { fetchLeaderboard } from './api';
import styled from 'styled-components';

// Styled components
const LeaderboardContainer = styled.div`
    background: #242424;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    width: 100%;
    max-height: 600px;
    margin: 0 auto;
    text-align: center;
    overflow-y: auto;
`;

const LeaderboardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 10px;
    border: 1px solid black;
`;

const LeaderboardEntryDark = styled.div`
    background-color: #404040;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const LeaderboardEntryLight = styled.div`
    background-color: #555555;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EntryText = styled.span`
    margin: 5px 0;
`;

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Async functions must be defined inside and not in useEffect parameter
        // const loadLeaderboard = async () => {
        //     try{
        //         const data = await getLeaderboard();
        //         setLeaderboard(data);
        //         setLoading(false);
        //     } catch (error) {
        //         setError(error);
        //         setLoading(false);
        //     }
        // }
        // loadLeaderboard();


        setLeaderboard([
            {username: "kPin", score: 11210},
            {username: "kPin1", score: 11200},
            {username: "kPin2", score: 11120},
            {username: "kPin3", score: 1121},
            {username: "kPin4", score: 1120},
            {username: "kPin5", score: 1120},
            {username: "kPin6", score: 1120},
            {username: "kPin7", score: 1120},
            {username: "kPin8", score: 1120},
            {username: "kPin9", score: 1120},
            {username: "kPin0", score: 1120},
            {username: "kPin12", score: 1120},
            {username: "kPin11", score: 1120},
            {username: "kPin23", score: 1120},
            {username: "kPin24", score: 1120},
            {username: "kPin25", score: 1120},
            {username: "kPin26", score: 1120},
            {username: "kPin27", score: 1120},
            {username: "kPin28", score: 1120},
            {username: "kPin29", score: 1120},
            {username: "kPin39", score: 120},
        ]);
        setLoading(false);
    }, []);

    if (loading){
        return (
        <>
            <h1>leaderboard</h1>
            <p>Loading...</p>
        </>
        )
    }

    if (loading){
        return (
        <>
            <h1>leaderboard</h1>
            <p>Error: {error.message}</p>
        </>
        )
    }

    return (
        <>                
            <LeaderboardContainer>
                <h1>Leaderboard</h1>
                <LeaderboardGrid>
                    {leaderboard.map((entry, index) => (
                        index % 2 === 0 ? (
                            <LeaderboardEntryDark key={index}>
                                <EntryText>{index+1}: {entry.username}: {entry.score}</EntryText>
                            </LeaderboardEntryDark>
                        ) : (
                            <LeaderboardEntryLight key={index}>
                                <EntryText>{index+1}: {entry.username}: {entry.score}</EntryText>
                            </LeaderboardEntryLight>
                        )

                    ))}
                </LeaderboardGrid>
            </LeaderboardContainer>
        </>
    );
}

export default Leaderboard;