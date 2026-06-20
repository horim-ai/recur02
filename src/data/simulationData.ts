/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulationStep } from '../types';

export const MATRYOSHKA_STEPS: SimulationStep[] = [
  {
    highlightLine: 1,
    logs: ['🏠 마트료시카 시뮬레이터가 준비되었습니다. 초기 크기 size = 4'],
    callStack: [],
    dollStates: { 4: 'closed', 3: 'hidden', 2: 'hidden', 1: 'hidden' },
    description: 'open_doll(4) 함수를 처음 호출할 준비를 마쳤습니다. 대형 마트료시카 인형(크기 4)이 서 있습니다.'
  },
  {
    highlightLine: 2,
    logs: ['🚀 open_doll(4) 함수가 호출되었습니다!'],
    callStack: [{ id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: true }],
    dollStates: { 4: 'active', 3: 'hidden', 2: 'hidden', 1: 'hidden' },
    description: '인형 크기 4가 전달되어 새로운 함수 블록인 open_doll(4)가 호출 스택(Call Stack)에 등록되었습니다.'
  },
  {
    highlightLine: 3,
    logs: ['🔍 size == 1 검사 실행 (현재 size는 4) -> 거짓(False)'],
    callStack: [{ id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: true }],
    dollStates: { 4: 'active', 3: 'hidden', 2: 'hidden', 1: 'hidden' },
    description: '현재 크기가 1인지 확인합니다. 아직 4이므로 종료 조건(기본 단계)에 도달하지 않았습니다. else문으로 향합니다.'
  },
  {
    highlightLine: 7,
    logs: ['📂 4 크기의 인형을 개봉합니다. 이 안에 다음 인형이 들어있습니다.'],
    callStack: [{ id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: true }],
    dollStates: { 4: 'opened', 3: 'closed', 2: 'hidden', 1: 'hidden' },
    description: '인형 4를 개봉하자, 안에서 한 단계 더 작은 크기 3의 마트료시카가 드러납니다.'
  },
  {
    highlightLine: 8,
    logs: ['🔁 open_doll(3)을 호출하며 더 작은 단계를 탐색합니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'active', 2: 'hidden', 1: 'hidden' },
    description: '해장 인형보다 한 치수 작은 문제 open_doll(3)을 "자기 자신을 다시 불러서(재귀 호출)" 해결하려 합니다.'
  },
  {
    highlightLine: 3,
    logs: ['🔍 size == 1 검사 실행 (현재 size는 3) -> 거짓(False)'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'active', 2: 'hidden', 1: 'hidden' },
    description: '인형 크기 3은 아직 가장 작은 알맹이가 아닙니다. 다시 인형을 열 준비를 행합니다.'
  },
  {
    highlightLine: 7,
    logs: ['📂 3 크기의 인형을 개봉합니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'closed', 1: 'hidden' },
    description: '3 크기 인형을 여니 그 속에서 또 고즈넉이 누워있던 귀여운 크기 2의 인형이 나옵니다.'
  },
  {
    highlightLine: 8,
    logs: ['🔁 open_doll(2)를 재귀적으로 호출합니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'active', 1: 'hidden' },
    description: '크기 3 함수가 결과를 완구하기 전, 스택에서 대기 상태로 걸쳐지고 open_doll(2)가 수행을 교대합니다.'
  },
  {
    highlightLine: 3,
    logs: ['🔍 size == 1 검사 실행 (현재 size는 2) -> 거짓(False)'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'active', 1: 'hidden' },
    description: '아직은 한참 더 들어가야 합니다. 2 역시 종료 한계가 아니므로 else문으로 흐릅니다.'
  },
  {
    highlightLine: 7,
    logs: ['📂 2 크기의 인형을 개봉합니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'opened', 1: 'closed' },
    description: '2 크기 인형을 마저 개봉해보니, 마침내 더 열리지 않는 일체형 소형 인형(크기 1)이 등장합니다!'
  },
  {
    highlightLine: 8,
    logs: ['🔁 open_doll(1)을 최종적으로 호출합니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: false },
      { id: 'stack-1', functionName: 'open_doll', args: 'size=1', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'opened', 1: 'active' },
    description: '최종 관문인 open_doll(1)을 호출했습니다. 호출 스택의 높이는 이제 최고조(4층)에 달했습니다.'
  },
  {
    highlightLine: 3,
    logs: ['🔍 size == 1 검사 실행 (현재 size는 1) -> 참(True)!! 🎉'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: false },
      { id: 'stack-1', functionName: 'open_doll', args: 'size=1', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'opened', 1: 'active' },
    description: '드디어 참(True) 판정입니다! 종료 조건(Base Case)에 아름답게 골인하였습니다.'
  },
  {
    highlightLine: 4,
    logs: ['✨ "종료 조건 도달!" 로그를 출력합니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: false },
      { id: 'stack-1', functionName: 'open_doll', args: 'size=1', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'opened', 1: 'active' },
    description: '더 이상 쪼갤 수 없는 기본 단계에 당착하였으므로, 재귀 호출 체인을 멈추고 복귀를 실시합니다.'
  },
  {
    highlightLine: 5,
    logs: ['↩️ 크기가 1인 인형의 정보 "가장 작은 인형"을 반환(return)합니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: false },
      { id: 'stack-1', functionName: 'open_doll', args: 'size=1', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'opened', 1: 'active' },
    description: 'open_doll(1) 함수 호출이 온전히 해결되어 자신을 불러주었던 open_doll(2)로 귀환을 선언합니다.'
  },
  {
    highlightLine: 8,
    logs: ['↩️ open_doll(1)이 완료되어 open_doll(2)로 돌아왔습니다. 리턴값 수신.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'active', 1: 'closed' },
    description: '1번 스택 프레임이 제거되고, 대기 상태였던 open_doll(2)가 마저 활성화되어 이어서 다음 라인을 펼치려 합니다.'
  },
  {
    highlightLine: 9,
    logs: ['🤐 1번 인형을 2번 인형 내부에 삼입하고 닫습니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: false },
      { id: 'stack-2', functionName: 'open_doll', args: 'size=2', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'opened', 2: 'closed', 1: 'hidden' },
    description: '2 크기의 둥지 안에 1 크기의 작은 알맹이를 보듬어 넣고 인형을 다시 단단하게 겉을 합칩니다.'
  },
  {
    highlightLine: 8,
    logs: ['↩️ open_doll(2)가 완료되어 open_doll(3)으로 돌아왔습니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'active', 2: 'closed', 1: 'hidden' },
    description: '2번 스택마저 소멸하였습니다. 호출 스택의 낙차가 느껴지시나요? 역순으로 문제가 귀납 해결됩니다.'
  },
  {
    highlightLine: 9,
    logs: ['🤐 2번 인형 조립체를 3번 인형 내부에 넣고 닫습니다.'],
    callStack: [
      { id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: false },
      { id: 'stack-3', functionName: 'open_doll', args: 'size=3', isActive: true }
    ],
    dollStates: { 4: 'opened', 3: 'closed', 2: 'hidden', 1: 'hidden' },
    description: '이제 3의 껍질 속에 점층 조립되어 온 덩어리를 고이 싸매서 결합시킵니다.'
  },
  {
    highlightLine: 8,
    logs: ['↩️ open_doll(3)이 완료되어 최초의 open_doll(4)로 귀환합니다.'],
    callStack: [{ id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: true }],
    dollStates: { 4: 'active', 3: 'closed', 2: 'hidden', 1: 'hidden' },
    description: '처음 문제를 시작했던 대장장 마트료시카 블록만이 호젓하게 스택 프레임 꼭대기에 남았습니다.'
  },
  {
    highlightLine: 9,
    logs: ['🤐 3번 조립체를 4번 외장 인형에 담아 최종적으로 온전히 닫아 조립합니다.'],
    callStack: [{ id: 'stack-4', functionName: 'open_doll', args: 'size=4', isActive: true }],
    dollStates: { 4: 'closed', 3: 'hidden', 2: 'hidden', 1: 'hidden' },
    description: '외장 4번 인형을 통째로 오므라 씌움으로써, 재귀 연쇄의 모든 상호작용과 조립이 종료되었습니다.'
  },
  {
    highlightLine: 1,
    logs: ['🏆 모든 재귀 스택이 온전히 반환되었습니다! 호출 완료 및 시뮬레이터 미션 완수!'],
    callStack: [],
    dollStates: { 4: 'closed', 3: 'hidden', 2: 'hidden', 1: 'hidden' },
    description: '최초의 open_doll(4)마저 스택에서 비워지며 최종 연산 결과가 귀결되었습니다. 재귀 정복 완료!'
  }
];

export const ROOM_CLEAN_STEPS: SimulationStep[] = [
  {
    highlightLine: 1,
    logs: ['🧹 방 청소 시뮬레이터 기동. 청소해야 할 방: ["침실", "욕실", "주방", "거실"]'],
    callStack: [],
    roomState: {
      rooms: ['침실', '욕실', '주방', '거실'],
      activeRoom: null,
      cleanedRooms: [],
      isBaseCase: false
    },
    description: 'clean_house(rooms) 함수를 최초 기동하려 합니다. 4개의 각기 다른 방 목록이 대기 중입니다.'
  },
  {
    highlightLine: 2,
    logs: ["🚀 clean_house(['침실', '욕실', '주방', '거실']) 함수를 실행합니다."],
    callStack: [{ id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: true }],
    roomState: {
      rooms: ['침실', '욕실', '주방', '거실'],
      activeRoom: null,
      cleanedRooms: [],
      isBaseCase: false
    },
    description: '함수가 이 목록 수치들과 함께 최초로 실행되어 실행 대기 스택 최하단에 주저 앉습니다.'
  },
  {
    highlightLine: 3,
    logs: ['🔍 if len(rooms) == 0 검사 (현재 4개 방) -> 거짓(False)'],
    callStack: [{ id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: true }],
    roomState: {
      rooms: ['침실', '욕실', '주방', '거실'],
      activeRoom: null,
      cleanedRooms: [],
      isBaseCase: false
    },
    description: '방의 개수가 0개인지 묻습니다. 현재 4개의 방이 존재하므로 거짓 이정표가 되어 else 지류로 빠져나갑니다.'
  },
  {
    highlightLine: 7,
    logs: ['👉 현재 청소할 방(목록의 가장 첫 번째): "침실"을 집어듭니다.'],
    callStack: [{ id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: true }],
    roomState: {
      rooms: ['침실', '욕실', '주방', '거실'],
      activeRoom: '침실',
      cleanedRooms: [],
      isBaseCase: false
    },
    description: "전체 집의 첫 번째 순서인 '침실'을 청소 목표로 지목합니다."
  },
  {
    highlightLine: 8,
    logs: ['✨ "침실"을 먼지 털고 말끔히 진공청소 완료하였습니다!'],
    callStack: [{ id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: true }],
    roomState: {
      rooms: ['침실', '욕실', '주방', '거실'],
      activeRoom: '침실',
      cleanedRooms: [],
      isBaseCase: false
    },
    description: "침실을 반짝거리게 윤이 나도록 정리하고 매만집니다."
  },
  {
    highlightLine: 9,
    logs: ['🗑️ 청소가 끝난 "침실"을 향후 목록에서 정중히 거두어 제외합니다.'],
    callStack: [{ id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: true }],
    roomState: {
      rooms: ['욕실', '주방', '거실'],
      activeRoom: null,
      cleanedRooms: ['침실'],
      isBaseCase: false
    },
    description: "침실은 청소가 끝났으므로 rooms 목록에서 지우고 '청소 완료 방' 리스트로 이양합니다."
  },
  {
    highlightLine: 10,
    logs: ["🔁 남은 방 ['욕실', '주방', '거실'] 관리를 위해 clean_house를 재귀 호출합니다."],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: "['욕실', '주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['욕실', '주방', '거실'],
      activeRoom: null,
      cleanedRooms: ['침실'],
      isBaseCase: false
    },
    description: "이제 '남은 집 청소'라는 하위 문제를 풀기 위해, 새로운 인수 정보와 함께 자가 재귀 호출을 실시합니다."
  },
  {
    highlightLine: 3,
    logs: ['🔍 if len(rooms) == 0 검사 (현재 3개 방) -> 거짓(False)'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: "['욕실', '주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['욕실', '주방', '거실'],
      activeRoom: null,
      cleanedRooms: ['침실'],
      isBaseCase: false
    },
    description: '남은 방이 3개이므로 아직 청소할 임무가 다 끝나지 않았습니다.'
  },
  {
    highlightLine: 7,
    logs: ['👉 현재 청소할 방(첫 번째 방): "욕실" 선택.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: "['욕실', '주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['욕실', '주방', '거실'],
      activeRoom: '욕실',
      cleanedRooms: ['침실'],
      isBaseCase: false
    },
    description: "현재 대기하는 방 목록의 선두인 '욕실'을 청소할 타겟으로 낙정합니다."
  },
  {
    highlightLine: 8,
    logs: ['✨ "욕실" 습기와 바닥 요철 청소, 물때 탈취 완전히 정비 완료!'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: "['욕실', '주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['욕실', '주방', '거실'],
      activeRoom: '욕실',
      cleanedRooms: ['침실'],
      isBaseCase: false
    },
    description: '욕실에 물청소와 환기를 완벽하게 해냈습니다.'
  },
  {
    highlightLine: 9,
    logs: ['🗑️ 청소가 끝난 "욕실" 마저 목록에서 삭제 정리합니다.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: "['침실', '욕실', '주방', '거실']", isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: "['욕실', '주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['주방', '거실'],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실'],
      isBaseCase: false
    },
    description: "욕실을 청소 완료 배열에 귀정시키고 rooms 목록에선 지워버립니다."
  },
  {
    highlightLine: 10,
    logs: ["🔁 남은 방 ['주방', '거실']을 위해 다음 층 재귀 함수를 자아냅니다."],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: "['욕실', '주방', '거실']", isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: "['주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['주방', '거실'],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실'],
      isBaseCase: false
    },
    description: "스택이 3층에 진척되었습니다. clean_house(['주방', '거실'])을 조용히 수행하도록 교사합니다."
  },
  {
    highlightLine: 3,
    logs: ['🔍 if len(rooms) == 0 검사 (현재 2개 방) -> 거짓(False)'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: "['주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['주방', '거실'],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실'],
      isBaseCase: false
    },
    description: '남은 방 주방과 거실이 있어 종료 대상이 아님을 공증합니다.'
  },
  {
    highlightLine: 7,
    logs: ['👉 현재 청소할 방(첫 번째): "주방" 피킹.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: "['주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['주방', '거실'],
      activeRoom: '주방',
      cleanedRooms: ['침실', '욕실'],
      isBaseCase: false
    },
    description: '식기 세척과 조리대 정돈을 위해 주방 방을 타겟으로 선택지 위에 올립니다.'
  },
  {
    highlightLine: 8,
    logs: ['✨ "주방" 싱크대 찌든때 청소 및 식기 조율 정미 완료!'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: "['주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['주방', '거실'],
      activeRoom: '주방',
      cleanedRooms: ['침실', '욕실'],
      isBaseCase: false
    },
    description: '주방이 위생적이고 반짝거리도록 수리를 마무리했습니다.'
  },
  {
    highlightLine: 9,
    logs: ['🗑️ 청소가 끝난 "주방" 목록에서 해제.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: "['주방', '거실']", isActive: true }
    ],
    roomState: {
      rooms: ['거실'],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방'],
      isBaseCase: false
    },
    description: '주방도 청소 완료 도장을 품고 목록에서 지워져 외따라 거실만이 대기를 지키게 합니다.'
  },
  {
    highlightLine: 10,
    logs: ["🔁 남은 방 ['거실']을 관리할 다음 층 clean_house를 기획합니다."],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: "['거실']", isActive: true }
    ],
    roomState: {
      rooms: ['거실'],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방'],
      isBaseCase: false
    },
    description: '4층의 스택 고도에 진입합니다. 오직 단 하나의 거실 방 처리용으로 도달합니다.'
  },
  {
    highlightLine: 3,
    logs: ['🔍 if len(rooms) == 0 검사 (현재 1개 방) -> 거짓(False)'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: "['거실']", isActive: true }
    ],
    roomState: {
      rooms: ['거실'],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방'],
      isBaseCase: false
    },
    description: '거실이 남아 있기에 참살이 검토는 다음 회차로 미뤄지게 됩니다.'
  },
  {
    highlightLine: 7,
    logs: ['👉 마지막 남은 방: "거실"을 집어 정비합니다.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: "['거실']", isActive: true }
    ],
    roomState: {
      rooms: ['거실'],
      activeRoom: '거실',
      cleanedRooms: ['침실', '욕실', '주방'],
      isBaseCase: false
    },
    description: '유종의 미를 다하기 위해 마지막 행로인 거실 정돈을 목표로 삼았습니다.'
  },
  {
    highlightLine: 8,
    logs: ['✨ "거실" 완벽히 클리닝 정돈 완료!!'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: "['거실']", isActive: true }
    ],
    roomState: {
      rooms: ['거실'],
      activeRoom: '거실',
      cleanedRooms: ['침실', '욕실', '주방'],
      isBaseCase: false
    },
    description: '거실의 먼지를 걷어 내고 깔끔하게 물건들을 수합 정비 완료했습니다.'
  },
  {
    highlightLine: 9,
    logs: ['🗑️ 청소가 끝난 "거실" 마저 목록에서 최종적으로 삭제 소거합니다.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: "['거실']", isActive: true }
    ],
    roomState: {
      rooms: [],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방', '거실'],
      isBaseCase: false
    },
    description: '거실도 목록에서 해제함으로써, 남은 rooms 목록이 마침내 완전 텅 빈 리스트([])가 되었습니다.'
  },
  {
    highlightLine: 10,
    logs: ['🔁 이제 빈 목록 []를 인수로 한 번 더 clean_house를 긴급 호출합니다.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-0', functionName: 'clean_house', args: '[]', isActive: true }
    ],
    roomState: {
      rooms: [],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방', '거실'],
      isBaseCase: false
    },
    description: '호출 스택이 5층(최고 꼭대기)인 비어 있는 상태의 임무 clean_house([])를 끝자락에서 실행합니다.'
  },
  {
    highlightLine: 3,
    logs: ['🔍 if len(rooms) == 0 검사 (현재 0개!) -> 참(True)!!! 🎉'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-0', functionName: 'clean_house', args: '[]', isActive: true }
    ],
    roomState: {
      rooms: [],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방', '거실'],
      isBaseCase: true
    },
    description: '드디어 len(rooms) == 0 판별이 참이 되었습니다! 고대하던 종료 조건에 극적으로 안착했습니다.'
  },
  {
    highlightLine: 4,
    logs: ['✨ "모든 방이 깨끗합니다!" 최종 보고 로그 발신.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-0', functionName: 'clean_house', args: '[]', isActive: true }
    ],
    roomState: {
      rooms: [],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방', '거실'],
      isBaseCase: true
    },
    description: '이제 더 이상 분해할 방이 남아 있지 않기에, 재귀 루프를 멈추고 반환을 준비합니다.'
  },
  {
    highlightLine: 5,
    logs: ['↩️ 리턴 수신을 위해 대기하던 부모 함수들에게 기쁜 신호를 돌려주며 복귀합니다.'],
    callStack: [
      { id: 'rooms-4', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-3', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-2', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-1', functionName: 'clean_house', args: '...', isActive: false },
      { id: 'rooms-0', functionName: 'clean_house', args: '[]', isActive: true }
    ],
    roomState: {
      rooms: [],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방', '거실'],
      isBaseCase: true
    },
    description: 'clean_house([])가 최종 실행 결과를 수월히 return 하며 소작업 수명을 다 마쳤습니다.'
  },
  {
    highlightLine: 1,
    logs: ['🏆 모든 재귀 스택과 정렬 상태 소진 완료! 모든 방 청소 최종 정복 성공! 🎉'],
    callStack: [],
    roomState: {
      rooms: [],
      activeRoom: null,
      cleanedRooms: ['침실', '욕실', '주방', '거실'],
      isBaseCase: true
    },
    description: '겹겹이 결재선마냥 대기하던 clean_house(...) 함수들이 꼬리에 꼬리를 물고 시에러 없이 소각되며 리턴되었습니다. 미션 완수!'
  }
];
