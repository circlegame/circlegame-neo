import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../../api';
import styled from 'styled-components';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gamemode, setGamemode] = useState("CirclefallImpossible");

    useEffect(() => {
        // Async functions must be defined inside and not in useEffect parameter
        const loadLeaderboard = async () => {
            try{
                const data = await getLeaderboard(gamemode);
                setLeaderboard(data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        loadLeaderboard();

    }, [gamemode]);

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
            <Header>leaderboard</Header>

            <Dropdown value={gamemode} onChange={(e) => setGamemode(e.target.value)}>
                <option value="CirclefallImpossible">circlefall impossible</option>
                <option value="CirclefallMarathon">circlefall marathon</option>
                <option value="GridshotClassic">gridshot classic</option>
                <option value="GridshotMini">gridshot mini</option>
                <option value="GridshotWave">gridshot wave</option>
            </Dropdown>

            <Divider/>

            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>Rank</TableHeader>
                            <TableHeader>Username</TableHeader>
                            <TableHeader style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>Score</TableHeader>
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
                                    <TableCell style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>{index + 1}</TableCell>
                                    <TableCell>{entry.username}</TableCell>
                                    <TableCell style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>{entry.score}</TableCell>
                                </TableRowLight>
                            )
                        ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </>
    );
}

export default Leaderboard;

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

const Header = styled.h1`
    margin-bottom: 0;
`;

// Wrapper for container to have its own scrollbar
const TableWrapper = styled.div`
    max-height: 600px; 
    overflow-y: auto;
    display: flex;
`;

// Table styles
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

// Table header styles
const TableHeader = styled.th`
    background-color: #424242;
    color: white;
    padding: 10px;
    border: none;
    font-size: 18px;
    font-weight: 700;
    position: sticky; /* Fix the header to the top */
    top: 0; /* Position it at the top of the scrolling area */
    z-index: 1; /* Ensure the header stays above other content */
`;

// Table cell styles
const TableCell = styled.td`
    padding: 10px;
    border: none;
    color: white;
`;

// Table row styles for alternating colors
const TableRowDark = styled.tr`
    background-color: #242424;
`;

const TableRowLight = styled.tr`
    background-color: #333;
`;

// Dropdown styles
const Dropdown = styled.select`
    padding: 5px;
    background: #242424;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Inconsolata', monospace;
    margin-top: 10px;
    justify-self: center;
    align-self: center;
    transition: background-color 0.3s, transform 0.3s;

    &:hover{
        background-color: #333;
    };
    &:focus{
        outline: none;
    };
`;

const Divider = styled.div`
    width: 65%;
    height: 4px;
    background-color: #2b2b2b;
    margin: 0 10px;
    border-radius: 30px;
    align-self: center;
    justify-self: center;
    margin-bottom: 20px; 
`;