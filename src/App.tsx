/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, startTransition } from 'react';
import { Mode } from './types';
import { MATRYOSHKA_STEPS, ROOM_CLEAN_STEPS } from './data/simulationData';
import { CodeViewer } from './components/CodeViewer';
import { ConsoleView } from './components/ConsoleView';
import { MatryoshkaView } from './components/MatryoshkaView';
import { RoomCleanView } from './components/RoomCleanView';
import { Controller } from './components/Controller';
import { BookOpen, Layers, Award, Sparkles } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<Mode>('MATRYOSHKA');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1500); // 1.5s default

  const steps = useMemo(() => {
    return mode === 'MATRYOSHKA' ? MATRYOSHKA_STEPS : ROOM_CLEAN_STEPS;
  }, [mode]);

  const currentStep = steps[currentStepIndex];

  // Auto-play interval scheduler loop
  useEffect(() => {
    // Rely strictly on primitive values to prevent infinite re-renders or stale closures
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, playbackSpeed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, playbackSpeed, steps.length]);

  // Mode switching routine
  const handleModeChange = (newMode: Mode) => {
    startTransition(() => {
      setMode(newMode);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    });
  };

  // Step-by-step progress trigger
  const handleStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  // Reset simulation states
  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Directly adjust simulation pointer with slide-bar
  const handleSliderChange = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  // Compile full list of historical logs from starting point up to current selection
  const accumulatedLogs = useMemo(() => {
    const historicalLogs: string[] = [];
    for (let i = 0; i <= currentStepIndex; i++) {
       historicalLogs.push(...steps[i].logs);
    }
    return historicalLogs;
  }, [currentStepIndex, steps]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col font-sans selection:bg-[#fab387]/30">
      
      {/* 1. Global Navigation / Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#fab387] p-2.5 rounded-xl shadow-md text-white flex items-center justify-center transform transition-transform hover:rotate-6">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-sans font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                정보 교과서 재귀 구조 시뮬레이터
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              </h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-normal uppercase font-sans">
                Interactive Recursive Structure Simulator
              </p>
            </div>
          </div>

          {/* Mode Switching Tabs */}
          <div className="flex bg-slate-100 rounded-2xl p-1 border border-slate-200">
            <button
              onClick={() => handleModeChange('MATRYOSHKA')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all duration-200 ${
                mode === 'MATRYOSHKA'
                  ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              마트료시카 모드
            </button>
            <button
              onClick={() => handleModeChange('ROOM_CLEAN')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all duration-200 ${
                mode === 'ROOM_CLEAN'
                  ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              방 청소 모드
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Contents Workspace grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Core Explanatory Sandbox banner */}
        <div className="bg-[#1e1e2e] text-white rounded-3xl p-4 sm:p-5 shadow-lg border border-[#313244] flex items-start gap-4">
          <div className="bg-[#fab387]/10 p-2.5 rounded-2xl border border-[#fab387]/30 shrink-0 text-[#fab387]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-sans font-black text-sm tracking-tight text-[#fab387]">
              💡 실시간 개념 가이드
            </h3>
            <p className="text-xs sm:text-sm text-[#bac2de] mt-1 line-clamp-2 md:line-clamp-none">
              {currentStepIndex !== undefined ? MATRYOSHKA_STEPS[currentStepIndex]?.description : ''}
              {currentStep.description}
            </p>
          </div>
        </div>

        {/* 3-Column Bento Sandbox Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
          
          {/* A. Left side: IDE Code Editor (38% span on LG) */}
          <div className="lg:col-span-5 h-[340px] lg:h-auto min-h-[300px]">
            <CodeViewer mode={mode} highlightLine={currentStep.highlightLine} />
          </div>

          {/* B. Center stage: Physics/Aesthetic Visual Canvas (38% span on LG) */}
          <div className="lg:col-span-4 h-[400px] lg:h-auto min-h-[340px]">
            {mode === 'MATRYOSHKA' ? (
              <MatryoshkaView dollStates={currentStep.dollStates || {}} />
            ) : (
              <RoomCleanView roomState={currentStep.roomState} />
            )}
          </div>

          {/* C. Right side: Terminal & Call Stack Console (24% span on LG) */}
          <div className="lg:col-span-3 h-[450px] lg:h-auto min-h-[380px]">
            <ConsoleView logs={accumulatedLogs} callStack={currentStep.callStack} />
          </div>

        </div>

        {/* 4. Interactive Simulation Control Deck */}
        <footer className="w-full">
          <Controller
            currentStep={currentStepIndex}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            onPlayToggle={() => setIsPlaying(!isPlaying)}
            onStep={handleStep}
            onReset={handleReset}
            onSliderChange={handleSliderChange}
            playbackSpeed={playbackSpeed}
            onSpeedChange={(speed) => setPlaybackSpeed(speed)}
          />
        </footer>

        {/* 5. Extra educational textbook summary cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 outline-none shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm sm:text-base font-sans">
              <span className="p-1 px-1.5 rounded-lg bg-[#fab387]/20 text-[#e07e3a] font-black text-xs font-mono">STEP 1</span>
              <span>재귀 구조란 무엇일까요?</span>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed font-sans font-medium">
              문제나 데이터가 반복적으로 **자기 자신을 포함하는 형태**의 설계 구조입니다. 
              큰 문제를 원래 문제와 동일한 형질을 띈 더 작은 하위 문제들로 계속 쪼개나가며 해결할 때 극도로 유용합니다.
            </p>
          </div>
          <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm sm:text-base font-sans">
              <span className="p-1 px-1.5 rounded-lg bg-[#a6e3a1]/20 text-[#4c8b35] font-black text-xs font-mono">STEP 2</span>
              <span>두 가지 필수 요소</span>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed font-sans font-medium">
              모든 재귀 함수는 자기 자신을 재귀 호출하는 **재귀 단계**와, 무한 루프 과부하를 막기 위해 함수 실행을 멈추고 
              상수를 반환할 수 있는 탈출 지점인 **기본 단계(종료 조건)**가 반드시 공존해야 마땅합니다.
            </p>
          </div>
          <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm sm:text-base font-sans font-sans">
              <Award className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>수학적 귀납법과의 관계</span>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed font-sans font-medium">
              가장 작은 자연수에서 명제가 참임을 입증하고, <span className="font-mono">n = k</span>에서 참이라 전제하여 
              <span className="font-mono">k + 1</span>에 도달시키는 수학적 귀납 논리는, 재귀 함수의 기본 단계 설계와 소름돋을 정도로 닮아 있습니다.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
