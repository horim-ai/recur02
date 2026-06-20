/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mode } from '../types';

interface CodeViewerProps {
  mode: Mode;
  highlightLine: number;
}

const MATRYOSHKA_CODE = [
  { line: 1, text: 'def open_doll(size):', indent: 0 },
  { line: 2, text: '    print(f"open_doll({size})")', indent: 0 },
  { line: 3, text: '    if size == 1:', indent: 0 },
  { line: 4, text: '        print("가장 작은 인형! 종료.")', indent: 0 },
  { line: 5, text: '        return "종료"', indent: 0 },
  { line: 6, text: '    else:', indent: 0 },
  { line: 7, text: '        print(f"{size} 크기의 인형을 엽니다.")', indent: 0 },
  { line: 8, text: '        open_doll(size - 1)', indent: 0 },
  { line: 9, text: '        print(f"{size} 크기의 인형을 닫습니다.")', indent: 0 },
];

const ROOM_CLEAN_CODE = [
  { line: 1, text: 'def clean_house(rooms):', indent: 0 },
  { line: 2, text: '    print(f"clean_house({rooms})")', indent: 0 },
  { line: 3, text: '    if len(rooms) == 0:', indent: 0 },
  { line: 4, text: '        print("모든 방이 깨끗합니다!")', indent: 0 },
  { line: 5, text: '        return', indent: 0 },
  { line: 6, text: '    else:', indent: 0 },
  { line: 7, text: '        current_room = rooms[0]', indent: 0 },
  { line: 8, text: '        print(f"{current_room} 청소 중...")', indent: 0 },
  { line: 9, text: '        rooms.remove(current_room)', indent: 0 },
  { line: 10, text: '        clean_house(rooms)', indent: 0 },
];

export const CodeViewer: React.FC<CodeViewerProps> = ({ mode, highlightLine }) => {
  const codeLines = mode === 'MATRYOSHKA' ? MATRYOSHKA_CODE : ROOM_CLEAN_CODE;

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] text-[#cdd6f4] rounded-2xl shadow-xl overflow-hidden border border-[#313244]">
      {/* Tab Header with visual indicator */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11111b] border-b border-[#313244] font-mono text-xs text-[#a6adc8]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f38ba8]" />
          <span className="w-3 h-3 rounded-full bg-[#f9e2af]" />
          <span className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
        </div>
        <span className="font-semibold text-[#89b4fa] select-none">
          {mode === 'MATRYOSHKA' ? 'matryoshka.py' : 'house_cleaning.py'}
        </span>
        <span className="text-[10px] bg-[#313244] px-2 py-0.5 rounded text-[#bac2de]">Python 3</span>
      </div>

      {/* Code Area */}
      <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-auto leading-relaxed select-text">
        {codeLines.map((lineObj) => {
          const isHighlighted = lineObj.line === highlightLine;
          return (
            <div
              key={lineObj.line}
              id={`code-line-${lineObj.line}`}
              className={`flex items-center w-full transition-all duration-200 py-1 ${
                isHighlighted
                  ? 'bg-[#313244] text-[#f9e2af] border-l-4 border-[#fab387] pl-1'
                  : 'hover:bg-[#181825]/50 pl-2'
              }`}
            >
              {/* Line Number */}
              <span
                className={`w-6 text-right mr-4 select-none font-semibold ${
                  isHighlighted ? 'text-[#fab387]' : 'text-[#585b70]'
                }`}
              >
                {lineObj.line}
              </span>

              {/* Code text with token colors */}
              <span className="whitespace-pre">
                {renderSyntaxHighlight(lineObj.text)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Syntax helper (simple client-side highlighting for Python structure)
function renderSyntaxHighlight(text: string) {
  // keywords: def, if, else, return
  const keywordRegex = /\b(def|if|else|return)\b/g;
  // built-in functions: len, print
  const builtinRegex = /\b(print|len)\b/g;
  // numbers: integers
  const numberRegex = /\b(\d+)\b/g;
  // string literals (in quotes)
  const stringRegex = /(["'])(?:(?=(\\?))\2.)*?\1/g;

  // split parts roughly or wrap matching nodes list
  // Python indent formatting
  let currentStr = text;
  
  // keywords
  currentStr = currentStr.replace(keywordRegex, '<span class="text-[#cba6f7] font-semibold">$1</span>');
  // builtins
  currentStr = currentStr.replace(builtinRegex, '<span class="text-[#89b4fa]">$1</span>');
  // numbers
  currentStr = currentStr.replace(numberRegex, '<span class="text-[#f9e2af]">$1</span>');
  // strings
  currentStr = currentStr.replace(stringRegex, '<span class="text-[#a6e3a1]">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: currentStr }} />;
}
