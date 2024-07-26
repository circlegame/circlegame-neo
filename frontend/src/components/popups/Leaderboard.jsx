import React, { useEffect, useState } from 'react';
// import { fetchLeaderboard } from './api';
import styled from 'styled-components';

// Styled components

// Container for the leaderboard
const LeaderboardContainer = styled.div`
    background: #242424;
    padding: 10px;
    padding-top: 0px;
    border-radius: 5px;
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    overflow-y: hidden;
    
`;

// Wrapper for container to have its own scrollbar
const TableWrapper = styled.div`
    max-height: 600px; 
    overflow-y: auto;
`;

// Table styles
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

// Table header styles
const TableHeader = styled.th`
    background-color: #333;
    color: white;
    padding: 10px;
    border: 1px solid #444;
    position: sticky; /* Fix the header to the top */
    top: 0; /* Position it at the top of the scrolling area */
    z-index: 1; /* Ensure the header stays above other content */
`;

// Table cell styles
const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #444;
    color: white;
`;

// Table row styles for alternating colors
const TableRowDark = styled.tr`
    background-color: #404040;
`;

const TableRowLight = styled.tr`
    background-color: #555555;
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
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Rank</TableHeader>
                                <TableHeader>Username</TableHeader>
                                <TableHeader>Score</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                index % 2 === 0 ? (
                                    <TableRowDark key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{entry.username}</TableCell>
                                        <TableCell>{entry.score}</TableCell>
                                    </TableRowDark>
                                ) : (
                                    <TableRowLight key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{entry.username}</TableCell>
                                        <TableCell>{entry.score}</TableCell>
                                    </TableRowLight>
                                )
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </LeaderboardContainer>
        </>
    );
}

export default Leaderboard;