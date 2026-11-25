import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Search, 
  Trash2, 
  Eye, 
  Activity, 
  TrendingUp,
  X,
  Sparkles
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { loadHistory, saveHistory } from '../utils/historyStorage'

const History = () => {
  const [history, setHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all') // 'all', 'Stone', 'Normal'
  const [selectedScan, setSelectedScan] = useState(null)

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  useEffect(() => {
    if (!selectedScan) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedScan(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedScan])

  const deleteScan = (id) => {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    saveHistory(updated)
    if (selectedScan && selectedScan.id === id) {
      setSelectedScan(null)
    }
  }

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all scan history from this browser?')) {
      setHistory([])
      localStorage.removeItem('kidneyai_history')
      setSelectedScan(null)
    }
  }

  const seedSampleHistory = () => {
    const demoSamples = [
      {
        id: 'KAP-SAMPLE-01',
        prediction: 'Stone',
        confidence: '94.80',
        model1Prob: '95.2',
        model2Prob: '94.4',
        timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        imageName: 'Renal_Ultrasound_Patient_401.jpg',
        imageSize: '0.84',
        previewUrl: '/samples/stone_sample.jpg'
      },
      {
        id: 'KAP-SAMPLE-02',
        prediction: 'Normal',
        confidence: '92.10',
        model1Prob: '91.5',
        model2Prob: '92.7',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
        imageName: 'Renal_BMode_Unremarkable_102.jpg',
        imageSize: '0.76',
        previewUrl: '/samples/normal_sample.jpg'
      },
      {
        id: 'KAP-SAMPLE-03',
        prediction: 'Stone',
        confidence: '96.40',
        model1Prob: '97.0',
        model2Prob: '95.8',
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
        imageName: 'Right_Kidney_Calculi_Echo.jpg',
        imageSize: '0.91',
        previewUrl: '/samples/stone_sample.jpg'
      },
      {
        id: 'KAP-SAMPLE-04',
        prediction: 'Normal',
        confidence: '89.50',
        model1Prob: '88.9',
        model2Prob: '90.1',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        imageName: 'Bilateral_Normal_Cortex_09.jpg',
        imageSize: '0.72',
        previewUrl: '/samples/normal_sample.jpg'
      }
    ]
    saveHistory(demoSamples)
    setHistory(demoSamples)
  }

  // Filter and search logic
  const normalizedQuery = searchQuery.toLowerCase()
  const filteredHistory = history.filter(item => {
    const matchesFilter = filterType === 'all' || item.prediction === filterType
    const matchesSearch = 
      (item.imageName || '').toLowerCase().includes(normalizedQuery) ||
      (item.id || '').toLowerCase().includes(normalizedQuery)
    return matchesFilter && matchesSearch
  })

  // Aggregate metrics
  const totalScans = history.length
  const stoneScans = history.filter(h => h.prediction === 'Stone').length
  const normalScans = history.filter(h => h.prediction === 'Normal').length
  const avgConfidence = totalScans > 0 
    ? (history.reduce((acc, h) => acc + parseFloat(h.confidence || 0), 0) / totalScans).toFixed(1)
    : '0'

  // Prepare chart data (chronological)
  const chartData = [...history]
    .reverse()
    .slice(-10)
    .map((scan, idx) => ({
      name: `#${idx + 1}`,
      id: scan.id,
      confidence: parseFloat(scan.confidence || 0),
      isStone: scan.prediction === 'Stone'
    }))

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-primary">Audit Registry</span>
            <span className="text-xs text-[#5F6C62] dark:text-[#A6B5A9]">
              Local Browser Session
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#202923] dark:text-[#E7EEE8]">
            Diagnostic Scan History
          </h2>
          <p className="text-sm text-[#5F6C62] dark:text-[#A6B5A9] mt-0.5">
            Audit trail of processed renal scans, ensemble soft-vote confidence, and clinical classification reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {totalScans === 0 ? (
            <button
              onClick={seedSampleHistory}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-forest dark:text-[#8BB49A]" />
              <span>Load Sample History</span>
            </button>
          ) : (
            <button
              onClick={clearAllHistory}
              className="btn-secondary text-xs text-[#A45339] dark:text-[#E08B6D] hover:bg-[#FDF3EF] dark:hover:bg-[#2A1E1A] flex items-center gap-1.5"
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          )}

          <Link to="/upload" className="btn-primary text-xs flex items-center gap-1.5">
            <Activity size={14} />
            <span>Analyze Scan</span>
          </Link>
        </div>
      </div>

      {totalScans > 0 ? (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <span className="text-xs font-semibold text-[#5F6C62] dark:text-[#A6B5A9] uppercase tracking-wider block">
                Total Scans
              </span>
              <div className="text-2xl font-bold mt-1 text-[#202923] dark:text-[#E7EEE8]">
                {totalScans}
              </div>
              <p className="text-[11px] text-[#5F6C62] dark:text-[#A6B5A9] mt-0.5">
                Processed in this browser
              </p>
            </div>

            <div className="card p-4 border-[#F2C5B5] dark:border-[#E08B6D]/40">
              <span className="text-xs font-semibold text-[#A45339] dark:text-[#E08B6D] uppercase tracking-wider block">
                Stones Detected
              </span>
              <div className="text-2xl font-bold mt-1 text-[#A45339] dark:text-[#E08B6D]">
                {stoneScans}
              </div>
              <p className="text-[11px] text-[#5F6C62] dark:text-[#A6B5A9] mt-0.5">
                {((stoneScans / totalScans) * 100).toFixed(0)}% positive rate
              </p>
            </div>

            <div className="card p-4 border-[#BED7CA] dark:border-[#8BB49A]/40">
              <span className="text-xs font-semibold text-forest dark:text-[#8BB49A] uppercase tracking-wider block">
                Unremarkable
              </span>
              <div className="text-2xl font-bold mt-1 text-forest dark:text-[#8BB49A]">
                {normalScans}
              </div>
              <p className="text-[11px] text-[#5F6C62] dark:text-[#A6B5A9] mt-0.5">
                {((normalScans / totalScans) * 100).toFixed(0)}% negative rate
              </p>
            </div>

            <div className="card p-4 border-[#E4E7E0] dark:border-[#34443A]">
              <span className="text-xs font-semibold text-[#7A9B86] dark:text-[#A6B5A9] uppercase tracking-wider block">
                Mean Confidence
              </span>
              <div className="text-2xl font-bold mt-1 text-[#202923] dark:text-[#E7EEE8]">
                {avgConfidence}%
              </div>
              <p className="text-[11px] text-[#5F6C62] dark:text-[#A6B5A9] mt-0.5">
                Across both classes
              </p>
            </div>
          </div>

          {/* Confidence Trend Chart */}
          {chartData.length > 1 && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E4E7E0] dark:border-[#34443A]">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-forest dark:text-[#8BB49A]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#202923] dark:text-[#E7EEE8]">
                    Recent Scan Confidence Trajectory
                  </h3>
                </div>
                <span className="text-xs text-[#5F6C62] dark:text-[#A6B5A9]">
                  Last {chartData.length} records
                </span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="currentColor" />
                    <XAxis dataKey="name" stroke="#A6B5A9" fontSize={11} />
                    <YAxis domain={[50, 100]} stroke="#A6B5A9" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-color)',
                        borderRadius: '10px',
                        color: 'var(--text-main)',
                        fontSize: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
                      }}
                      formatter={(val) => [`${val}%`, 'Ensemble Confidence']}
                    />
                    <Line
                      type="monotone"
                      dataKey="confidence"
                      stroke="var(--primary)"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: 'var(--primary)', stroke: 'var(--bg-card)', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: 'var(--primary)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6C62] dark:text-[#A6B5A9]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by file name or Report ID..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E4E7E0] dark:border-[#34443A] bg-white dark:bg-[#1C2821] text-[#202923] dark:text-[#E7EEE8] focus:outline-none focus:ring-2 focus:ring-forest/20 dark:focus:ring-[#8BB49A]/20 focus:border-forest dark:focus:border-[#8BB49A] transition-all shadow-subtle placeholder:text-[#5F6C62] dark:placeholder:text-[#A6B5A9]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
              <span className="text-[#5F6C62] dark:text-[#A6B5A9] text-[11px] mr-1 hidden sm:inline">Filter:</span>
              {[
                { id: 'all', label: `All (${totalScans})` },
                { id: 'Stone', label: `Stones (${stoneScans})` },
                { id: 'Normal', label: `Normal (${normalScans})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-forest text-white dark:bg-[#8BB49A] dark:text-[#0E1612] shadow-sm'
                      : 'bg-white dark:bg-[#1C2821] text-[#5F6C62] dark:text-[#A6B5A9] border border-[#E4E7E0] dark:border-[#34443A] hover:bg-[#EDECE6] dark:hover:bg-[#24352A] hover:text-[#202923] dark:hover:text-[#E7EEE8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scans Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHistory.map((scan) => {
              const isStone = scan.prediction === 'Stone'
              return (
                <div
                  key={scan.id}
                  className="card p-4 flex flex-col justify-between hover:border-forest/50 dark:hover:border-[#8BB49A]/50 transition-all group shadow-subtle hover:shadow-premium"
                >
                  <div className="space-y-3">
                    {/* Header Row */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-[#5F6C62] dark:text-[#A6B5A9]">
                        {scan.id}
                      </span>
                      <span className={isStone ? 'badge-danger text-[10px]' : 'badge-success text-[10px]'}>
                        {isStone ? 'Stone' : 'Normal'}
                      </span>
                    </div>

                    {/* Image Preview Thumbnail */}
                    <div 
                      onClick={() => setSelectedScan(scan)}
                      className="relative h-36 bg-[#0A0E0C] rounded-xl overflow-hidden border border-[#CBD2C6] dark:border-[#34443A] flex items-center justify-center cursor-pointer group-hover:border-forest/60 dark:group-hover:border-[#8BB49A]/60 transition-colors"
                    >
                      <img
                        src={scan.previewUrl}
                        alt={scan.imageName}
                        className="max-h-full max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-[#0E1612]/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1 backdrop-blur-[2px]">
                        <Eye size={14} />
                        <span>Inspect Scan</span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div>
                      <p className="font-bold text-xs text-[#202923] dark:text-[#E7EEE8] truncate" title={scan.imageName}>
                        {scan.imageName}
                      </p>
                      <p className="text-[11px] text-[#5F6C62] dark:text-[#A6B5A9] mt-0.5">
                        {new Date(scan.timestamp).toLocaleDateString()} at {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Confidence Meter Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[11px] text-[#5F6C62] dark:text-[#A6B5A9]">Confidence</span>
                        <span className="font-mono font-bold text-xs text-[#202923] dark:text-[#E7EEE8]">
                          {scan.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-[#EDECE6] dark:bg-[#24352A] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${isStone ? 'bg-[#D27A5C] dark:bg-[#E08B6D]' : 'bg-forest dark:bg-[#8BB49A]'}`}
                          style={{ width: `${scan.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 mt-3 border-t border-[#E4E7E0] dark:border-[#34443A] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedScan(scan)}
                      className="text-xs text-forest dark:text-[#8BB49A] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => deleteScan(scan.id)}
                      className="p-1 rounded-lg text-[#5F6C62] dark:text-[#A6B5A9] hover:text-[#A45339] dark:hover:text-[#E08B6D] hover:bg-[#EDECE6] dark:hover:bg-[#24352A] transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredHistory.length === 0 && (
            <div className="card py-12 text-center text-xs text-[#5F6C62] dark:text-[#A6B5A9]">
              No matching scans found for query "{searchQuery}".
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="card py-16 text-center space-y-4">
          <div className="w-16 h-16 bg-[#EDECE6] dark:bg-[#24352A] rounded-2xl flex items-center justify-center mx-auto text-forest dark:text-[#8BB49A] border border-[#E4E7E0] dark:border-[#34443A]">
            <Calendar size={30} />
          </div>
          <div className="max-w-sm mx-auto">
            <h3 className="font-bold text-base text-[#202923] dark:text-[#E7EEE8]">
              No Scan History Recorded
            </h3>
            <p className="text-xs text-[#5F6C62] dark:text-[#A6B5A9] mt-1 leading-relaxed">
              Any scan you analyze in the Diagnostic Studio is automatically stored locally in your browser for chronological auditing.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link to="/upload" className="btn-primary text-xs flex items-center gap-1.5 font-bold">
              <Activity size={14} />
              <span>Launch Diagnostic Studio</span>
            </Link>
            <button
              onClick={seedSampleHistory}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-forest dark:text-[#8BB49A]" />
              <span>Load Sample History</span>
            </button>
          </div>
        </div>
      )}

      {/* Inspect Modal Dialog */}
      {selectedScan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1612]/75 dark:bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedScan(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 relative border-[#E4E7E0] dark:border-[#34443A] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E0] dark:border-[#34443A]">
              <div>
                <span className="font-mono text-xs text-[#5F6C62] dark:text-[#A6B5A9]">{selectedScan.id}</span>
                <h3 className="text-base font-bold text-[#202923] dark:text-[#E7EEE8]">
                  Scan Inspection Detail
                </h3>
              </div>
              <button
                onClick={() => setSelectedScan(null)}
                className="p-1 rounded-lg hover:bg-[#EDECE6] dark:hover:bg-[#24352A] text-[#5F6C62] dark:text-[#A6B5A9] hover:text-[#202923] dark:hover:text-[#E7EEE8]"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-[#0A0E0C] border border-[#CBD2C6] dark:border-[#34443A] flex items-center justify-center max-h-80">
              <img
                src={selectedScan.previewUrl}
                alt={selectedScan.imageName}
                className="max-h-72 object-contain"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-[#EDECE6] dark:bg-[#24352A] rounded-xl border border-[#E4E7E0] dark:border-[#34443A]">
                <span className="text-[10px] text-[#5F6C62] dark:text-[#A6B5A9] uppercase font-bold block">Verdict</span>
                <span className={`font-bold mt-0.5 block ${selectedScan.prediction === 'Stone' ? 'text-[#A45339] dark:text-[#E08B6D]' : 'text-forest dark:text-[#8BB49A]'}`}>
                  {selectedScan.prediction === 'Stone' ? 'Nephrolithiasis' : 'Negative'}
                </span>
              </div>
              <div className="p-2.5 bg-[#EDECE6] dark:bg-[#24352A] rounded-xl border border-[#E4E7E0] dark:border-[#34443A]">
                <span className="text-[10px] text-[#5F6C62] dark:text-[#A6B5A9] uppercase font-bold block">Confidence</span>
                <span className="font-bold font-mono mt-0.5 block text-[#202923] dark:text-[#E7EEE8]">
                  {selectedScan.confidence}%
                </span>
              </div>
              <div className="p-2.5 bg-[#EDECE6] dark:bg-[#24352A] rounded-xl border border-[#E4E7E0] dark:border-[#34443A]">
                <span className="text-[10px] text-[#5F6C62] dark:text-[#A6B5A9] uppercase font-bold block">Checkpoint 1</span>
                <span className="font-bold font-mono mt-0.5 block text-[#202923] dark:text-[#E7EEE8]">
                  {selectedScan.model1Prob || selectedScan.confidence}%
                </span>
              </div>
              <div className="p-2.5 bg-[#EDECE6] dark:bg-[#24352A] rounded-xl border border-[#E4E7E0] dark:border-[#34443A]">
                <span className="text-[10px] text-[#5F6C62] dark:text-[#A6B5A9] uppercase font-bold block">Checkpoint 2</span>
                <span className="font-bold font-mono mt-0.5 block text-[#202923] dark:text-[#E7EEE8]">
                  {selectedScan.model2Prob || selectedScan.confidence}%
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#EDECE6] dark:bg-[#24352A] rounded-xl text-xs space-y-1.5 border border-[#E4E7E0] dark:border-[#34443A]">
              <div className="flex justify-between text-[#5F6C62] dark:text-[#A6B5A9]">
                <span>File Name:</span>
                <span className="font-semibold text-[#202923] dark:text-[#E7EEE8]">{selectedScan.imageName}</span>
              </div>
              <div className="flex justify-between text-[#5F6C62] dark:text-[#A6B5A9]">
                <span>Timestamp:</span>
                <span className="font-semibold text-[#202923] dark:text-[#E7EEE8]">
                  {new Date(selectedScan.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E4E7E0] dark:border-[#34443A]">
              <button
                onClick={() => deleteScan(selectedScan.id)}
                className="btn-secondary text-xs text-[#A45339] dark:text-[#E08B6D] hover:bg-[#FDF3EF] dark:hover:bg-[#2A1E1A]"
              >
                Delete Record
              </button>
              <button
                onClick={() => setSelectedScan(null)}
                className="btn-primary text-xs"
              >
                Close Viewport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History
