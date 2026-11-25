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

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-primary">Audit Registry</span>
            <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
              Local Session Storage
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark">
            Diagnostic Scan History
          </h2>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-0.5">
            Audit trail of processed renal scans, ensemble soft-vote confidence, and clinical classification reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {totalScans === 0 ? (
            <button
              onClick={seedSampleHistory}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-primary" />
              <span>Load Sample History</span>
            </button>
          ) : (
            <button
              onClick={clearAllHistory}
              className="btn-secondary text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5"
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
              <span className="text-xs font-semibold text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider block">
                Total Scans
              </span>
              <div className="text-2xl font-bold mt-1 text-text-primary dark:text-text-primary-dark">
                {totalScans}
              </div>
              <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                Processed in this browser
              </p>
            </div>

            <div className="card p-4 border-rose-100 dark:border-rose-900/30">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                Stones Detected
              </span>
              <div className="text-2xl font-bold mt-1 text-rose-600 dark:text-rose-400">
                {stoneScans}
              </div>
              <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                {totalScans > 0 ? ((stoneScans / totalScans) * 100).toFixed(0) : 0}% positive rate
              </p>
            </div>

            <div className="card p-4 border-emerald-100 dark:border-emerald-900/30">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                Unremarkable
              </span>
              <div className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">
                {normalScans}
              </div>
              <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                {totalScans > 0 ? ((normalScans / totalScans) * 100).toFixed(0) : 0}% negative rate
              </p>
            </div>

            <div className="card p-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                Mean Confidence
              </span>
              <div className="text-2xl font-bold mt-1 text-text-primary dark:text-text-primary-dark">
                {avgConfidence}%
              </div>
              <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                Across both classes
              </p>
            </div>
          </div>

          {/* Confidence Trend Chart */}
          {chartData.length > 1 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-color dark:border-border-color-dark">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary dark:text-text-primary-dark">
                    Recent Scan Confidence Trajectory
                  </h3>
                </div>
                <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
                  Last {chartData.length} records
                </span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '12px'
                      }}
                      formatter={(val) => [`${val}%`, 'Ensemble Confidence']}
                    />
                    <Line
                      type="monotone"
                      dataKey="confidence"
                      stroke="#0284c7"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#0284c7' }}
                      activeDot={{ r: 6 }}
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
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by file name or Report ID..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-border-color dark:border-border-color-dark bg-surface dark:bg-surface-elevatedDark text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
              <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">Filter:</span>
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
                      ? 'bg-primary text-white font-semibold shadow-xs'
                      : 'bg-surface dark:bg-surface-elevatedDark text-slate-600 dark:text-slate-300 border border-border-color dark:border-border-color-dark hover:bg-slate-50 dark:hover:bg-slate-800'
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
                  className="card p-4 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
                >
                  <div className="space-y-3">
                    {/* Header Row */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-slate-400">
                        {scan.id}
                      </span>
                      <span className={isStone ? 'badge-danger text-[10px]' : 'badge-success text-[10px]'}>
                        {isStone ? 'Stone' : 'Normal'}
                      </span>
                    </div>

                    {/* Image Preview Thumbnail */}
                    <div 
                      onClick={() => setSelectedScan(scan)}
                      className="relative h-36 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center cursor-pointer group-hover:border-primary/50 transition-colors"
                    >
                      <img
                        src={scan.previewUrl}
                        alt={scan.imageName}
                        className="max-h-full max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                        <Eye size={14} />
                        <span>Inspect Scan</span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div>
                      <p className="font-medium text-xs text-text-primary dark:text-text-primary-dark truncate" title={scan.imageName}>
                        {scan.imageName}
                      </p>
                      <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                        {new Date(scan.timestamp).toLocaleDateString()} at {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Confidence Meter Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[11px] text-slate-500">Confidence</span>
                        <span className="font-mono font-bold text-xs text-text-primary dark:text-text-primary-dark">
                          {scan.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${isStone ? 'bg-danger' : 'bg-success'}`}
                          style={{ width: `${scan.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 mt-3 border-t border-border-color dark:border-border-color-dark flex items-center justify-between">
                    <button
                      onClick={() => setSelectedScan(scan)}
                      className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => deleteScan(scan.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
            <div className="card py-12 text-center text-xs text-text-secondary dark:text-text-secondary-dark">
              No matching scans found for query "{searchQuery}".
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="card py-16 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Calendar size={32} />
          </div>
          <div className="max-w-sm mx-auto">
            <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
              No Scan History Recorded
            </h3>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1">
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
              <Sparkles size={14} className="text-primary" />
              <span>Load Sample History</span>
            </button>
          </div>
        </div>
      )}

      {/* Inspect Modal Dialog */}
      <AnimatePresence>
        {selectedScan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 relative">
              <div className="flex items-center justify-between pb-3 border-b border-border-color dark:border-border-color-dark">
                <div>
                  <span className="font-mono text-xs text-slate-500">{selectedScan.id}</span>
                  <h3 className="text-base font-bold text-text-primary dark:text-text-primary-dark">
                    Scan Inspection Detail
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center max-h-80">
                <img
                  src={selectedScan.previewUrl}
                  alt={selectedScan.imageName}
                  className="max-h-72 object-contain"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Verdict</span>
                  <span className={`font-bold mt-0.5 block ${selectedScan.prediction === 'Stone' ? 'text-danger' : 'text-success'}`}>
                    {selectedScan.prediction === 'Stone' ? 'Nephrolithiasis' : 'Negative'}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Confidence</span>
                  <span className="font-bold font-mono mt-0.5 block text-text-primary dark:text-text-primary-dark">
                    {selectedScan.confidence}%
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Checkpoint 1</span>
                  <span className="font-bold font-mono mt-0.5 block text-text-primary dark:text-text-primary-dark">
                    {selectedScan.model1Prob || selectedScan.confidence}%
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Checkpoint 2</span>
                  <span className="font-bold font-mono mt-0.5 block text-text-primary dark:text-text-primary-dark">
                    {selectedScan.model2Prob || selectedScan.confidence}%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>File Name:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{selectedScan.imageName}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Timestamp:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {new Date(selectedScan.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border-color dark:border-border-color-dark">
                <button
                  onClick={() => deleteScan(selectedScan.id)}
                  className="btn-secondary text-xs text-rose-600 dark:text-rose-400"
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
