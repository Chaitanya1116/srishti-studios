'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LevelConfig, Tile, ElementType, SpecialType,
  ELEMENT_METADATA, GameStats
} from '@/types/rangrush';
import { RangRushEngine, BOARD_SIZE } from '@/utils/rangrushEngine';
import { rangRushAudio } from '@/utils/rangrushAudio';
import { Pause, RotateCcw, Volume2, VolumeX, Sparkles, Shield, Flame, Zap, Sun, Moon } from 'lucide-react';

interface RangRushGameViewProps {
  level: LevelConfig;
  onLevelComplete: (score: number, stars: number) => void;
  onGameOver: (score: number, target: number) => void;
  onOpenPause: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const RangRushGameView: React.FC<RangRushGameViewProps> = ({
  level,
  onLevelComplete,
  onGameOver,
  onOpenPause,
  soundEnabled,
  onToggleSound
}) => {
  // Game Board State
  const [board, setBoard] = useState<Tile[][]>([]);
  const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Game Stats
  const [score, setScore] = useState<number>(0);
  const [movesLeft, setMovesLeft] = useState<number>(level.moves);
  const [combo, setCombo] = useState<number>(1);
  const [comboPopup, setComboPopup] = useState<{ combo: number; key: number } | null>(null);
  
  const [elementsDestroyed, setElementsDestroyed] = useState<Record<ElementType, number>>({
    AGNI: 0, JALA: 0, PRITHVI: 0, VAJRA: 0, CHANDRA: 0, SURYA: 0
  });
  const [obstaclesCleared, setObstaclesCleared] = useState<number>(0);
  
  // Usable Power-up Chargers (earned every 500 points)
  const [powerUps, setPowerUps] = useState<{ AGNI: number; VAJRA: number; SURYA: number; CHANDRA: number }>({
    AGNI: 1, VAJRA: 1, SURYA: 1, CHANDRA: 1
  });
  const [activePowerUp, setActivePowerUp] = useState<'AGNI' | 'VAJRA' | 'SURYA' | 'CHANDRA' | null>(null);

  // Initialize Level Board
  useEffect(() => {
    initLevel();
  }, [level]);

  const initLevel = () => {
    const newBoard = RangRushEngine.createInitialBoard(level);
    setBoard(newBoard);
    setScore(0);
    setMovesLeft(level.moves);
    setCombo(1);
    setSelectedTile(null);
    setIsProcessing(false);
    setElementsDestroyed({ AGNI: 0, JALA: 0, PRITHVI: 0, VAJRA: 0, CHANDRA: 0, SURYA: 0 });
    setObstaclesCleared(0);
  };

  // Check Victory or Defeat conditions after board stabilizes
  const checkGameStatus = (currentScore: number, currentMoves: number, currentDestroyed: Record<ElementType, number>, currentObstacles: number) => {
    const obj = level.objective;
    let isObjComplete = false;

    if (obj.type === 'SCORE') {
      isObjComplete = currentScore >= (obj.targetScore || level.targetScore);
    } else if (obj.type === 'DESTROY_ELEMENTS' && obj.requiredElements) {
      isObjComplete = Object.entries(obj.requiredElements).every(([elem, reqCount]) => {
        return (currentDestroyed[elem as ElementType] || 0) >= reqCount;
      }) && currentScore >= level.targetScore;
    } else if (obj.type === 'CLEAR_OBSTACLES' && obj.requiredObstacles) {
      isObjComplete = currentObstacles >= obj.requiredObstacles && currentScore >= level.targetScore;
    }

    if (isObjComplete) {
      // Calculate 1 to 3 stars rating
      let stars = 1;
      if (currentScore >= level.starThresholds[2]) stars = 3;
      else if (currentScore >= level.starThresholds[1]) stars = 2;

      rangRushAudio.playLevelCompleteSound();
      setTimeout(() => onLevelComplete(currentScore, stars), 500);
      return true;
    } else if (currentMoves <= 0) {
      rangRushAudio.playGameOverSound();
      setTimeout(() => onGameOver(currentScore, level.targetScore), 500);
      return true;
    }

    return false;
  };

  // Resolve cascades iteratively
  const resolveBoardCascades = async (
    startBoard: Tile[][],
    currentScore: number,
    currentDestroyed: Record<ElementType, number>,
    currentObstacles: number,
    currentMoves: number,
    swappedCoord?: [number, number]
  ) => {
    let currentBoard = startBoard;
    let localScore = currentScore;
    let localDestroyed = { ...currentDestroyed };
    let localObstacles = currentObstacles;
    let currentCombo = 1;

    while (true) {
      const { matchedCoords, matchesList } = RangRushEngine.findMatches(currentBoard);

      if (matchedCoords.size === 0) break;

      rangRushAudio.playMatchSound(currentCombo);

      if (currentCombo > 1) {
        setComboPopup({ combo: currentCombo, key: Date.now() });
      }

      // Special tile creation check
      const specialCreated = RangRushEngine.detectSpecialCreations(matchesList, swappedCoord);
      if (specialCreated) {
        rangRushAudio.playSpecialSound();
      }

      // Process destruction
      const { newBoard: postDestructionBoard, destroyedObstacleCount, elementCounts } =
        RangRushEngine.processMatchDestruction(currentBoard, matchedCoords, specialCreated);

      localObstacles += destroyedObstacleCount;
      Object.entries(elementCounts).forEach(([elem, count]) => {
        localDestroyed[elem as ElementType] = (localDestroyed[elem as ElementType] || 0) + count;
      });

      // Score calculation
      const stepScore = RangRushEngine.calculateScore(matchedCoords.size, currentCombo, specialCreated ? 1 : 0);
      localScore += stepScore;

      setScore(localScore);
      setElementsDestroyed({ ...localDestroyed });
      setObstaclesCleared(localObstacles);
      setBoard(postDestructionBoard);

      // Brief animation pause
      await new Promise(res => setTimeout(res, 220));

      // Drop tiles down & refill empty slots
      const refilledBoard = RangRushEngine.dropTilesAndRefill(postDestructionBoard, level.allowedElements);
      currentBoard = refilledBoard;
      setBoard(currentBoard);

      await new Promise(res => setTimeout(res, 220));

      currentCombo++;
      setCombo(currentCombo);
    }

    // Auto-shuffle if no valid moves exist
    if (!RangRushEngine.hasValidMoves(currentBoard, level.allowedElements)) {
      currentBoard = RangRushEngine.shuffleBoard(currentBoard, level.allowedElements);
      setBoard(currentBoard);
    }

    setIsProcessing(false);
    checkGameStatus(localScore, currentMoves, localDestroyed, localObstacles);
  };

  // Handle Tile Click / Swap
  const handleTileClick = async (row: number, col: number) => {
    if (isProcessing) return;

    // Handle Active Power-up placement
    if (activePowerUp) {
      if (powerUps[activePowerUp] <= 0) return;
      setIsProcessing(true);
      rangRushAudio.playPowerUpSound(activePowerUp);

      setPowerUps(prev => ({ ...prev, [activePowerUp]: prev[activePowerUp] - 1 }));

      const { matchedCoords } = RangRushEngine.executePowerUp(board, activePowerUp, row, col);
      setActivePowerUp(null);

      const { newBoard: postDestructionBoard, destroyedObstacleCount, elementCounts } =
        RangRushEngine.processMatchDestruction(board, matchedCoords);

      const newObstacles = obstaclesCleared + destroyedObstacleCount;
      const newDestroyed = { ...elementsDestroyed };
      Object.entries(elementCounts).forEach(([elem, count]) => {
        newDestroyed[elem as ElementType] = (newDestroyed[elem as ElementType] || 0) + count;
      });

      const newScore = score + RangRushEngine.calculateScore(matchedCoords.size, 1, 2);
      setScore(newScore);
      setElementsDestroyed(newDestroyed);
      setObstaclesCleared(newObstacles);
      setBoard(postDestructionBoard);

      await new Promise(res => setTimeout(res, 250));

      const refilledBoard = RangRushEngine.dropTilesAndRefill(postDestructionBoard, level.allowedElements);
      setBoard(refilledBoard);

      await resolveBoardCascades(refilledBoard, newScore, newDestroyed, newObstacles, movesLeft);
      return;
    }

    // Normal Tile Select & Swap logic
    if (!selectedTile) {
      if (board[row][col].obstacle !== 'NONE') return;
      setSelectedTile({ row, col });
      rangRushAudio.playButtonClick();
      return;
    }

    // Deselect if clicked same tile
    if (selectedTile.row === row && selectedTile.col === col) {
      setSelectedTile(null);
      return;
    }

    // If clicked non-adjacent tile, switch selection
    if (!RangRushEngine.isAdjacent(selectedTile.row, selectedTile.col, row, col)) {
      if (board[row][col].obstacle === 'NONE') {
        setSelectedTile({ row, col });
        rangRushAudio.playButtonClick();
      }
      return;
    }

    // Perform Swap Attempt
    setIsProcessing(true);
    rangRushAudio.playSwapSound();

    const swappedBoard = RangRushEngine.swapTiles(board, selectedTile.row, selectedTile.col, row, col);
    setBoard(swappedBoard);

    const { matchedCoords } = RangRushEngine.findMatches(swappedBoard);

    if (matchedCoords.size === 0) {
      // Invalid Swap: Animate briefly and return to original positions
      await new Promise(res => setTimeout(res, 260));
      setBoard(board);
      setSelectedTile(null);
      setIsProcessing(false);
    } else {
      // Valid Swap! Consume 1 move
      const newMoves = movesLeft - 1;
      setMovesLeft(newMoves);
      setSelectedTile(null);

      await resolveBoardCascades(
        swappedBoard,
        score,
        elementsDestroyed,
        obstaclesCleared,
        newMoves,
        [row, col]
      );
    }
  };

  // Calculate Progress % towards Objective
  const getObjectiveProgress = (): number => {
    const obj = level.objective;
    if (obj.type === 'SCORE') {
      return Math.min(100, (score / (obj.targetScore || level.targetScore)) * 100);
    } else if (obj.type === 'DESTROY_ELEMENTS' && obj.requiredElements) {
      let totalReq = 0, totalCurr = 0;
      Object.entries(obj.requiredElements).forEach(([elem, reqCount]) => {
        totalReq += reqCount;
        totalCurr += Math.min(reqCount, elementsDestroyed[elem as ElementType] || 0);
      });
      return totalReq > 0 ? Math.min(100, (totalCurr / totalReq) * 100) : 100;
    } else if (obj.type === 'CLEAR_OBSTACLES' && obj.requiredObstacles) {
      return Math.min(100, (obstaclesCleared / obj.requiredObstacles) * 100);
    }
    return 0;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0b0b0e] text-ivory p-3 sm:p-6 select-none overflow-hidden justify-between">
      {/* Combo Popups Overlay */}
      <AnimatePresence>
        {comboPopup && (
          <motion.div
            key={comboPopup.key}
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.3, y: -40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
          >
            <div className="rounded-full bg-gradient-to-r from-amber-500 via-gold to-yellow-300 px-6 py-2 text-2xl sm:text-4xl font-serif font-black text-charcoal shadow-[0_0_40px_rgba(212,175,55,0.8)] tracking-widest">
              COMBO x{comboPopup.combo}!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP BAR UI */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between gap-2 py-2 border-b border-bronze/20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              onOpenPause();
            }}
            className="p-2 rounded border border-bronze/30 bg-charcoal hover:border-gold hover:text-gold transition-all"
            title="Pause Game"
          >
            <Pause size={16} />
          </button>
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              initLevel();
            }}
            className="p-2 rounded border border-bronze/30 bg-charcoal hover:border-gold hover:text-gold transition-all"
            title="Restart Level"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onToggleSound}
            className="p-2 rounded border border-bronze/30 bg-charcoal hover:border-gold hover:text-gold transition-all"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={16} className="text-gold" /> : <VolumeX size={16} className="text-ivory/40" />}
          </button>
        </div>

        {/* Game Title & Level # */}
        <div className="text-center">
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-gold">RANGRUSH</span>
          <h2 className="text-base sm:text-lg font-serif font-light text-ivory">
            Level {level.id}
          </h2>
        </div>

        {/* Moves & Score Indicators */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-ivory/50 block">Score</span>
            <span className="text-sm sm:text-base font-serif font-bold text-gold">{score.toLocaleString()}</span>
          </div>
          <div className="text-right border-l border-bronze/20 pl-3">
            <span className="text-[9px] uppercase tracking-wider text-ivory/50 block">Moves</span>
            <span className="text-sm sm:text-base font-serif font-bold text-ivory">{movesLeft}</span>
          </div>
        </div>
      </div>

      {/* CENTER: 8x8 GAME BOARD CONTAINER */}
      <div className="flex-1 flex items-center justify-center my-3">
        <div className="w-full max-w-[420px] aspect-square rounded-xl border-2 border-bronze/30 bg-[#121118]/90 p-2 sm:p-3 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-md relative flex flex-col">
          
          {/* Active Power-up Targeting Indicator */}
          {activePowerUp && (
            <div className="absolute top-2 left-2 right-2 z-30 bg-gold/90 text-charcoal font-bold text-[11px] uppercase tracking-widest text-center py-1 rounded shadow-md animate-pulse">
              Select tile target for {ELEMENT_METADATA[activePowerUp].name} Strike!
            </div>
          )}

          {/* Grid Layout (8 Rows x 8 Cols) */}
          <div className="grid grid-cols-8 grid-rows-8 gap-1.5 w-full h-full">
            {board.map((row, rIdx) =>
              row.map((tile, cIdx) => {
                const isSelected = selectedTile?.row === rIdx && selectedTile?.col === cIdx;
                const meta = ELEMENT_METADATA[tile.element];

                return (
                  <motion.button
                    key={tile.id}
                    layout
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleTileClick(rIdx, cIdx)}
                    className={`relative w-full h-full rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-200 select-none overflow-hidden ${
                      tile.obstacle !== 'NONE'
                        ? 'bg-slate-800 border-2 border-stone-600 shadow-inner opacity-85'
                        : `bg-gradient-to-br ${meta.bgGradient} border border-white/20 shadow-md`
                    } ${
                      isSelected
                        ? 'ring-4 ring-gold scale-105 z-20 shadow-[0_0_20px_rgba(212,175,55,0.9)]'
                        : 'hover:scale-[1.03]'
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 0 25px ${meta.glowColor}` : undefined
                    }}
                  >
                    {/* Obstacle Graphics */}
                    {tile.obstacle === 'STONE' && (
                      <div className="absolute inset-0 bg-stone-700/90 flex items-center justify-center z-10 border border-stone-500 rounded-lg">
                        <Shield size={20} className="text-stone-300" />
                        <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-stone-200">{tile.obstacleHp}</span>
                      </div>
                    )}
                    {tile.obstacle === 'SEAL' && (
                      <div className="absolute inset-0 bg-amber-950/90 flex items-center justify-center z-10 border-2 border-amber-600 rounded-lg">
                        <span className="text-base">📜</span>
                        <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-amber-300">{tile.obstacleHp}</span>
                      </div>
                    )}

                    {/* Tile Symbol */}
                    <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {meta.symbol}
                    </span>

                    {/* Special Type Overlay Badges */}
                    {tile.special === 'LINE_HORIZ' && (
                      <div className="absolute inset-x-0 h-1 bg-white shadow-[0_0_8px_#fff] z-10 animate-pulse" />
                    )}
                    {tile.special === 'LINE_VERT' && (
                      <div className="absolute inset-y-0 w-1 bg-white shadow-[0_0_8px_#fff] z-10 animate-pulse" />
                    )}
                    {tile.special === 'BOMB' && (
                      <div className="absolute inset-0 rounded-lg border-2 border-yellow-300 animate-ping opacity-75 z-10 pointer-events-none" />
                    )}
                    {tile.special === 'RAINBOW' && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-40 animate-pulse z-10" />
                    )}
                  </motion.button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: OBJECTIVES & POWER-UPS PANEL */}
      <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
        {/* Objective Progress Bar */}
        <div className="p-2.5 rounded-lg border border-bronze/20 bg-charcoal/80">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider mb-1.5">
            <span className="text-sandstone">Objective Progress</span>
            <span className="text-gold font-mono">{Math.round(getObjectiveProgress())}%</span>
          </div>
          <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-bronze/10">
            <div
              className="bg-gradient-to-r from-amber-600 via-gold to-yellow-400 h-full transition-all duration-500"
              style={{ width: `${getObjectiveProgress()}%` }}
            />
          </div>
        </div>

        {/* Power-up Launchers Stack */}
        <div className="grid grid-cols-4 gap-2">
          {/* Agni Blast */}
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              setActivePowerUp(activePowerUp === 'AGNI' ? null : 'AGNI');
            }}
            disabled={powerUps.AGNI <= 0}
            className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
              activePowerUp === 'AGNI'
                ? 'border-gold bg-gold/20 shadow-[0_0_15px_rgba(249,115,22,0.6)]'
                : 'border-amber-700/40 bg-amber-950/20 hover:border-amber-500'
            } ${powerUps.AGNI <= 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <span className="text-base">🔥</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 mt-0.5">Agni Blast</span>
            <span className="text-[8px] text-ivory/50 font-mono">Row</span>
          </button>

          {/* Vajra Strike */}
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              setActivePowerUp(activePowerUp === 'VAJRA' ? null : 'VAJRA');
            }}
            disabled={powerUps.VAJRA <= 0}
            className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
              activePowerUp === 'VAJRA'
                ? 'border-gold bg-gold/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                : 'border-purple-700/40 bg-purple-950/20 hover:border-purple-500'
            } ${powerUps.VAJRA <= 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <span className="text-base">⚡</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-purple-300 mt-0.5">Vajra Strike</span>
            <span className="text-[8px] text-ivory/50 font-mono">Column</span>
          </button>

          {/* Surya Burst */}
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              setActivePowerUp(activePowerUp === 'SURYA' ? null : 'SURYA');
            }}
            disabled={powerUps.SURYA <= 0}
            className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
              activePowerUp === 'SURYA'
                ? 'border-gold bg-gold/20 shadow-[0_0_15px_rgba(234,179,8,0.6)]'
                : 'border-yellow-700/40 bg-yellow-950/20 hover:border-yellow-500'
            } ${powerUps.SURYA <= 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <span className="text-base">☀️</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-yellow-300 mt-0.5">Surya Burst</span>
            <span className="text-[8px] text-ivory/50 font-mono">Area</span>
          </button>

          {/* Chandra Shatter */}
          <button
            onClick={() => {
              rangRushAudio.playButtonClick();
              setActivePowerUp(activePowerUp === 'CHANDRA' ? null : 'CHANDRA');
            }}
            disabled={powerUps.CHANDRA <= 0}
            className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
              activePowerUp === 'CHANDRA'
                ? 'border-gold bg-gold/20 shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                : 'border-sky-700/40 bg-sky-950/20 hover:border-sky-500'
            } ${powerUps.CHANDRA <= 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <span className="text-base">🌙</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300 mt-0.5">Chandra</span>
            <span className="text-[8px] text-ivory/50 font-mono">Multi</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RangRushGameView;
