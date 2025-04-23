import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Player = 'X' | 'O' | null;
type Board = Player[];

export default function Index() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'draw'>(null);

  // Verifica se há um vencedor
  const checkWinner = (squares: Board): Player | null => {
    const lines = [
      [0, 1, 2], // linhas
      [3, 4, 5], // linhas
      [6, 7, 8], // linhas
      [0, 3, 6], // colunas
      [1, 4, 7], // colunas
      [2, 5, 8], // colunas
      [0, 4, 8], // diagonais
      [2, 4, 6], // diagonais
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Verifica empate
  const checkDraw = (squares: Board): boolean => {
    return squares.every((square) => square !== null) && !checkWinner(squares);
  };

  // Lógica ao clicar em um quadrado
  const handlePress = (index: number) => {
    if (board[index] || winner) return; // Não permite cliques se o jogo acabou ou quadrado ocupado

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Verifica vitória/empate
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      Alert.alert(`Jogador ${gameWinner} venceu!`);
    } else if (checkDraw(newBoard)) {
      setWinner('draw');
      Alert.alert('Empate!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Alterna jogador
    }
  };

  // Reinicia o jogo
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  // Renderiza um quadrado do tabuleiro
  const renderSquare = (index: number) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <Text style={styles.status}>
        {winner
          ? `Vencedor: ${winner === 'draw' ? 'Empate!' : winner}`
          : `Jogador atual: ${currentPlayer}`}
      </Text>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
  },
});
