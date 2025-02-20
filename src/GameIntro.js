import './tic-tac-toe.css';
import { useState, useEffect } from 'react';
import TicTacToe, { initialBoard } from './TicTacToe';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';

export default function GameIntro() {
  const { shareCode } = useParams();

  const [gameType, setGameType] = useState(undefined);
  const [isHost, setIsHost] = useState(undefined);
  const [peer, setPeer] = useState(undefined);
  const [code, setCode] = useState(undefined);
  const [conn, setConn] = useState(undefined);

  useEffect(() => {
    window.onbeforeunload = function () {
      setTimeout(() => {}, 2000);
      //code before the pause
      conn?.close();
      peer?.destroy();
    };
    // OR
    window.addEventListener('beforeunload', function (e) {
      setTimeout(() => {}, 2000);
      //code before the pause
      conn?.close();
      peer?.destroy();
    });
  }, []);

  useEffect(() => {
    if (shareCode !== undefined) {
      setGameType(2);
      setIsHost(false);
      if (peer === undefined) {
        setPeer(new Peer());
      }
    }
  }, []);

  useEffect(() => {
    peer?.on('open', () => {
      setCode(peer.id);
      if (shareCode !== undefined && conn === undefined) {
        const conn = peer?.connect(shareCode);
        conn?.on('open', () => {
          setConn(conn);
        });
      }
    });
    peer?.on('connection', conn => {
      setConn(conn);
      conn.send(initialBoard);
    });
  }, [peer]);

  if (gameType === undefined) {
    return (
      <div id="intro" className="container">
        <div className="container">
          <h1>Play tic-tac-toe</h1>
          <div id="options">
            <button
              onClick={() => {
                setGameType(1);
              }}
            >
              {' '}
              against the computer{' '}
            </button>
            <button
              onClick={() => {
                setGameType(2);
                setPeer(new Peer());
                setIsHost(true);
              }}
            >
              {' '}
              host game{' '}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (gameType === 1) {
    return <TicTacToe turn={0} />;
  } else if (gameType === 2) {
    if (isHost && !conn) {
      return (
        <div id="intro" className="container">
          <div className="container">
            <h1>Play tic-tac-toe</h1>
            <div id="options">
              {code === undefined ? (
                'connecting'
              ) : (
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: 'Share Tic-Tac-Toe Game Code',
                          url:
                            'cranberrymuffin.github.io/#/tic-tac-toe/' + code,
                        })
                        .catch(console.error);
                    }
                    navigator.clipboard.writeText(
                      'cranberrymuffin.github.io/#/tic-tac-toe/' + code,
                    );
                  }}
                >
                  {' '}
                  share code
                </button>
              )}
            </div>
          </div>
        </div>
      );
    } else if (!isHost && !conn) {
      return (
        <div id="intro" className="container">
          <div className="container">
            <h1>Play tic-tac-toe</h1>
            connecting...
          </div>
        </div>
      );
    } else if (conn) {
      return <TicTacToe conn={conn} peer={peer} turn={isHost ? 0 : 1} />;
    }
  }
}
