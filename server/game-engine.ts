export interface PlayerState {
  id: string;
  health: number;
  hand: string[];
  field: string[];
}

export interface GameState {
  players: Record<string, PlayerState>;
  turn: string;
}

/**
 * Very small in-memory game engine that performs basic move validation.
 * The server should be the single source of truth for the game state and
 * only expose validated state to clients.
 */
export class GameEngine {
  public state: GameState;

  constructor() {
    this.state = {
      players: {
        p1: { id: 'p1', health: 20, hand: ['card1', 'card2'], field: [] },
        p2: { id: 'p2', health: 20, hand: ['card1', 'card2'], field: [] }
      },
      turn: 'p1'
    };
  }

  playCard(playerId: string, card: string): GameState {
    const player = this.state.players[playerId];
    if (!player) {
      throw new Error('Unknown player');
    }
    if (this.state.turn !== playerId) {
      throw new Error('Not your turn');
    }
    const idx = player.hand.indexOf(card);
    if (idx === -1) {
      throw new Error('Card not in hand');
    }
    player.hand.splice(idx, 1);
    player.field.push(card);
    this.endTurn();
    return this.state;
  }

  attack(attackerId: string, targetId: string): GameState {
    const attacker = this.state.players[attackerId];
    const target = this.state.players[targetId];
    if (!attacker || !target) {
      throw new Error('Unknown player');
    }
    if (this.state.turn !== attackerId) {
      throw new Error('Not your turn');
    }
    if (attacker.field.length === 0) {
      throw new Error('No creatures to attack with');
    }
    target.health -= 1;
    this.endTurn();
    return this.state;
  }

  private endTurn(): void {
    this.state.turn = this.state.turn === 'p1' ? 'p2' : 'p1';
  }
}
