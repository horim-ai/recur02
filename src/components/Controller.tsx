/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Pause, RotateCcw, ArrowRight, Gauge } from 'lucide-react';

interface ControllerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onStep: () => void;
  onReset: () => void;
  onSliderChange: (stepIndex: number) => void;
  playbackSpeed: number; // in ms
  onSpeedChange: (speed: number) => void;
}

export const Controller: React.FC<ControllerProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  onPlayToggle,
  onStep,
  onReset,
  onSliderChange,
  playbackSpeed,
  onSpeedChange,
}) => {
  const isFinished = currentStep === totalSteps - 1;

  // Render quick speed action buttons
  const speeds = [
    { label: '0.5x', ms: 2500 },
    { label: '1.0x', ms: 1500 },
    { label: '2.0x', ms: 800 },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-[#e2e8f0] flex flex-col md:flex-row items-center gap-5 justify-between">
      {/* Play progress Slider */}
      <div className="w-full md:flex-1 flex flex-col gap-1.5 min-w-[200px]">
        <div className="flex justify-between items-center text-xs text-[#64748b] font-medium font-sans">
          <span>시뮬레이션 진행도</span>
          <span className="font-mono bg-[#f1f5f9] px-2 py-0.5 rounded-md text-[#334155] font-semibold">
            {currentStep + 1} / {totalSteps} 단계
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className="w-full h-2 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#fab387]"
        />
        <div className="w-full bg-[#f1f5f9] h-1.5 rounded-full overflow-hidden mt-1">
          <div
            className="bg-gradient-to-r from-[#fab387] to-[#f38ba8] h-full transition-all duration-300"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Action buttons */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] rounded-xl text-sm font-bold font-sans transition-all transform hover:scale-105 active:scale-95 border border-transparent hover:border-[#ccd0d5]"
        >
          <RotateCcw className="w-4 h-4" />
          초기화
        </button>

        {/* Step-by-Step Button */}
        <button
          onClick={onStep}
          disabled={isFinished || isPlaying}
          className={`flex items-center gap-2 px-4 py-2.5 bg-[#eff6ff] text-[#1d4ed8] hover:bg-[#dbeafe] rounded-xl text-sm font-bold font-sans transition-all transform hover:scale-105 active:scale-95 border border-transparent ${
            isFinished || isPlaying ? 'opacity-50 cursor-not-allowed scale-100!' : ''
          }`}
        >
          <span>한 단계씩</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Auto Play / Pause Button */}
        <button
          onClick={onPlayToggle}
          className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-black font-sans text-white shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            isFinished
              ? 'bg-[#94a3b8] cursor-not-allowed'
              : isPlaying
              ? 'bg-[#ef4444] hover:bg-[#dc2626] shadow-[#ef4444]/20'
              : 'bg-[#fab387] hover:bg-[#e09d72] shadow-[#fab387]/20'
          }`}
          disabled={isFinished}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              일시정지
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              자동 재생
            </>
          )}
        </button>
      </div>

      {/* Speed Control panel */}
      <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-[#e2e8f0] pt-4 md:pt-0 md:pl-5 w-full md:w-auto justify-center">
        <Gauge className="w-4 h-4 text-[#64748b]" />
        <span className="text-xs text-[#64748b] font-medium mr-1 font-sans">재생 속도</span>
        <div className="flex bg-[#f1f5f9] rounded-xl p-1 gap-1 border border-[#e2e8f0]">
          {speeds.map((speed) => {
            const isSelected = playbackSpeed === speed.ms;
            return (
              <button
                key={speed.label}
                onClick={() => onSpeedChange(speed.ms)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-sans transition-all ${
                  isSelected
                    ? 'bg-white text-[#fab387] shadow-sm font-extrabold'
                    : 'text-[#64748b] hover:text-[#334155]'
                }`}
              >
                {speed.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
