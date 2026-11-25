import React from 'react'
import { motion } from 'framer-motion'
import { 
  Layers, 
  Cpu, 
  Database, 
  Zap, 
  ShieldAlert, 
  Eye, 
  Activity, 
  GitBranch, 
  CheckCircle,
  FileCode,
  Sliders,
  ExternalLink
} from 'lucide-react'

const About = () => {
  const cnnBlocks = [
    {
      block: 'Block 1',
      layers: 'Conv2D (32 filters, 3×3) + ReLU + MaxPool (2×2)',
      output: '112 × 112 × 32',
      desc: 'Initial spatial edge and acoustic impedance boundary feature extraction from renal ultrasound/CT'
    },
    {
      block: 'Block 2',
      layers: 'Conv2D (64 filters, 3×3) + ReLU + MaxPool (2×2)',
      output: '56 × 56 × 64',
      desc: 'Intermediate echogenic density representations and parenchyma gradient transitions'
    },
    {
      block: 'Block 3',
      layers: 'Conv2D (128 filters, 3×3) + ReLU + MaxPool (2×2)',
      output: '28 × 28 × 128',
      desc: 'High-level pelvicalyceal architecture mapping and acoustic shadowing pattern detection'
    },
    {
      block: 'Block 4',
      layers: 'Conv2D (128 filters, 3×3) + ReLU + MaxPool (2×2)',
      output: '14 × 14 × 128',
      desc: 'Final convolutional feature map (targeted by Grad-CAM explainability localization)'
    },
    {
      block: 'Classifier Head',
      layers: 'GlobalAveragePooling2D + Dense (512, Dropout 0.5) + Dense (256, Dropout 0.3) + Dense (1, Sigmoid)',
      output: 'Scalar Probability [0.0, 1.0]',
      desc: 'Dense classification head mapping pooled spatial representations to binary calculus probability'
    }
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-surface-dark border-blue-100/80 dark:border-white/[0.08]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="badge-primary">System Architecture</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Verified Codebase Specifications
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Technical Architecture &amp; Model Specifications
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          KidneyAI Pro is an end-to-end computer-aided detection (CAD) platform designed for automated binary classification of renal scan images (Normal vs. Nephrolithiasis), combining a dual-model CNN ensemble, Grad-CAM explainability, and serverless cloud inference.
        </p>
      </div>

      {/* 4 Pillars Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 border border-blue-200/80 dark:border-blue-800/40 shadow-sm shadow-blue-500/10">
            <Cpu size={19} />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Dual-Model CNN
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Two independently trained 4-block Conv2D Sequential checkpoints evaluated in parallel.
          </p>
        </div>

        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-200/80 dark:border-emerald-800/40 shadow-sm shadow-emerald-500/10">
            <Database size={19} />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            9,416 Curated Scans
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            4,414 normal kidneys &amp; 5,002 verified nephrolithiasis scans with 80/20 train/validation split.
          </p>
        </div>

        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 border border-cyan-200/80 dark:border-cyan-800/40 shadow-sm shadow-cyan-500/10">
            <Zap size={19} />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            ZeroGPU Serverless
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Hosted on Hugging Face Spaces with dynamic GPU leasing and WebSocket RPC client tunneling.
          </p>
        </div>

        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 border border-amber-200/80 dark:border-amber-800/40 shadow-sm shadow-amber-500/10">
            <Eye size={19} />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Grad-CAM Module
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Gradient-weighted Class Activation Mapping to localize hyperechoic foci &amp; acoustic shadows.
          </p>
        </div>
      </div>

      {/* Model Architecture Deep-Dive */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/90 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-blue-500" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Custom Sequential CNN Architecture
            </h3>
          </div>
          <span className="badge-neutral text-[10px] font-mono">
            training/simple_train.py
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Both model checkpoints (<code className="font-mono text-blue-600 dark:text-blue-400">final_efficientnet_model.h5</code> and <code className="font-mono text-blue-600 dark:text-blue-400">final_resnet50_model.h5</code>) share the identical custom 4-block Conv2D Sequential architecture below, trained under independent random weight initializations with Adam optimization and binary cross-entropy loss:
        </p>

        <div className="space-y-2.5">
          {cnnBlocks.map((b, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-surface-elevatedDark rounded-xl border border-slate-200/80 dark:border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-subtle">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{b.block}</span>
                  <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-medium">{b.layers}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {b.desc}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-surface-panelDark border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300">
                  {b.output}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ensemble Decision Rule & Class Balancing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Soft-Vote Formulation */}
        <div className="card space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200/90 dark:border-white/[0.08]">
            <GitBranch size={16} className="text-cyan-500" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Soft-Vote Consensus Rule
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            During inference, predictions from both loaded checkpoints are collected as posterior probabilities and averaged:
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-surface-elevatedDark font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1 border border-slate-200/80 dark:border-white/[0.06]">
            <div>p_avg = (p_model1 + p_model2) / 2</div>
            <div className="text-slate-500 text-[11px] mt-1">
              Decision Rule: If p_avg &gt; 0.50 &rarr; "Stone", Else &rarr; "Normal"
            </div>
            <div className="text-slate-500 text-[11px]">
              Confidence: p_avg &times; 100% (Stone) or (1 - p_avg) &times; 100% (Normal)
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Soft-voting dampens variance from single-model weight initialization, yielding a more stable decision boundary across varying imaging contrasts.
          </p>
        </div>

        {/* Dataset & Class Balancing */}
        <div className="card space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200/90 dark:border-white/[0.08]">
            <Database size={16} className="text-blue-500" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Class Balancing &amp; Augmentation
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            To prevent majority-class bias (5,002 Stone vs. 4,414 Normal), inverse class frequency weights are computed dynamically:
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-surface-elevatedDark font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1 border border-slate-200/80 dark:border-white/[0.06]">
            <div>w_normal = 9416 / (2 &times; 4414) &asymp; 1.0666</div>
            <div>w_stone  = 9416 / (2 &times; 5002) &asymp; 0.9412</div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Data augmentation applies real-time rotations (&plusmn;20&deg;), shifts (&plusmn;20%), zooms (&plusmn;20%), flips, and brightness variation ([0.8, 1.2]) to the 80% training subset.
          </p>
        </div>
      </div>

      {/* Deployment & Pipeline Architecture */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/90 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-blue-500" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              ZeroGPU Cloud Deployment &amp; RPC Pipeline
            </h3>
          </div>
          <a
            href="https://huggingface.co/spaces/nubruuuu/kidney-stone-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
          >
            <span>Hugging Face Space</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-3 bg-slate-50 dark:bg-surface-elevatedDark rounded-xl border border-slate-200/80 dark:border-white/[0.06]">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              1. Web Client (Vercel)
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Thin Single-Page Application built with React 18 &amp; Vite. Ingests scans via drag-and-drop and dispatches binary blobs using <code className="font-mono text-blue-600 dark:text-blue-400">@gradio/client</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-surface-elevatedDark rounded-xl border border-slate-200/80 dark:border-white/[0.06]">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              2. RPC Transport Layer
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              WebSocket and HTTP long-polling protocol tunnel to <code className="font-mono text-blue-600 dark:text-blue-400">nubruuuu/kidney-stone-backend</code>, eliminating CORS and reverse-proxy overhead.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-surface-elevatedDark rounded-xl border border-slate-200/80 dark:border-white/[0.06]">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              3. Inference Engine
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Gradio Python backend executing Keras forward passes on NVIDIA A100 ZeroGPU hardware, returning verdict and confidence in ~1.8 seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Clinical Disclaimer */}
      <div className="card bg-amber-50/70 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40 p-5 shadow-subtle">
        <div className="flex items-start gap-3">
          <ShieldAlert size={22} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200">
            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300">
              Medical &amp; Research Disclaimer
            </h4>
            <p className="leading-relaxed">
              KidneyAI Pro is developed strictly for educational, scientific research, and triage assistance purposes. It is <strong>not</strong> an FDA-cleared or CE-marked medical device and must never substitute for clinical radiologist evaluation, tissue biopsy, or direct physician diagnosis.
            </p>
            <p className="leading-relaxed">
              Predictions are probabilistic outputs derived from convolutional neural network feature maps on curated benchmark datasets. Any patient exhibiting flank pain, hematuria, or renal colic symptoms should immediately seek evaluation by a qualified medical practitioner.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
