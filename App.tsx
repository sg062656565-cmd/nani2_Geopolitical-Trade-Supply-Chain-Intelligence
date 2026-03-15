
import React, { useState, useEffect } from 'react';
import { AppStep, Industry } from './types';
import { Icons, INDUSTRIES, TAIWAN_US_TIMELINE, TARIFF_IMPACT_DATA } from './constants';
import { getGeopoliticalUpdate, getSupplyChainInsights, getFuturePrediction } from './services/geminiService';
import GlobeVisualization from './components/GlobeVisualization';
import SupplyChainMap from './components/SupplyChainMap';
import LocalImpactMap from './components/LocalImpactMap';

const script = document.createElement('script');
script.src = "https://unpkg.com/topojson-client@3";
document.head.appendChild(script);

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState<AppStep>(AppStep.GLOBAL_VIEW);
  const [industry, setIndustry] = useState<Industry>('Semiconductors');
  const [geoUpdate, setGeoUpdate] = useState<any>(null);
  const [supplyChainData, setSupplyChainData] = useState<any>(null);
  const [scenario, setScenario] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString('zh-TW'));
  const [isPolicyExpanded, setIsPolicyExpanded] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKeyInput(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKeyInput);
    setIsSettingsOpen(false);
  };

  const TAIWAN_OFFICIAL_INFO = [
    { dimension: 'ART 協定背景', content: '2026/2/12 簽署，旨在應對美方第 122 條款及 IEEPA 違憲後的政策空窗期。' },
    { dimension: '關稅減讓成果', content: '臺灣輸美關稅上限鎖定 15%，不再與其他臨時關稅疊加，平均稅率降至 12.33%。' },
    { dimension: '產品豁免清單', content: '高達 2,072 項產品獲豁免，涵蓋蝴蝶蘭、高階工具機、鋰電池及航空零組件。' },
    { dimension: '臺灣的代價 (市場)', content: '1. 美產車關稅 17.5% -> 0%。2. 豬肉與部分農產品三年內大幅降稅。' },
    { dimension: '臺灣的代價 (資本)', content: '承諾 $2500 億半導體投資，政府提供等額信用保證，協助美方建立本土供應鏈。' },
    { dimension: '戰略採購承諾', content: '五年內採購 $848 億美製商品，包括 LNG、原油、電網設備及波音客機。' },
    { dimension: '政府支持方案', content: '投入 1,390 億元，推動「外銷貸款保證」、「研發補助」及「雙軸轉型」。' },
    { dimension: '潛在風險', content: '本土汽車與農業面臨重整壓力；高階人才與資本外流可能動搖「矽盾」優勢。' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleString('zh-TW')), 1000);
    return () => clearInterval(timer);
  }, []);

  const refreshGlobal = async () => {
    setIsLoading(true);
    const data = await getGeopoliticalUpdate();
    setGeoUpdate(data);
    setIsLoading(false);
  };

  const refreshSupplyChain = async (ind: Industry) => {
    setIsLoading(true);
    const data = await getSupplyChainInsights(ind);
    setSupplyChainData(data);
    setIsLoading(false);
  };

  const handlePredict = async () => {
    if (!scenario) return;
    setIsLoading(true);
    const result = await getFuturePrediction(scenario);
    setPrediction(result);
    setIsLoading(false);
  };

  const stepTitles = {
    [AppStep.GLOBAL_VIEW]: '美國關稅政策下的全球視野',
    [AppStep.SUPPLY_CHAIN]: '臺灣供應鏈轉移',
    [AppStep.LOCAL_IMPACT]: '關稅協商下美國的衝擊',
    [AppStep.PREDICTIVE_INSIGHT]: 'AI預測建議'
  };

  const STAGE_CONTEXTS = {
    [AppStep.GLOBAL_VIEW]: {
      how: '點擊「一鍵獲得美國最新官方資訊」按鈕，AI 將爬取 USTR 與最高法院裁定後的最新政策。',
      focus: '掌握 IEEPA 違憲後的法源轉向（第 122 條款）及全球貿易版圖的劇烈重構。'
    },
    [AppStep.SUPPLY_CHAIN]: {
      how: '觀察地圖上的遷移路徑，分析「中國+1」模式下的洗產地風險與對美直接投資趨勢。',
      focus: '理解臺灣企業如何在 $2500 億投資承諾下，平衡全球佈局與本土「矽盾」安全。'
    },
    [AppStep.LOCAL_IMPACT]: {
      how: '點擊地圖上的區域，分析 10% 附加關稅對美國各州通膨與臺灣產業競爭力的實質影響。',
      focus: '剖析《臺美對等貿易協定》(ART) 簽署後，各產業在關稅減讓與市場開放間的損益。'
    },
    [AppStep.PREDICTIVE_INSIGHT]: {
      how: '在輸入框中輸入假設情境，AI 將基於 ART 框架推論未來 5 年的地緣經貿走向。',
      focus: '預判未來 5 年臺美經貿深度綁定後的戰略風險，如資本外流與逆差持續擴大。'
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-100">
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 glass-panel z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
            <Icons.Global className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">臺美貿易戰略圖誌</h1>
              <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-full font-mono">
                更新時間：{currentTime}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">REAL-TIME TAIWAN-US TRADE INTELLIGENCE</p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          {Object.values(AppStep).map((step, idx) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`px-4 py-2 rounded-lg text-base font-medium transition-all ${
                activeStep === step 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {stepTitles[step]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
            title="設定 API Key"
          >
            <Icons.Key className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {isLoading ? 'AI 情報爬蟲中' : '全系統數據同步中'}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative flex flex-col">
        {/* Stage Context Banner */}
        <div className="bg-blue-900/20 border-b border-blue-500/20 px-8 py-3 flex items-center justify-between z-40">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">獲取資訊方式</span>
              <p className="text-sm text-slate-300">{STAGE_CONTEXTS[activeStep].how}</p>
            </div>
            <div className="w-px h-4 bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">本階段重點</span>
              <p className="text-sm text-slate-300">{STAGE_CONTEXTS[activeStep].focus}</p>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            STAGE {Object.values(AppStep).indexOf(activeStep) + 1} / 4
          </div>
        </div>

        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)] pb-24">
          
          {/* Step 1: Global View + Timeline */}
          {activeStep === AppStep.GLOBAL_VIEW && (
            <div className="w-full flex flex-col p-8 gap-8">
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left: Globe and AI Summary */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="relative h-[600px] glass-panel rounded-3xl flex items-center justify-center overflow-hidden border border-slate-800/50">
                    <GlobeVisualization active={activeStep === AppStep.GLOBAL_VIEW} />
                    <div className="absolute top-6 left-6 max-w-sm space-y-3">
                      <h2 className="text-2xl font-bold text-blue-400">第一階段：全球關稅牆</h2>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        針對美方 2025 年宣布之「Liberation Day」對等關稅，我們透過 AI 即時監控最新動態。
                      </p>
                      <button 
                        onClick={refreshGlobal}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                      >
                        <Icons.Trend className="w-4 h-4" />
                        一鍵獲得美國最新官方資訊
                      </button>
                    </div>
                  </div>

                  <div className={`glass-panel rounded-3xl border border-slate-800/50 flex flex-col transition-all duration-500 ${isPolicyExpanded ? 'flex-1 p-6' : 'h-12 p-3'}`}>
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsPolicyExpanded(!isPolicyExpanded)}>
                        <svg className={`w-4 h-4 transition-transform ${isPolicyExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span>美國官方最新政策</span>
                      </div>
                      {isPolicyExpanded && <span className="text-slate-600 font-mono">來源：USTR / DOC</span>}
                    </h3>
                    {isPolicyExpanded && (
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                        {geoUpdate ? (
                          <div className="space-y-4">
                            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                              {geoUpdate.summary.split('\n').map((line: string, i: number) => {
                                if (line.startsWith('*') || line.startsWith('-')) {
                                  return <li key={i} className="ml-4 mb-2 text-blue-100">{line.replace(/^[*-\s]+/, '')}</li>
                                }
                                return <p key={i} className="mb-3">{line}</p>
                              })}
                            </div>
                            <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                              {geoUpdate.links.map((link: any, i: number) => (
                                <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="text-[10px] bg-slate-900 px-3 py-1.5 rounded-lg text-blue-400 border border-slate-700 hover:border-blue-500 transition-colors">
                                  連結：{link.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center opacity-30 text-slate-500">
                            <Icons.Global className="w-12 h-12 mb-2" />
                            <p className="text-xs">請點擊上方按鈕開始 AI 數據分析</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Taiwan-US Negotiation Timeline */}
                <div className="w-full lg:w-[450px] glass-panel rounded-3xl p-6 border border-slate-800/50 flex flex-col overflow-hidden">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">臺美關稅談判歷程</h2>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">32% → 20% → 15% 戰略演進</p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-800"></div>
                    {TAIWAN_US_TIMELINE.map((item, idx) => (
                      <div key={idx} className="relative pl-10 mb-8 last:mb-0 group">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center z-10" style={{ backgroundColor: item.color }}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 group-hover:border-slate-700 transition-colors">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: item.color + '20', color: item.color }}>{item.status}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 bg-slate-900/30 p-4 rounded-2xl">
                    <h5 className="text-[10px] font-bold text-blue-400 uppercase mb-2">關鍵代價：臺灣模式</h5>
                    <ul className="text-[10px] text-slate-400 space-y-1.5 list-disc pl-4">
                      <li>承諾 $2500 億美元對美半導體直接投資</li>
                      <li>政府提供等額信用保證，協助建立美方生態系</li>
                      <li>五年內採購 $848 億美元戰略物資 (LNG、波音)</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Step 2: Supply Chain - Focused on Taiwan */}
          {activeStep === AppStep.SUPPLY_CHAIN && (
            <div className="w-full flex flex-col p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 glass-panel rounded-3xl overflow-hidden border border-slate-800/50 relative min-h-[600px]">
                  <SupplyChainMap industry={industry} active={activeStep === AppStep.SUPPLY_CHAIN} data={supplyChainData?.shifts || []} />
                </div>
                
                <div className="w-full lg:w-96 glass-panel rounded-3xl p-6 flex flex-col gap-6 border border-slate-800/50">
                  <div>
                    <h2 className="text-2xl font-bold text-green-400 mb-2">臺灣官方網站發布公開資訊</h2>
                    <p className="text-xs text-slate-400 leading-relaxed italic">來源：行政院經貿談判辦公室 / 經濟部</p>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                    {TAIWAN_OFFICIAL_INFO.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-colors group">
                        <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1 opacity-70 group-hover:opacity-100">{item.dimension}</div>
                        <div className="text-sm text-slate-200 leading-relaxed">{item.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Local Impact - Advanced Control */}
          {activeStep === AppStep.LOCAL_IMPACT && (
            <div className="w-full p-8 flex flex-col gap-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-3xl font-bold text-blue-400">關稅協商下美國的衝擊</h2>
                      <p className="text-slate-400 mt-1">分析關稅協商下，美國各州與重要製造據點的微觀衝擊報告。</p>
                    </div>
                  </div>
                  <div className="flex-1 glass-panel rounded-3xl border border-slate-800/50 overflow-hidden">
                    <LocalImpactMap active={activeStep === AppStep.LOCAL_IMPACT} />
                  </div>
                </div>

                <div className="w-full lg:w-[500px] flex flex-col gap-6">
                  <div className="glass-panel rounded-3xl p-6 border border-slate-800/50">
                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🇺🇸</span> 美國受到的影響 (US Impacts)
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {TARIFF_IMPACT_DATA.us.map((item, idx) => (
                        <div key={idx} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-bold text-white">{item.category}</span>
                          </div>
                          <p className="text-sm text-slate-300 mb-1">{item.detail}</p>
                          <p className="text-[10px] text-slate-500 italic">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel rounded-3xl p-6 border border-slate-800/50 flex-1 overflow-hidden flex flex-col">
                    <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🇹🇼</span> 臺灣受到的影響 (Taiwan Impacts)
                    </h3>
                    <div className="grid grid-cols-1 gap-3 overflow-y-auto custom-scrollbar pr-2">
                      {TARIFF_IMPACT_DATA.taiwan.map((item, idx) => (
                        <div key={idx} className={`bg-slate-900/50 p-4 rounded-2xl border ${idx === 3 ? 'border-red-500/30' : 'border-slate-800'}`}>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-bold text-white">{item.category}</span>
                          </div>
                          <p className="text-sm text-slate-300 mb-1">{item.detail}</p>
                          <p className="text-[10px] text-slate-500 italic">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Predictive Insight */}
          {activeStep === AppStep.PREDICTIVE_INSIGHT && (
            <div className="w-full p-8 flex flex-col items-center">
              <div className="max-w-4xl w-full glass-panel rounded-3xl p-10 space-y-8 border border-slate-800/50">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-purple-500/20">
                    <Icons.Trend className="w-4 h-4" />
                    AI 戰略預測引擎
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    第四階段：AI 預測與戰略建議
                  </h2>
                  <p className="text-slate-400 text-lg">
                    基於「臺灣模式」與「2500 億投資」假設，利用 Gemini 3 推論未來 5 年地緣風險。
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    placeholder="輸入假設情境：例如「若臺積電五座廠提前於 2026 年完工...」"
                    className="w-full bg-slate-900/80 border-2 border-slate-800 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all pr-40"
                    onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
                  />
                  <button 
                    onClick={handlePredict}
                    disabled={isLoading || !scenario}
                    className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 rounded-xl font-bold transition-all active:scale-95"
                  >
                    生成戰略報告
                  </button>
                </div>

                {prediction && (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-h-[400px] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in duration-500">
                    <div className="prose prose-invert prose-blue max-w-none">
                      <div className="flex items-center gap-2 text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        臺美經貿深度預測摘要
                      </div>
                      <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">
                        {prediction}
                      </div>
                    </div>
                  </div>
                )}

                {!prediction && !isLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "若 2026 年臺灣完成 2500 億對美投資計畫",
                      "若日韓也採取「臺灣模式」進行關稅談判",
                      "針對亞利桑那州半導體產業鏈的群聚效應預測"
                    ].map((s, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setScenario(s);
                          handlePredict();
                        }}
                        className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl text-left text-xs text-slate-400 hover:bg-slate-800/50 hover:border-slate-700 transition-all"
                      >
                        試試: "{s}"
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-50">
           {activeStep !== AppStep.PREDICTIVE_INSIGHT && (
             <button 
              onClick={() => {
                const steps = Object.values(AppStep);
                const nextIdx = (steps.indexOf(activeStep) + 1) % steps.length;
                setActiveStep(steps[nextIdx]);
              }}
              className="bg-white text-slate-950 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:bg-slate-200 transition-all active:scale-95 text-sm"
             >
                進入下一章節
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
             </button>
           )}
        </div>

      </main>

      <footer className="h-10 bg-slate-900/30 border-t border-slate-800 px-8 flex items-center justify-between text-[10px] text-slate-600 font-bold uppercase tracking-widest">
        <div className="flex gap-6">
          <span>實時情報：US DOC / USTR / 行政院經貿辦</span>
          <span>AI 模型：Gemini 3 Pro Multi-Modal Reasoning</span>
        </div>
        <div>
          &copy; 2024 TradeViz Taiwan-US Strategic Dashboard
        </div>
      </footer>

      {/* API Key Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-700 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <Icons.Key className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold">Gemini API 設定</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                請輸入您的 Gemini API Key 以啟用 AI 分析功能。金鑰將儲存於您的瀏覽器本地空間。
              </p>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">API Key</label>
                <input 
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="在此輸入 API Key..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveApiKey}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/20"
                >
                  儲存設定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
