import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Search, 
  Filter, 
  Trash2, 
  Download, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  ArrowRight,
  TrendingUp,
  X,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const History = () => {
  const [history, setHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all') // 'all', 'Stone', 'Normal'
  const [selectedScan, setSelectedScan] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('kidneyai_history') || '[]')
    setHistory(saved)
  }

  const deleteScan = (id) => {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    localStorage.setItem('kidneyai_history', JSON.stringify(updated))
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
    localStorage.setItem('kidneyai_history', JSON.stringify(demoSamples))
    setHistory(demoSamples)
  }

  // Filter and search logic
  const filteredHistory = history.filter(item => {
    const matchesFilter = filterType === 'all' || item.prediction === filterType
    const matchesSearch = 
      item.imageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
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

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-primary">Audit Registry</span>
            <span className="text-xs text-theme-muted">
              Local Browser Session
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-theme-text">
            Diagnostic Scan History
          </h2>
          <p className="text-sm text-theme-muted mt-0.5">
            Audit trail of processed renal scans, ensemble soft-vote confidence, and clinical classification reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {totalScans === 0 ? (
            <button
              onClick={seedSampleHistory}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-forest dark:text-darkEmerald-primary" />
              <span>Load Sample History</span>
            </button>
          ) : (
            <button
              onClick={clearAllHistory}
              className="btn-secondary text-xs text-terracotta dark:text-darkEmerald-accent hover:bg-terracotta-50 dark:hover:bg-terracotta-900/30 flex items-center gap-1.5"
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
              <span className="text-xs font-semibold text-theme-muted uppercase tracking-wider block">
                Total Scans
              </span>
              <div className="text-2xl font-bold mt-1 text-theme-text">
                {totalScans}
              </div>
              <p className="text-[11px] text-theme-muted mt-0.5">
                Processed in this browser
              </p>
            </div>

            <div className="card p-4 border-terracotta-200 dark:border-terracotta-700/50">
              <span className="text-xs font-semibold text-terracotta-600 dark:text-darkEmerald-accent uppercase tracking-wider block">
                Stones Detected
              </span>
              <div className="text-2xl font-bold mt-1 text-terracotta-600 dark:text-darkEmerald-accent">
                {stoneScans}
              </div>
              <p className="text-[11px] text-theme-muted mt-0.5">
                {totalScans > 0 ? ((stoneScans / totalScans) * 100).toFixed(0) : 0}% positive rate
              </p>
            </div>

            <div className="card p-4 border-forest-200 dark:border-forest-700/50">
              <span className="text-xs font-semibold text-forest dark:text-darkEmerald-primary uppercase tracking-wider block">
                Unremarkable
              </span>
              <div className="text-2xl font-bold mt-1 text-forest dark:text-darkEmerald-primary">
                {normalScans}
              </div>
              <p className="text-[11px] text-theme-muted mt-0.5">
                {totalScans > 0 ? ((normalScans / totalScans) * 100).toFixed(0) : 0}% negative rate
              </p>
            </div>

            <div className="card p-4 border-sage-200 dark:border-sage-700/50">
              <span className="text-xs font-semibold text-sage-600 dark:text-sage-400 uppercase tracking-wider block">
                Mean Confidence
              </span>
              <div className="text-2xl font-bold mt-1 text-theme-text">
                {avgConfidence}%
              </div>
              <p className="text-[11px] text-theme-muted mt-0.5">
                Across both classes
              </p>
            </div>
          </div>

          {/* Confidence Trend Chart */}
          {chartData.length > 1 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-theme-border">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-forest dark:text-darkEmerald-primary" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-theme-text">
                    Recent Scan Confidence Trajectory
                  </h3>
                </div>
                <span className="text-xs text-theme-muted">
                  Last {chartData.length} records
                </span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.12} stroke="currentColor" />
                    <XAxis dataKey="name" stroke="#758078" fontSize={11} />
                    <YAxis domain={[50, 100]} stroke="#758078" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-color)',
                        borderRadius: '10px',
                        color: 'var(--text-main)',
                        fontSize: '12px',
                        boxShadow: '0 8px 24px rgba(32,41,35,0.1)'
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
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by file name or Report ID..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-theme-border bg-theme-card text-theme-text focus:outline-none focus:ring-2 focus:ring-forest/20 dark:focus:ring-darkEmerald-primary/20 focus:border-forest dark:focus:border-darkEmerald-primary transition-all shadow-subtle placeholder:text-theme-muted"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
              <span className="text-theme-muted text-[11px] mr-1 hidden sm:inline">Filter:</span>
              {[
                { id: 'all', label: `All (${totalScans})` },
                { id: 'Stone', label: `Stones (${stoneScans})` },
                { id: 'Normal', label: `Normal (${normalScans})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-forest text-white dark:bg-darkEmerald-primary dark:text-charcoal-900 font-semibold shadow-sm'
                      : 'bg-theme-card text-theme-muted border border-theme-border hover:bg-theme-elevated hover:text-theme-text'
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
                  className="card p-4 flex flex-col justify-between hover:border-forest/40 dark:hover:border-darkEmerald-primary/40 transition-all group shadow-subtle hover:shadow-premium"
                >
                  <div className="space-y-3">
                    {/* Header Row */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-theme-muted">
                        {scan.id}
                      </span>
                      <span className={isStone ? 'badge-danger text-[10px]' : 'badge-success text-[10px]'}>
                        {isStone ? 'Stone' : 'Normal'}
                      </span>
                    </div>

                    {/* Image Preview Thumbnail */}
                    <div 
                      onClick={() => setSelectedScan(scan)}
                      className="relative h-36 bg-[#0A0E0C] rounded-xl overflow-hidden border border-theme-border flex items-center justify-center cursor-pointer group-hover:border-forest/50 dark:group-hover:border-darkEmerald-primary/50 transition-colors"
                    >
                      <img
                        src={scan.previewUrl}
                        alt={scan.imageName}
                        className="max-h-full max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1 backdrop-blur-[2px]">
                        <Eye size={14} />
                        <span>Inspect Scan</span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div>
                      <p className="font-semibold text-xs text-theme-text truncate" title={scan.imageName}>
                        {scan.imageName}
                      </p>
                      <p className="text-[11px] text-theme-muted mt-0.5">
                        {new Date(scan.timestamp).toLocaleDateString()} at {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Confidence Meter Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[11px] text-theme-muted">Confidence</span>
                        <span className="font-mono font-bold text-xs text-theme-text">
                          {scan.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-ivory-200 dark:bg-darkEmerald-border h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${isStone ? 'bg-terracotta dark:bg-darkEmerald-accent' : 'bg-forest dark:bg-darkEmerald-primary'}`}
                          style={{ width: `${scan.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 mt-3 border-t border-theme-border flex items-center justify-between">
                    <button
                      onClick={() => setSelectedScan(scan)}
                      className="text-xs text-forest dark:text-darkEmerald-primary hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => deleteScan(scan.id)}
                      className="p-1 rounded-lg text-theme-muted hover:text-terracotta hover:bg-theme-elevated transition-colors cursor-pointer"
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
            <div className="card py-12 text-center text-xs text-theme-muted">
              No matching scans found for query "{searchQuery}".
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="card py-16 text-center space-y-4">
          <div className="w-16 h-16 bg-theme-elevated rounded-2xl flex items-center justify-center mx-auto text-theme-muted border border-theme-border">
            <Calendar size={30} />
          </div>
          <div className="max-w-sm mx-auto">
            <h3 className="font-bold text-base text-theme-text">
              No Scan History Recorded
            </h3>
            <p className="text-xs text-theme-muted mt-1">
              Any scan you analyze in the Diagnostic Studio is automatically stored locally in your browser for chronological auditing.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link to="/upload" className="btn-primary text-xs flex items-center gap-1.5">
              <Activity size={14} />
              <span>Launch Diagnostic Studio</span>
            </Link>
            <button
              onClick={seedSampleHistory}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-forest dark:text-darkEmerald-primary" />
              <span>Load Sample History</span>
            </button>
          </div>
        </div>
      )}

      {/* Inspect Modal Dialog */}
      <AnimatePresence>
        {selectedScan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 dark:bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 relative border-theme-border shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-theme-border">
                <div>
                  <span className="font-mono text-xs text-theme-muted">{selectedScan.id}</span>
                  <h3 className="text-base font-bold text-theme-text">
                    Scan Inspection Detail
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="p-1 rounded-lg hover:bg-theme-elevated text-theme-muted hover:text-theme-text"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#0A0E0C] border border-theme-border flex items-center justify-center max-h-80">
                <img
                  src={selectedScan.previewUrl}
                  alt={selectedScan.imageName}
                  className="max-h-72 object-contain"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-theme-elevated rounded-xl border border-theme-border">
                  <span className="text-[10px] text-theme-muted uppercase font-semibold block">Verdict</span>
                  <span className={`font-bold mt-0.5 block ${selectedScan.prediction === 'Stone' ? 'text-terracotta dark:text-darkEmerald-accent' : 'text-forest dark:text-darkEmerald-primary'}`}>
                    {selectedScan.prediction === 'Stone' ? 'Nephrolithiasis' : 'Negative'}
                  </span>
                </div>
                <div className="p-2.5 bg-theme-elevated rounded-xl border border-theme-border">
                  <span className="text-[10px] text-theme-muted uppercase font-semibold block">Confidence</span>
                  <span className="font-bold font-mono mt-0.5 block text-theme-text">
                    {selectedScan.confidence}%
                  </span>
                </div>
                <div className="p-2.5 bg-theme-elevated rounded-xl border border-theme-border">
                  <span className="text-[10px] text-theme-muted uppercase font-semibold block">Checkpoint 1</span>
                  <span className="font-bold font-mono mt-0.5 block text-theme-text">
                    {selectedScan.model1Prob || selectedScan.confidence}%
                  </span>
                </div>
                <div className="p-2.5 bg-theme-elevated rounded-xl border border-theme-border">
                  <span className="text-[10px] text-theme-muted uppercase font-semibold block">Checkpoint 2</span>
                  <span className="font-bold font-mono mt-0.5 block text-theme-text">
                    {selectedScan.model2Prob || selectedScan.confidence}%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-theme-elevated rounded-xl text-xs space-y-1 border border-theme-border">
                <div className="flex justify-between text-theme-muted">
                  <span>File Name:</span>
                  <span className="font-medium text-theme-text">{selectedScan.imageName}</span>
                </div>
                <div className="flex justify-between text-theme-muted">
                  <span>Timestamp:</span>
                  <span className="font-medium text-theme-text">
                    {new Date(selectedScan.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-theme-border">
                <button
                  onClick={() => deleteScan(selectedScan.id)}
                  className="btn-secondary text-xs text-terracotta dark:text-darkEmerald-accent hover:bg-terracotta-50 dark:hover:bg-terracotta-900/30"
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
      </AnimatePresence>
    </div>
  )
}

export default History
