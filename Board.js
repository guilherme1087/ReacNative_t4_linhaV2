import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Piece from './Piece';

const initBoard = () => {
  return Array.from({ length: 7 }, () => Array(6).fill(null));
};

const Board = () => {
  const [board, setBoard] = useState(initBoard());
  const [playerTurn, setPlayerTurn] = useState('red');
  const [winner, setWinner] = useState(null);

  const handlePlacePiece = (column) => {
    if (winner || board[column].indexOf(null) === -1) {
      // O jogo já acabou ou a coluna está cheia
      return;
    }

    const newBoard = [...board];
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[column][row]) {
        newBoard[column][row] = playerTurn;
        setBoard(newBoard);
        break;
      }
    }

    // Verificar se o jogador venceu
    if (checkWin(newBoard, playerTurn)) {
      setWinner(playerTurn);
    } else {
      // Mudar a vez do jogador
      setPlayerTurn(playerTurn === 'red' ? 'yellow' : 'red');
    }
  };

  const checkWin = (board, color) => {
    // Verificar vitória na horizontal
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[col][row] === color &&
          board[col + 1][row] === color &&
          board[col + 2][row] === color &&
          board[col + 3][row] === color
        ) {
          return true;
        }
      }
    }

    // Verificar vitória na vertical
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          board[col][row] === color &&
          board[col][row + 1] === color &&
          board[col][row + 2] === color &&
          board[col][row + 3] === color
        ) {
          return true;
        }
      }
    }

    // Verificar vitória na diagonal (esquerda para direita)
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          board[col][row] === color &&
          board[col + 1][row + 1] === color &&
          board[col + 2][row + 2] === color &&
          board[col + 3][row + 3] === color
        ) {
          return true;
        }
      }
    }
  }
  const handleRestart = () => {
    setBoard(initBoard());
    setPlayerTurn('red');
    setWinner(null);
  };

  const renderWinnerMessage = () => {
    if (winner) {
      return (
        <View style={styles.winnerMessageContainer}>
          <Text style={styles.winnerMessageText}>
            O jogador {winner === 'red' ? 'Vermelho' : 'Amarelo'} venceu!
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <Text style={styles.restartButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        {board.map((column, columnIndex) => (
          <TouchableOpacity
            key={columnIndex}
            style={styles.column}
            onPress={() => handlePlacePiece(columnIndex)}
          >
            {column.map((pieceColor, rowIndex) => (
              <Piece key={rowIndex} color={pieceColor} />
            ))}
          </TouchableOpacity>
        ))}
      </View>
      {renderWinnerMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    backgroundColor: '#87CEEB', // Cor do tabuleiro (pode alterar)
  },
  column: {
    width: 50,
    alignItems: 'center',
  },
  winnerMessageContainer: {
    position: 'absolute',
    top: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  winnerMessageText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  restartButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Board;
 