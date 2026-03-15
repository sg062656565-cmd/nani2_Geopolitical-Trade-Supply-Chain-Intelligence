
import React from 'react';

export const INDUSTRIES: { id: string; name: string; color: string }[] = [
  { id: 'Semiconductors', name: '半導體', color: '#60a5fa' },
  { id: 'Electric Vehicles', name: '電動車', color: '#4ade80' },
  { id: 'Medical Supplies', name: '醫療物資', color: '#f472b6' },
  { id: 'Steel/Aluminum', name: '鋼鐵/鋁材', color: '#94a3b8' },
];

export const SUPPLY_CHAIN_SHIFTS = [
  { 
    company: '臺積電 (TSMC)', 
    from: '臺灣', 
    to: '美國 (亞利桑那州)', 
    move: '承諾 $2500 億美元直接投資，建立 5 座先進製程晶圓廠。', 
    focus: '「矽盾」重估與高階製造回流，確保美國供應鏈絕對安全。', 
    latLngFrom: [121.5, 25.0], 
    latLngTo: [-112.0, 33.4],
    report: 'ART 協定核心：以鉅額資本輸出換取 15% 關稅上限與 2072 項產品豁免。'
  },
  { 
    company: '越南製造 (Made in Vietnam)', 
    from: '中國', 
    to: '越南', 
    move: '躍升美國最大貿易順差國，出口年增 53%。', 
    focus: '「中國+1」模式，背後隱藏大量中國半成品轉運。', 
    latLngFrom: [114.0, 22.5], 
    latLngTo: [105.8, 21.0],
    report: '面臨 USTR 第 301 條款「洗產地」徹查，單純組裝已無法規避風險。'
  },
  { 
    company: '汽車零組件產業', 
    from: '臺灣', 
    to: '泰國', 
    move: '因應美國第 232 條款，將組裝線移往東協汽車重鎮。', 
    focus: '深度在地化採購，開發符合區域法規之產品。', 
    latLngFrom: [121.0, 24.0], 
    latLngTo: [100.5, 13.7],
    report: '政府撥款 1,390 億元補助雙軸轉型，協助傳產跨越關稅壁壘。'
  },
  { 
    company: '墨西哥近岸外包', 
    from: '中國/臺灣', 
    to: '墨西哥', 
    move: '在 USMCA 六年檢討壓力下，加速北美在地化生產。', 
    focus: '規避芬太尼懲罰性關稅與第 122 條款衝擊。', 
    latLngFrom: [118.0, 24.5], 
    latLngTo: [-102.5, 23.6],
    report: '美國 1 月貿易逆差縮減至 $545 億，墨西哥紅利受政策壓抑。'
  },
  { 
    company: '電子代工 (鴻海/廣達)', 
    from: '中國', 
    to: '印度', 
    move: '提高 iPhone 與伺服器組裝比重，建立非中備援產能。', 
    focus: '分散地緣政治風險，對應美國 150 天臨時關稅。', 
    latLngFrom: [113.3, 23.1], 
    latLngTo: [77.2, 28.6],
    report: '零售商面臨定價困難，庫存波動劇烈，迫使供應鏈加速去中國化。'
  },
];

export const TARIFF_IMPACT_DATA = {
  us: [
    { category: '通膨與物價', icon: '📈', detail: '有效關稅率飆升至 9.9%-16.8%', note: '家庭年支出增加 $1000，耐久財轉嫁率達 106%' },
    { category: '法律與憲政', icon: '⚖️', detail: 'IEEPA 關稅被最高法院裁定違憲', note: '面臨 $1680 億退稅訴訟，法源轉向第 122 條款' },
    { category: '貿易結構', icon: '🚢', detail: '越南躍升最大貿易順差來源國', note: '中國進口重挫 46%，但存在「洗產地」規避行為' },
    { category: '供應鏈壓力', icon: '⛓️', detail: '150 天臨時關稅導致定價困難', note: '零售商無法進行長遠規劃，庫存量劇烈波動' },
  ],
  taiwan: [
    { category: 'ART 協定成果', icon: '📉', detail: '關稅上限鎖定 15%，不再疊加', note: '平均關稅降至 12.33%，2072 項產品獲豁免' },
    { category: '戰略代價', icon: '💰', detail: '承諾 $2500 億半導體資本輸出', note: '政府提供等額信用保證，協助建立美國本土生態系' },
    { category: '市場開放', icon: '🚗', detail: '美產車 0% 關稅，農產品大幅開放', note: '99% 美國產品免稅，本土汽車與農業面臨重整' },
    { category: '能源與設備', icon: '⚡', detail: '$848 億戰略採購承諾', note: '五年內採購 LNG、電網設備與波音客機，彌平逆差' },
  ]
};

export const TAIWAN_US_TIMELINE = [
  { date: '2025/04/02', title: '美國宣布 Liberation Day 關稅', status: '32%', desc: '臺灣面臨重稅威脅，啟動緊急磋商', color: '#ef4444' },
  { date: '2026/02/12', title: '正式簽署《臺美對等貿易協定》(ART)', status: '15%', desc: '確立 15% 稅率上限與 2072 項豁免', color: '#22c55e' },
  { date: '2026/02/20', title: '最高法院裁定 IEEPA 關稅違憲', status: '法律真空', desc: 'Learning Resources 案裁定行政擴權無效', color: '#3b82f6' },
  { date: '2026/02/24', title: '啟動第 122 條款臨時關稅', status: '10%', desc: '150 天全球附加關稅，解決國際收支失衡', color: '#fbbf24' },
  { date: '2026/03/11', title: '啟動新一輪第 301 條款調查', status: '跨國調查', desc: '針對 16 國「結構性產能過剩」與洗產地行為', color: '#ef4444' },
];

export const US_STATES_MAP: Record<string, string> = {
  "Alabama": "阿拉巴馬州", "Alaska": "阿拉斯加州", "Arizona": "亞利桑那州", "Arkansas": "阿肯色州",
  "California": "加利福尼亞州", "Colorado": "科羅拉多州", "Connecticut": "康乃狄克州", "Delaware": "德拉瓦州",
  "Florida": "佛羅里達州", "Georgia": "喬治亞州", "Hawaii": "夏威夷州", "Idaho": "愛達荷州",
  "Illinois": "伊利諾州", "Indiana": "印第安納州", "Iowa": "愛荷華州", "Kansas": "堪薩斯州",
  "Kentucky": "肯塔基州", "Louisiana": "路易斯安那州", "Maine": "緬因州", "Maryland": "馬里蘭州",
  "Massachusetts": "麻薩諸塞州", "Michigan": "密西根州", "Minnesota": "明尼蘇達州", "Mississippi": "密西西比州",
  "Missouri": "密蘇里州", "Montana": "蒙大拿州", "Nebraska": "內布拉斯加州", "Nevada": "內華達州",
  "New Hampshire": "新罕布夏州", "New Jersey": "紐澤西州", "New Mexico": "新墨西哥州", "New York": "紐約州",
  "North Carolina": "北卡羅萊納州", "North Dakota": "北達科他州", "Ohio": "俄亥俄州", "Oklahoma": "奧克拉荷馬州",
  "Oregon": "奧勒岡州", "Pennsylvania": "賓夕法尼亞州", "Rhode Island": "羅德島州", "South Carolina": "南卡羅萊納州",
  "South Dakota": "南達科他州", "Tennessee": "田納西州", "Texas": "德克薩斯州", "Utah": "猶他州",
  "Vermont": "佛蒙特州", "Virginia": "維吉尼亞州", "Washington": "華盛頓州", "West Virginia": "西維吉尼亞州",
  "Wisconsin": "威斯康辛州", "Wyoming": "懷俄明州"
};

export const US_STATE_IMPACTS: Record<string, any> = {
  "Montana": {
    risk: "高風險",
    dependency: ">90%",
    reason: "進口商品高度依賴可能被課徵高關稅的國家（如加拿大）。",
    vulnerability: "全美家庭收入中位數最低的前 10 個州之一，面臨雙重打擊。",
    energy: "高度依賴進口能源與水力發電。"
  },
  "New Jersey": {
    risk: "低風險",
    dependency: "~21%",
    reason: "進口依賴比例較低，貿易結構多元。",
    vulnerability: "相對穩健。",
    energy: "能源結構較為多元。"
  },
  "New Mexico": {
    risk: "高風險",
    dependency: "高",
    reason: "與墨西哥貿易往來頻繁。",
    vulnerability: "家庭收入中位數較低，關稅導致的物價上漲壓力巨大。",
    energy: "受邊境貿易政策影響深遠。"
  },
  "New York": {
    risk: "中高風險",
    dependency: "中",
    reason: "金融與服務業發達，但能源成本受進口影響。",
    vulnerability: "生活成本極高，物價上漲預期強烈。",
    energy: "高度依賴進口能源（建議關稅降至 10% 以緩解衝擊）。"
  },
  "Ohio": {
    risk: "中高風險",
    dependency: "中",
    reason: "製造業基地，依賴進口零件與能源。",
    vulnerability: "企業投資不確定性增加。",
    energy: "能源成本敏感區。"
  }
};

export const US_PORTS: any[] = [
  { id: 'lb', name: '長堤港 (Port of Long Beach)', state: 'California', lat: 33.7701, lng: -118.1937, type: 'port' },
  { id: 'det', name: '底特律汽車中心 (Detroit)', state: 'Michigan', lat: 42.3314, lng: -83.0458, type: 'manufacturing' },
  { id: 'sav', name: '薩凡納港 (Port of Savannah)', state: 'Georgia', lat: 32.0761, lng: -81.0884, type: 'port' },
  { id: 'hou', name: '休士頓能源港 (Port of Houston)', state: 'Texas', lat: 29.7604, lng: -95.3698, type: 'port' },
];

export const Icons = {
  Global: (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Trend: (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Truck: (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  Factory: (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m0 10h1m-1 4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Key: (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
};
