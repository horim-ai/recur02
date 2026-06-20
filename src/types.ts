/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Mode = 'MATRYOSHKA' | 'ROOM_CLEAN';

export interface ConsoleLog {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warn' | 'call' | 'return';
  timestamp: string;
}

export interface CallStackFrame {
  id: string;
  functionName: string;
  args: string;
  isActive: boolean;
}

export interface SimulationStep {
  // 현재 에디터 하이라이트 할 코드 줄 번호 (1-based)
  highlightLine: number;
  
  // 현재 콘솔에 추가하거나 덮어씌울 로그 메시지 리스트
  logs: string[];
  
  // 현재 호출 스택의 상태
  callStack: CallStackFrame[];
  
  // 각 모드별 구체적 상태
  // 마트료시카 모드의 경우: 각 크기(4, 3, 2, 1)의 인형 상태
  // - 'hidden': 아직 열리지 않아서 안 보임
  // - 'closed': 겉에 온전히 닫혀 있거나 조립된 상태
  // - 'opened': 상하체가 분리되어 열린 상태
  // - 'active': 현재 초점이 맞춰진 인형
  dollStates?: {
    [size: number]: 'hidden' | 'closed' | 'opened' | 'active';
  };
  
  // 방 청소 모드의 경우: 각 방의 상태
  // rooms: 현재 남아있는 방 목록
  // activeRoom: 현재 청소 중인 방 이름
  // cleanedRooms: 청소가 완료된 방 목록
  roomState?: {
    rooms: string[];
    activeRoom: string | null;
    cleanedRooms: string[];
    isBaseCase: boolean;
  };

  // 설명 문구 (시뮬레이터 중앙 상단에 친절히 뿌려줄 해설)
  description: string;
}
