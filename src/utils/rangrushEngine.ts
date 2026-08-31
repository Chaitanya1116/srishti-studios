// RangRush Match-3 Game Engine Logic

import { Tile, ElementType, SpecialType, ObstacleType, LevelConfig } from '@/types/rangrush';

export const BOARD_SIZE = 8;

export interface MatchResult {
  matchedTiles: Tile[];
  specialCreated?: { row: number; col: number; type: SpecialType; element: ElementType };
  score: number;
}

export class RangRushEngine {
  // Generate a initial 8x8 board for a level ensuring NO initial 3-matches
  static createInitialBoard(level: LevelConfig): Tile[][] {
    const board: Tile[][] = [];
    const elements = level.allowedElements;

    for (let r = 0; r < BOARD_SIZE; r++) {
      board[r] = [];
      for (let c = 0; c < BOARD_SIZE; c++) {
        let validElement: ElementType;

        do {
          validElement = elements[Math.floor(Math.random() * elements.length)];
        } while (
          (c >= 2 && board[r][c - 1]?.element === validElement && board[r][c - 2]?.element === validElement) ||
          (r >= 2 && board[r - 1][c]?.element === validElement && board[r - 2][c]?.element === validElement)
        );

        board[r][c] = {
          id: `tile-${r}-${c}-${Math.random().toString(36).substr(2, 6)}`,
          element: validElement,
          special: 'NONE',
          obstacle: 'NONE',
          obstacleHp: 0,
          row: r,
          col: c
        };
      }
    }

    // Place initial level obstacles if defined
    if (level.initialObstacles) {
      level.initialObstacles.forEach(obs => {
        if (obs.row >= 0 && obs.row < BOARD_SIZE && obs.col >= 0 && obs.col < BOARD_SIZE) {
          board[obs.row][obs.col].obstacle = obs.type;
          board[obs.row][obs.col].obstacleHp = obs.hp;
        }
      });
    }

    // Ensure valid moves exist on starting board
    if (!this.hasValidMoves(board, elements)) {
      return this.shuffleBoard(board, elements);
    }

    return board;
  }

  // Check if two tiles are adjacent
  static isAdjacent(r1: number, c1: number, r2: number, c2: number): boolean {
    const rowDiff = Math.abs(r1 - r2);
    const colDiff = Math.abs(c1 - c2);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  // Swap two tiles in board array
  static swapTiles(board: Tile[][], r1: number, c1: number, r2: number, c2: number): Tile[][] {
    const newBoard = board.map(row => [...row]);
    const temp = { ...newBoard[r1][c1], row: r2, col: c2 };
    newBoard[r1][c1] = { ...newBoard[r2][c2], row: r1, col: c1 };
    newBoard[r2][c2] = temp;
    return newBoard;
  }

  // Scan board for horizontal and vertical matches (3 or more)
  static findMatches(board: Tile[][]): {
    matchedCoords: Set<string>;
    matchesList: { element: ElementType; coords: [number, number][] }[];
  } {
    const matchedCoords = new Set<string>();
    const matchesList: { element: ElementType; coords: [number, number][] }[] = [];

    // Horizontal matches
    for (let r = 0; r < BOARD_SIZE; r++) {
      let matchLen = 1;
      for (let c = 0; c < BOARD_SIZE; c++) {
        const isEnd = c === BOARD_SIZE - 1;
        const curr = board[r][c];
        const next = !isEnd ? board[r][c + 1] : null;

        if (
          !isEnd &&
          curr.obstacle === 'NONE' &&
          next &&
          next.obstacle === 'NONE' &&
          curr.element === next.element
        ) {
          matchLen++;
        } else {
          if (matchLen >= 3) {
            const coords: [number, number][] = [];
            for (let k = 0; k < matchLen; k++) {
              const colIdx = c - k - (isEnd && curr.obstacle === 'NONE' && next && curr.element === next.element ? 0 : 0);
              coords.push([r, colIdx]);
              matchedCoords.add(`${r},${colIdx}`);
            }
            matchesList.push({ element: board[r][c - 1].element, coords });
          }
          matchLen = 1;
        }
      }
    }

    // Vertical matches
    for (let c = 0; c < BOARD_SIZE; c++) {
      let matchLen = 1;
      for (let r = 0; r < BOARD_SIZE; r++) {
        const isEnd = r === BOARD_SIZE - 1;
        const curr = board[r][c];
        const next = !isEnd ? board[r + 1][c] : null;

        if (
          !isEnd &&
          curr.obstacle === 'NONE' &&
          next &&
          next.obstacle === 'NONE' &&
          curr.element === next.element
        ) {
          matchLen++;
        } else {
          if (matchLen >= 3) {
            const coords: [number, number][] = [];
            for (let k = 0; k < matchLen; k++) {
              coords.push([r - k, c]);
              matchedCoords.add(`${r - k},${c}`);
            }
            matchesList.push({ element: board[r - 1][c].element, coords });
          }
          matchLen = 1;
        }
      }
    }

    return { matchedCoords, matchesList };
  }

  // Calculate special tile creations based on match shapes (5-in-a-row -> RAINBOW, 4 -> LINE, T/L -> BOMB)
  static detectSpecialCreations(
    matchesList: { element: ElementType; coords: [number, number][] }[],
    swappedCoord?: [number, number]
  ): { row: number; col: number; type: SpecialType; element: ElementType } | null {
    if (matchesList.length === 0) return null;

    // Check for 5-match or T/L shapes
    for (const match of matchesList) {
      if (match.coords.length >= 5) {
        const target = swappedCoord && match.coords.some(([r, c]) => r === swappedCoord[0] && c === swappedCoord[1])
          ? swappedCoord
          : match.coords[Math.floor(match.coords.length / 2)];
        return { row: target[0], col: target[1], type: 'RAINBOW', element: match.element };
      }
    }

    // Check T or L shapes (multiple matches intersecting)
    if (matchesList.length >= 2) {
      const allCoords = matchesList.flatMap(m => m.coords);
      const coordCounts: Record<string, number> = {};
      allCoords.forEach(([r, c]) => {
        const key = `${r},${c}`;
        coordCounts[key] = (coordCounts[key] || 0) + 1;
      });

      for (const [key, count] of Object.entries(coordCounts)) {
        if (count > 1) {
          const [r, c] = key.split(',').map(Number);
          return { row: r, col: c, type: 'BOMB', element: matchesList[0].element };
        }
      }
    }

    // Check 4-match
    for (const match of matchesList) {
      if (match.coords.length === 4) {
        const target = swappedCoord && match.coords.some(([r, c]) => r === swappedCoord[0] && c === swappedCoord[1])
          ? swappedCoord
          : match.coords[1];
        // Determine if horizontal or vertical line clear
        const isHoriz = match.coords[0][0] === match.coords[1][0];
        return {
          row: target[0],
          col: target[1],
          type: isHoriz ? 'LINE_HORIZ' : 'LINE_VERT',
          element: match.element
        };
      }
    }

    return null;
  }

  // Calculate score for matches
  static calculateScore(matchCount: number, combo: number, specialCount: number = 0): number {
    let base = 100;
    if (matchCount === 4) base = 250;
    if (matchCount >= 5) base = 500;
    const specialBonus = specialCount * 300;
    return (base + specialBonus) * combo;
  }

  // Apply match destruction, damage adjacent obstacles, and resolve special tile triggers
  static processMatchDestruction(
    board: Tile[][],
    matchedCoords: Set<string>,
    specialCreated?: { row: number; col: number; type: SpecialType; element: ElementType } | null
  ): {
    newBoard: Tile[][];
    destroyedTiles: Tile[];
    destroyedObstacleCount: number;
    elementCounts: Record<ElementType, number>;
  } {
    const newBoard = board.map(row => row.map(t => ({ ...t })));
    const destroyedTiles: Tile[] = [];
    let destroyedObstacleCount = 0;
    const elementCounts: Record<ElementType, number> = {
      AGNI: 0, JALA: 0, PRITHVI: 0, VAJRA: 0, CHANDRA: 0, SURYA: 0
    };

    const coordsToDestroy = new Set<string>(matchedCoords);

    // Trigger special tiles if contained within matched coords
    matchedCoords.forEach(key => {
      const [r, c] = key.split(',').map(Number);
      const tile = newBoard[r][c];

      if (tile.special === 'LINE_HORIZ') {
        for (let col = 0; col < BOARD_SIZE; col++) coordsToDestroy.add(`${r},${col}`);
      } else if (tile.special === 'LINE_VERT') {
        for (let row = 0; row < BOARD_SIZE; row++) coordsToDestroy.add(`${row},${c}`);
      } else if (tile.special === 'BOMB') {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
              coordsToDestroy.add(`${nr},${nc}`);
            }
          }
        }
      } else if (tile.special === 'RAINBOW') {
        // Clears all tiles of the same element
        const targetElem = tile.element;
        for (let row = 0; row < BOARD_SIZE; row++) {
          for (let col = 0; col < BOARD_SIZE; col++) {
            if (newBoard[row][col].element === targetElem) {
              coordsToDestroy.add(`${row},${col}`);
            }
          }
        }
      }
    });

    // Check adjacent obstacles to take damage
    coordsToDestroy.forEach(key => {
      const [r, c] = key.split(',').map(Number);
      const neighbors = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
      ];

      neighbors.forEach(([nr, nc]) => {
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
          const neighborTile = newBoard[nr][nc];
          if (neighborTile.obstacle !== 'NONE' && neighborTile.obstacleHp > 0) {
            neighborTile.obstacleHp--;
            if (neighborTile.obstacleHp <= 0) {
              neighborTile.obstacle = 'NONE';
              destroyedObstacleCount++;
            }
          }
        }
      });
    });

    // Process tile destructions
    coordsToDestroy.forEach(key => {
      const [r, c] = key.split(',').map(Number);
      const tile = newBoard[r][c];

      // If this tile is where a new special is being born, convert it instead of destroying
      if (specialCreated && specialCreated.row === r && specialCreated.col === c) {
        newBoard[r][c] = {
          ...tile,
          special: specialCreated.type,
          element: specialCreated.element,
          isMatched: false
        };
      } else if (tile.obstacle !== 'NONE' && tile.obstacleHp > 0) {
        // Obstacles block the tile from disappearing until HP is 0
        tile.obstacleHp--;
        if (tile.obstacleHp <= 0) {
          tile.obstacle = 'NONE';
          destroyedObstacleCount++;
        }
      } else {
        destroyedTiles.push(tile);
        elementCounts[tile.element] = (elementCounts[tile.element] || 0) + 1;

        // Set tile as empty slot (marked null element temporarily for falling phase)
        newBoard[r][c] = {
          ...tile,
          isMatched: true
        };
      }
    });

    return { newBoard, destroyedTiles, destroyedObstacleCount, elementCounts };
  }

  // Drop tiles down to fill empty matched slots, and generate new tiles at the top
  static dropTilesAndRefill(board: Tile[][], allowedElements: ElementType[]): Tile[][] {
    const newBoard = board.map(row => row.map(t => ({ ...t })));

    for (let c = 0; c < BOARD_SIZE; c++) {
      let emptyCount = 0;
      for (let r = BOARD_SIZE - 1; r >= 0; r--) {
        if (newBoard[r][c].isMatched) {
          emptyCount++;
        } else if (emptyCount > 0) {
          // Shift tile down by emptyCount
          newBoard[r + emptyCount][c] = {
            ...newBoard[r][c],
            row: r + emptyCount
          };
          newBoard[r][c] = {
            ...newBoard[r][c],
            isMatched: true
          };
        }
      }

      // Fill remaining top empty slots with brand new tiles
      for (let r = 0; r < emptyCount; r++) {
        const randElement = allowedElements[Math.floor(Math.random() * allowedElements.length)];
        newBoard[r][c] = {
          id: `tile-${r}-${c}-${Math.random().toString(36).substr(2, 6)}`,
          element: randElement,
          special: 'NONE',
          obstacle: 'NONE',
          obstacleHp: 0,
          row: r,
          col: c,
          isNew: true
        };
      }
    }

    return newBoard;
  }

  // Power-up launcher handlers (Agni Blast, Vajra Strike, Surya Burst, Chandra Shatter)
  static executePowerUp(
    board: Tile[][],
    powerUpType: 'AGNI' | 'VAJRA' | 'SURYA' | 'CHANDRA',
    targetRow?: number,
    targetCol?: number
  ): { matchedCoords: Set<string> } {
    const matchedCoords = new Set<string>();
    const r = targetRow ?? Math.floor(Math.random() * BOARD_SIZE);
    const c = targetCol ?? Math.floor(Math.random() * BOARD_SIZE);

    if (powerUpType === 'AGNI') {
      // Clear entire horizontal row
      for (let col = 0; col < BOARD_SIZE; col++) matchedCoords.add(`${r},${col}`);
    } else if (powerUpType === 'VAJRA') {
      // Clear entire vertical column
      for (let row = 0; row < BOARD_SIZE; row++) matchedCoords.add(`${row},${c}`);
    } else if (powerUpType === 'SURYA') {
      // Clear 3x3 surrounding area
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
            matchedCoords.add(`${nr},${nc}`);
          }
        }
      }
    } else if (powerUpType === 'CHANDRA') {
      // Target 8 random tiles across board
      const allCoords: [number, number][] = [];
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) allCoords.push([row, col]);
      }
      for (let i = 0; i < 8; i++) {
        const randIdx = Math.floor(Math.random() * allCoords.length);
        const [tr, tc] = allCoords.splice(randIdx, 1)[0];
        matchedCoords.add(`${tr},${tc}`);
      }
    }

    return { matchedCoords };
  }

  // Check if any valid adjacent swap exists on the current board
  static hasValidMoves(board: Tile[][], allowedElements: ElementType[]): boolean {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c].obstacle !== 'NONE') continue;

        // Try right swap
        if (c < BOARD_SIZE - 1 && board[r][c + 1].obstacle === 'NONE') {
          const testBoard = this.swapTiles(board, r, c, r, c + 1);
          if (this.findMatches(testBoard).matchedCoords.size > 0) return true;
        }
        // Try down swap
        if (r < BOARD_SIZE - 1 && board[r + 1][c].obstacle === 'NONE') {
          const testBoard = this.swapTiles(board, r, c, r + 1, c);
          if (this.findMatches(testBoard).matchedCoords.size > 0) return true;
        }
      }
    }
    return false;
  }

  // Shuffle board if no valid moves exist
  static shuffleBoard(board: Tile[][], allowedElements: ElementType[]): Tile[][] {
    let newBoard = board.map(r => r.map(t => ({ ...t })));
    let attempts = 0;

    do {
      attempts++;
      const tilesToShuffle: Tile[] = [];
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          if (newBoard[r][c].obstacle === 'NONE') {
            tilesToShuffle.push(newBoard[r][c]);
          }
        }
      }

      // Fisher-Yates shuffle
      for (let i = tilesToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tempElem = tilesToShuffle[i].element;
        tilesToShuffle[i].element = tilesToShuffle[j].element;
        tilesToShuffle[j].element = tempElem;
      }

      // Re-check matches & valid moves
    } while (
      (this.findMatches(newBoard).matchedCoords.size > 0 || !this.hasValidMoves(newBoard, allowedElements)) &&
      attempts < 50
    );

    return newBoard;
  }
}
