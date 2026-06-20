/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MatryoshkaViewProps {
  dollStates: {
    [size: number]: 'hidden' | 'closed' | 'opened' | 'active';
  };
}

// Color palette for each doll size
const DOLL_COLORS: { [key: number]: { primary: string; secondary: string; accent: string; text: string } } = {
  4: { primary: '#f38ba8', secondary: '#eba0b0', accent: '#f9e2af', text: '#11111b' },  // Vibrant Rose Red
  3: { primary: '#fab387', secondary: '#f9e2af', accent: '#a6e3a1', text: '#11111b' },  // Sunset Gold Orange
  2: { primary: '#a6e3a1', secondary: '#94e2d5', accent: '#cba6f7', text: '#11111b' },  // Fresh Mint Green
  1: { primary: '#89b4fa', secondary: '#b4befe', accent: '#f5c2e7', text: '#11111b' },  // Cosmic Pastel Blue
};

// Size configurations
const DOLL_SCALES: { [key: number]: number } = {
  4: 1.0,
  3: 0.8,
  2: 0.62,
  1: 0.44,
};

// Layout horizontal offsets when dolls are opened side-by-side
const DOLL_OFFSETS: { [key: number]: number } = {
  4: -160,
  3: -50,
  2: 60,
  1: 160,
};

export const MatryoshkaView: React.FC<MatryoshkaViewProps> = ({ dollStates }) => {
  // Determine if any doll is opened. If opened, we spread them side by side.
  // If not opened, they nest inside the biggest closed doll.
  const isAnyOpened = Object.values(dollStates).some((state) => state === 'opened');

  return (
    <div className="w-full h-full min-h-[380px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] rounded-3xl p-6 shadow-md border border-[#cbd5e1] flex flex-col justify-between overflow-hidden relative">
      {/* Background Grid Pattern for style depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Mode Title Accent */}
      <div className="z-10 flex justify-between items-center w-full">
        <div>
          <span className="text-[10px] bg-[#fab387]/20 text-[#e07e3a] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-sans">
            Mstryoshka Recursion Theory
          </span>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1 font-sans">
            러시아 인형 '마트료시카' 모드
          </h2>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <span className="text-xs font-bold text-slate-600 font-sans">실시간 그래픽스</span>
        </div>
      </div>

      {/* Main Dolls Sandbox Stage */}
      <div className="flex-1 w-full flex items-center justify-center relative select-none min-h-[260px] mt-4">
        <AnimatePresence>
          {[4, 3, 2, 1].map((size) => {
            const state = dollStates[size] || 'hidden';
            if (state === 'hidden') return null;

            const scale = DOLL_SCALES[size];
            const colors = DOLL_COLORS[size];
            const isActive = state === 'active';
            const isOpened = state === 'opened';

            // Calculate motion attributes
            // Scale increases slightly if it's the active doll pointing
            const sizeMultiplier = isActive ? 1.06 : 1.0;
            
            // X positioning dynamically interpolates between fully nested in center (0)
            // or spread out side-by-side depending on simulation spread
            const targetX = isAnyOpened ? DOLL_OFFSETS[size] : 0;
            const targetY = isAnyOpened ? 20 : (4 - size) * 8; // elevate smaller dolls inside when nested

            return (
              <motion.div
                key={size}
                layout
                initial={{ opacity: 0, scale: 0.1, y: 150 }}
                animate={{
                  opacity: 1,
                  x: targetX,
                  y: targetY,
                  scale: scale * sizeMultiplier,
                  zIndex: size * 10,
                }}
                exit={{ opacity: 0, scale: 0.1, y: 100 }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 18,
                  mass: 0.8,
                }}
                className="absolute origin-bottom flex flex-col items-center justify-end"
                style={{ height: '240px', width: '180px' }}
              >
                {/* Visual active ring glow floor */}
                {isActive && (
                  <motion.div
                    layoutId="glow-ring"
                    className="absolute -bottom-2 w-[160px] h-6 rounded-full bg-[#fab387]/20 border border-[#fab387]/50 blur-sm -z-10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                  />
                )}

                {/* The Doll Body Slices Vector */}
                <div className="relative w-full h-full flex flex-col items-center justify-end">
                  {/* Top slice (Head + Chest) */}
                  <motion.div
                    animate={{
                      y: isOpened ? -60 : 0,
                      rotate: isOpened ? -8 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    className="relative z-20 cursor-pointer"
                    style={{ width: '120px', height: '110px' }}
                  >
                    <svg viewBox="0 0 120 110" className="w-full h-full drop-shadow-md">
                      {/* Hair/Head scarf outline */}
                      <path
                        d="M60,5 C25,5 20,40 20,70 L100,70 C100,40 95,5 60,5 Z"
                        fill={colors.primary}
                      />
                      {/* Face skin */}
                      <circle cx="60" cy="46" r="28" fill="#ffe0bd" />
                      {/* Babushka Scarf Knot */}
                      <path d="M60,74 L52,82 L60,86 L68,82 Z" fill={colors.accent} />
                      {/* Sweet rosy cheeks */}
                      <circle cx="44" cy="50" r="5" fill="#f38ba8" opacity="0.6"/>
                      <circle cx="76" cy="50" r="5" fill="#f38ba8" opacity="0.6"/>
                      {/* Friendly face eyes and smile */}
                      <circle cx="48" cy="44" r="3" fill="#11111b" />
                      <circle cx="72" cy="44" r="3" fill="#11111b" />
                      <path d="M55,54 Q60,60 65,54" fill="none" stroke="#11111b" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Scarf edge binding stripe */}
                      <path
                        d="M23,62 C23,40 35,28 60,25 C85,28 97,40 97,62"
                        fill="none"
                        stroke={colors.accent}
                        strokeWidth="4"
                      />
                    </svg>
                  </motion.div>

                  {/* Bottom slice (Wide body belly) */}
                  <motion.div
                    animate={{
                      y: isOpened ? 15 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    className="relative z-10 -mt-[48px]"
                    style={{ width: '136px', height: '130px' }}
                  >
                    <svg viewBox="0 0 136 130" className="w-full h-full drop-shadow-lg">
                      {/* Round fat body */}
                      <path
                        d="M12,24 C12,5 124,5 124,24 C124,40 136,80 120,115 C108,130 28,130 16,115 C0,80 12,40 12,24 Z"
                        fill={colors.primary}
                      />
                      {/* Belly decorative apron plate */}
                      <circle cx="68" cy="64" r="42" fill="#ffffff" opacity="0.95" />
                      <circle cx="68" cy="64" r="36" fill="none" stroke={colors.secondary} strokeWidth="2" strokeDasharray="3,3" />
                      
                      {/* Traditional folk flower on belly */}
                      <path d="M68,36 Q64,48 68,54 Q72,48 68,36" fill={colors.accent} />
                      <path d="M68,92 Q64,80 68,74 Q72,80 68,92" fill={colors.accent} />
                      <path d="M38,64 Q50,60 56,64 Q50,68 38,64" fill={colors.accent} />
                      <path d="M98,64 Q86,60 80,64 Q86,68 98,64" fill={colors.accent} />
                      <circle cx="68" cy="64" r="10" fill={colors.accent} />
                      <circle cx="68" cy="64" r="6" fill="#f38ba8" />

                      {/* Cut line visual separator */}
                      <rect x="8" y="0" width="120" height="2.5" fill="#11111b" opacity="0.12" rx="1" />
                    </svg>

                    {/* Miniature Size Ribbon Badge */}
                    <div className="absolute top-[35px] left-1/2 transform -translate-x-1/2 bg-slate-900/10 text-slate-800 font-mono font-black text-xs px-2 py-0.5 rounded-full select-none">
                      N={size}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floating Base Case Banner Notification */}
      <AnimatePresence>
        {dollStates[1] === 'active' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute bottom-6 left-6 right-6 z-30 bg-[#a6e3a1] text-[#11111b] rounded-2xl py-3 px-5 shadow-lg border border-[#94e2d5] text-center font-sans"
          >
            <p className="font-extrabold text-sm sm:text-base tracking-tight flex items-center justify-center gap-2">
              <span>🎯</span>
              <span>종료 조건(Base Case) 도달! (N = 1)</span>
              <span>🎉</span>
            </p>
            <p className="text-xs opacity-80 mt-0.5 font-medium">
              더 이상 인형을 나눌 수 없으므로, 이제부터는 순서대로 결과를 반환하며 돌아갑니다!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Concept Tag - Bottom */}
      <div className="mt-2 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-3 z-10">
        <p className="text-slate-500 font-sans font-medium text-[11px] leading-relaxed">
          <strong className="text-slate-700">💡 교육 비유:</strong> 마트료시카는 '큰 인형' 안에 계속 '더 작은 형태'가 겹겹이 들어있습니다. 
          문제를 줄이며 함수를 자꾸 부르는 단계를 **재귀 단계**, 가장 안쪽의 단단한 통짜 인형은 **기본 단계(종료 조건)**에 해당합니다. 
          여는 것 뿐만 아니라 **다시 닫아서 조립(Stack Pop & Return)**하고 나서야 최종 조립품이 도달하는 것을 관조하세요.
        </p>
      </div>
    </div>
  );
};
