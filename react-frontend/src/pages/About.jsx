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
      desc: 'Initial spatial edge and texture feature extraction from renal ultrasound/CT'
    },
    {
      block: 'Block 2',
      layers: 'Conv2D (64 filters, 3×3) + ReLU + MaxPool (2×2)',
      output: '56 × 56 × 64',
      desc: 'Intermediate acoustic density and boundary gradient representations'
    },
    {
      block: 'Block 3',
      layers: 'Conv2D (128 filters, 3×3) + ReLU + MaxPool (2×2)',
      output: '28 × 28 × 128',
      desc: 'High-level parenchymal architecture and calyx structure mapping'
    },
    {
      block: 'Block 4',
      layers: 'Conv2D (128 filters, 3×3) + ReLU + MaxPool (2×2)',
      output: '14 × 14 × 128',
      desc: 'Final convolutional feature map (targeted by Grad-CAM explainability)'
    },
    {
      block: 'Classifier Head',
      layers: 'GlobalAveragePooling2D + Dense (512, Dropout 0.5) + Dense (256, Dropout 0.3) + Dense (1, Sigmoid)',
      output: 'Scalar Probability [0.0, 1.0]',
      desc: 'Dense classification head mapping pooled features to binary calculus probability'
    }
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-sky-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-sky-100 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="badge-primary">System Architecture</span>
          <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
            Verified Codebase Specifications
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark">
          Technical Architecture &amp; Model Specifications
        </h2>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-1 max-w-3xl leading-relaxed">
          KidneyAI Pro is an end-to-end computer-aided detection (CAD) platform designed for automated binary classification of renal scan images (Normal vs. Nephrolithiasis), combining a dual-model CNN ensemble, Grad-CAM explainability, and serverless cloud inference.
        </p>
      </div>

      {/* 4 Pillars Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-primary flex items-center justify-center mb-3 border border-sky-100 dark:border-sky-900/40">
            <Cpu size={20} />
          </div>
          <h4 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
            Dual-Model CNN
          </h4>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1 leading-relaxed">
            Two independently trained 4-block Conv2D Sequential checkpoints evaluated in parallel.
          </p>
        </div>

        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-secondary flex items-center justify-center mb-3 border border-emerald-100 dark:border-emerald-900/40">
            <Database size={20} />
          </div>
          <h4 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
            9,416 Curated Scans
          </h4>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1 leading-relaxed">
            4,414 normal kidneys &amp; 5,002 verified nephrolithiasis scans with 80/20 train/validation split.
          </p>
        </div>

        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 border border-indigo-100 dark:border-indigo-900/40">
            <Zap size={20} />
          </div>
          <h4 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
            ZeroGPU Serverless
          </h4>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1 leading-relaxed">
            Hosted on Hugging Face Spaces with dynamic GPU leasing and WebSocket RPC client tunneling.
          </p>
        </div>

        <div className="card p-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 border border-amber-100 dark:border-amber-900/40">
            <Eye size={20} />
          </div>
          <h4 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
            Grad-CAM Module
          </h4>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1 leading-relaxed">
            Gradient-weighted Class Activation Mapping to localize hyperechoic foci &amp; acoustic shadows.
          </p>
        </div>
      </div>

      {/* Model Architecture Deep-Dive */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-color dark:border-border-color-dark">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            <h3 className="font-semibold text-sm uppercase tracking-wider text-text-primary dark:text-text-primary-dark">
              Custom Sequential CNN Architecture
            </h3>
          </div>
          <span className="badge-neutral text-[10px] font-mono">
            training/simple_train.py
          </span>
        </div>

        <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
          Both model checkpoints (<code className="font-mono text-primary">final_efficientnet_model.h5</code> and <code className="font-mono text-primary">final_resnet50_model.h5</code>) share the identical custom 4-block Conv2D Sequential architecture below, trained under independent random weight initializations with Adam optimization and binary cross-entropy loss:
        </p>

        <div className="space-y-2.5">
          {cnnBlocks.map((b, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-border-color dark:border-border-color-dark flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{b.block}</span>
                  <span className="text-xs font-mono text-text-primary dark:text-text-primary-dark font-medium">{b.layers}</span>
                </div>
                <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark">
                  {b.desc}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
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
          <div className="flex items-center gap-2 pb-2 border-b border-border-color dark:border-border-color-dark">
            <GitBranch size={16} className="text-secondary" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-text-primary dark:text-text-primary-dark">
              Soft-Vote Consensus Rule
            </h3>
          </div>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
            During inference, predictions from both loaded checkpoints are collected as posterior probabilities and averaged:
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
            <div>p_avg = (p_model1 + p_model2) / 2</div>
            <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
              Decision Rule: If p_avg &gt; 0.50 &rarr; "Stone", Else &rarr; "Normal"
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-[11px]">
              Confidence: p_avg &times; 100% (Stone) or (1 - p_avg) &times; 100% (Normal)
            </div>
          </div>
          <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark">
            Soft-voting dampens variance from single-model weight initialization, yielding a more stable decision boundary across varying imaging contrasts.
          </p>
        </div>

        {/* Dataset & Class Balancing */}
        <div className="card space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-border-color dark:border-border-color-dark">
            <Database size={16} className="text-primary" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-text-primary dark:text-text-primary-dark">
              Class Balancing &amp; Augmentation
            </h3>
          </div>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
            To prevent majority-class bias (5,002 Stone vs. 4,414 Normal), inverse class frequency weights are computed dynamically:
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
            <div>w_normal = 9416 / (2 &times; 4414) &asymp; 1.0666</div>
            <div>w_stone  = 9416 / (2 &times; 5002) &asymp; 0.9412</div>
          </div>
          <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark">
            Data augmentation applies real-time rotations (&plusmn;20&deg;), shifts (&plusmn;20%), zooms (&plusmn;20%), flips, and brightness variation ([0.8, 1.2]) to the 80% training subset.
          </p>
        </div>
      </div>

      {/* Deployment & Pipeline Architecture */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-border-color dark:border-border-color-dark">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-text-primary dark:text-text-primary-dark">
              ZeroGPU Cloud Deployment &amp; RPC Pipeline
            </h3>
          </div>
          <a
            href="https://huggingface.co/spaces/nubruuuu/kidney-stone-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <span>Hugging Face Space</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-border-color dark:border-border-color-dark">
            <span className="font-bold text-text-primary dark:text-text-primary-dark block mb-1">
              1. Web Client (Vercel)
            </span>
            <p className="text-text-secondary dark:text-text-secondary-dark text-[11px] leading-relaxed">
              Thin Single-Page Application built with React 18 &amp; Vite. Ingests scans via drag-and-drop and dispatches binary blobs using <code className="font-mono text-primary">@gradio/client</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-border-color dark:border-border-color-dark">
            <span className="font-bold text-text-primary dark:text-text-primary-dark block mb-1">
              2. RPC Transport Layer
            </span>
            <p className="text-text-secondary dark:text-text-secondary-dark text-[11px] leading-relaxed">
              WebSocket and HTTP long-polling protocol tunnel to <code className="font-mono text-primary">nubruuuu/kidney-stone-backend</code>, eliminating CORS and reverse-proxy overhead.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-border-color dark:border-border-color-dark">
            <span className="font-bold text-text-primary dark:text-text-primary-dark block mb-1">
              3. Inference Engine
            </span>
            <p className="text-text-secondary dark:text-text-secondary-dark text-[11px] leading-relaxed">
              Gradio Python backend executing Keras forward passes on NVIDIA A100 ZeroGPU hardware, returning verdict and confidence in ~1.8 seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Clinical Disclaimer */}
      <div className="card bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 p-5">
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
