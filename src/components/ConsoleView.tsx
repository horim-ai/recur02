/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { CallStackFrame } from '../types';
import { Layers, Terminal, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConsoleViewProps {
  logs: string[];
  callStack: CallStackFrame[];
}

export const ConsoleView: React.FC<ConsoleViewProps> = ({ logs, callStack }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom when updated
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* 1. Call Stack Frame Visualizer - Top half */}
      <div className="flex-1 bg-[#1e1e2e] rounded-2xl p-4 shadow-xl border border-[#313244] flex flex-col min-h-[180px]">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#313244]">
          <Layers className="w-5 h-5 text-[#fab387]" />
          <h3 className="font-sans font-bold text-sm text-[#f5c2e7] tracking-tight">
            호출 스택 (Call Stack) 모니터
          </h3>
          <span className="text-[10px] bg-[#fab387]/10 text-[#fab387] px-2 py-0.5 rounded-full font-mono ml-auto">
            Stack Size: {callStack.length}
          </span>
        </div>

        {/* Call Stack Animation Loop */}
        <div className="flex-1 flex flex-col justify-end items-center gap-2 p-2 bg-[#11111b] rounded-xl overflow-y-auto max-h-[300px]">
          <AnimatePresence mode="popLayout">
            {callStack.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center text-[#585b70] text-center font-sans py-8"
              >
                <Layers className="w-8 h-8 opacity-40 mb-2 stroke-1" />
                <p className="text-xs">호출된 함수가 없습니다.</p>
                <p className="text-[10px] opacity-70 mt-1">[Step] 또는 [Play]를 클릭하세요.</p>
              </motion.div>
            ) : (
              [...callStack].reverse().map((frame, index) => {
                // index === 0 is the top of the stack (most active)
                const isTop = index === 0;
                return (
                  <motion.div
                    key={frame.id}
                    layoutId={frame.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      backgroundColor: isTop ? '#fab387' : '#313244',
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 15 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`w-full max-w-[280px] rounded-lg px-3 py-2.5 flex items-center justify-between font-mono shadow-md border ${
                      isTop
                        ? 'text-[#11111b] border-[#fab387]'
                        : 'text-[#cdd6f4] border-[#45475a]'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {isTop ? (
                        <motion.span
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-2 h-2 rounded-full bg-[#11111b]"
                        />
                      ) : (
                        <CornerDownRight className="w-3.5 h-3.5 text-[#a6adc8] shrink-0" />
                      )}
                      
                      <span className="font-semibold truncate text-xs sm:text-sm">
                        {frame.functionName}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        isTop ? 'bg-[#11111b]/15 text-[#11111b]' : 'bg-[#11111b]/40 text-[#a6e3a1]'
                      }`}
                    >
                      {frame.args}
                    </span>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
        <p className="text-[10px] text-[#585b70] mt-2 text-center font-sans font-medium">
          * 최신 호출(Top)은 주황색으로 빛나며, 완료 시 위에서부터 꺼내집니다 (LIFO 방식)
        </p>
      </div>

      {/* 2. Log Terminal - Bottom half */}
      <div className="flex-1 bg-[#1e1e2e] rounded-2xl p-4 shadow-xl border border-[#313244] flex flex-col h-[280px]">
        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-[#313244]">
          <Terminal className="w-5 h-5 text-[#a6e3a1]" />
          <h3 className="font-sans font-bold text-sm text-[#a6e3a1] tracking-tight">
            출력 콘솔 (Console Terminal)
          </h3>
          <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1] ml-auto animate-pulse" />
        </div>

        {/* Terminal Text block */}
        <div className="flex-1 p-3 bg-[#11111b] rounded-xl font-mono text-xs overflow-y-auto leading-relaxed text-[#cdd6f4] flex flex-col gap-1.5 scrollbar-thin">
          <div className="text-[#585b70] text-[10px] pb-1 border-b border-[#313244]/40 select-none">
            === SIMULATOR PYTHON OUTPUT ===
          </div>
          
          {logs.map((log, index) => {
            let colorClass = 'text-[#cdd6f4]';
            if (log.includes('호출')) {
              colorClass = 'text-[#89b4fa] font-semibold'; // Sky blue for calls
            } else if (log.includes('만족') || log.includes('성공') || log.includes('도달')) {
              colorClass = 'text-[#a6e3a1] font-semibold'; // Green for successes/Base Case
            } else if (log.includes('경우') || log.includes('검사')) {
              colorClass = 'text-[#f9e2af]'; // Yellow for condition checks
            } else if (log.includes('귀환') || log.includes('완료되어') || log.includes('↩️')) {
              colorClass = 'text-[#f5c2e7]'; // Pink for returns
            } else if (log.includes('개봉') || log.includes('선택') || log.includes('청소')) {
              colorClass = 'text-[#fab387]'; // Orange for active steps
            }

            return (
              <div key={index} className={`flex items-start gap-1 ${colorClass}`}>
                <span className="text-[#585b70] select-none">&gt;</span>
                <span className="break-all">{log}</span>
              </div>
            );
          })}
          
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
