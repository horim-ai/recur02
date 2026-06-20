/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bed, Bath, ChefHat, Tv, CheckCircle2, Sparkles, Check } from 'lucide-react';

interface RoomCleanViewProps {
  roomState?: {
    rooms: string[];
    activeRoom: string | null;
    cleanedRooms: string[];
    isBaseCase: boolean;
  };
}

// Room Metadata Map
const ROOM_META: { [key: string]: { icon: React.ReactNode; color: string; bg: string; title: string } } = {
  침실: {
    icon: <Bed className="w-8 h-8" />,
    color: '#89b4fa', // Blue
    bg: 'bg-blue-50',
    title: '포근한 침실'
  },
  욕실: {
    icon: <Bath className="w-8 h-8" />,
    color: '#94e2d5', // Teal
    bg: 'bg-teal-50',
    title: '청결한 욕실'
  },
  주방: {
    icon: <ChefHat className="w-8 h-8" />,
    color: '#fab387', // Peach Orange
    bg: 'bg-orange-50',
    title: '즐거운 주방'
  },
  거실: {
    icon: <Tv className="w-8 h-8" />,
    color: '#f5c2e7', // Pink mauve
    bg: 'bg-pink-50',
    title: '넓은 거실'
  }
};

const ALL_ROOMS = ['침실', '욕실', '주방', '거실'];

export const RoomCleanView: React.FC<RoomCleanViewProps> = ({ roomState }) => {
  const { rooms = ALL_ROOMS, activeRoom = null, cleanedRooms = [], isBaseCase = false } = roomState || {};

  return (
    <div className="w-full h-full min-h-[380px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] rounded-3xl p-6 shadow-md border border-[#cbd5e1] flex flex-col justify-between overflow-hidden relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Mode Title Accent */}
      <div className="z-10 flex justify-between items-center w-full">
        <div>
          <span className="text-[10px] bg-[#a6e3a1]/20 text-[#4c8b35] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-sans">
            Home Cleaning Decomposition
          </span>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1 font-sans">
            집 관리 '방 청소하기' 모드
          </h2>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-600 font-sans">
            남은 방: {rooms.length}개
          </span>
        </div>
      </div>

      {/* House Rooms grid - Desktop-friendly Bento Grid */}
      <div className="flex-1 w-full grid grid-cols-2 gap-4 items-center justify-center p-2 min-h-[260px] mt-4 z-10">
        <AnimatePresence mode="popLayout">
          {ALL_ROOMS.map((roomName) => {
            const meta = ROOM_META[roomName];
            const isCleaned = cleanedRooms.includes(roomName);
            const isActive = activeRoom === roomName;
            const isWaiting = rooms.includes(roomName) && !isActive;

            // Define card visual states
            let cardClasses = 'bg-white border-slate-200 text-slate-700 shadow-sm opacity-100';
            let statusBadge = null;

            if (isCleaned) {
              cardClasses = 'bg-emerald-50/60 border-emerald-300 text-emerald-800 shadow-sm opacity-60 scale-95';
              statusBadge = (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, -10] }}
                  className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full text-xs font-bold font-sans shadow-md flex items-center gap-0.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span className="text-[9px] pr-1">청소 완료</span>
                </motion.div>
              );
            } else if (isActive) {
              cardClasses = 'bg-amber-50 border-amber-400 text-amber-900 shadow-md ring-4 ring-amber-300/30 scale-102';
              statusBadge = (
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold font-sans shadow flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 animate-spin" />
                  <span>청소 중...</span>
                </motion.div>
              );
            } else if (isWaiting) {
              cardClasses = 'bg-white border-slate-200 hover:border-slate-300 shadow-sm';
              statusBadge = (
                <div className="absolute top-2 right-2 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[9px] font-bold font-sans">
                  대기 목록
                </div>
              );
            }

            return (
              <motion.div
                key={roomName}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                className={`relative border-2 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-[110px] sm:h-[120px] overflow-hidden transition-all duration-300 ${cardClasses}`}
              >
                {/* Active bubbling cleaner effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/10 via-transparent to-amber-200/20 animate-pulse pointer-events-none" />
                )}

                {/* Status indicator on Card top */}
                {statusBadge}

                {/* Primary room icon */}
                <div
                  className="p-2 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isCleaned ? '#d1fae5' : isActive ? '#fef3c7' : '#f1f5f9',
                    color: isCleaned ? '#10b981' : isActive ? '#d97706' : meta.color
                  }}
                >
                  {meta.icon}
                </div>

                {/* Text attributes */}
                <div className="mt-1">
                  <h3 className="font-sans font-black text-sm tracking-tight">{meta.title}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {isCleaned ? '정리정돈 완료' : isActive ? '물걸레 발판 가동' : '대기 상태'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Base Case Popup modal banner */}
      <AnimatePresence>
        {isBaseCase && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-6 left-6 right-6 z-30 bg-[#a6e3a1] text-[#11111b] rounded-2xl py-3 px-5 shadow-lg border border-[#94e2d5] text-center font-sans"
          >
            <p className="font-extrabold text-sm sm:text-base tracking-tight flex items-center justify-center gap-2">
              <span>🧹</span>
              <span>모든 방 청소 완수! list길이 == 0</span>
              <span>🎉</span>
            </p>
            <p className="text-xs opacity-80 mt-0.5 font-medium">
              청소해야 하는 방 목록의 길이가 0(빈 리스트)이 되었으므로, 종료 조건을 충족하였습니다!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Concept Tag - Bottom */}
      <div className="mt-2 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-3 z-10">
        <p className="text-slate-500 font-sans font-medium text-[11px] leading-relaxed">
          <strong className="text-slate-700">💡 교육 비유:</strong> 네 종류의 방을 모두 치우는 대신, 
          <span className="text-[#e07e3a] font-bold"> "방 하나를 조율하고, 나머지 세 방을 같은 함수로 다시 치우는 것"</span>이 바로 재귀 구조식 사고입니다. 
          호출마다 목록의 크기가 계속 감소하여 결국에는 빈 리스트 `[]`에 안착해 함수를 정중히 끝냅니다.
        </p>
      </div>
    </div>
  );
};
