<script setup lang="ts">
import { ref, computed } from 'vue'
import hljs from 'highlight.js'
import {
  Check,
  Copy,
  Terminal,
  Code2,
  Database,
  FileCode,
  FileText,
  Braces,
  Hash,
} from 'lucide-vue-next'
import UiTooltip from '@/components/ui/UiTooltip.vue'

export interface UiCodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  copyable?: boolean
  maxHeight?: string
  wrap?: boolean
}

const props = withDefaults(defineProps<UiCodeBlockProps>(), {
  language: 'plaintext',
  filename: undefined,
  showLineNumbers: true,
  highlightLines: () => [],
  copyable: true,
  maxHeight: '480px',
  wrap: false,
})

const copied = ref(false)
let copyTimeout: ReturnType<typeof setTimeout> | null = null

// Language icon helper
const langIcon = computed(() => {
  const lang = (props.language || '').toLowerCase()
  if (['sql', 'pgsql', 'mysql', 'plsql', 'postgres', 'sqlite'].includes(lang)) {
    return Database
  }
  if (['bash', 'sh', 'zsh', 'shell', 'powershell', 'cmd'].includes(lang)) {
    return Terminal
  }
  if (['json', 'yaml', 'yml'].includes(lang)) {
    return Braces
  }
  if (['md', 'markdown'].includes(lang)) {
    return FileText
  }
  if (['c', 'cpp', 'csharp', 'cs'].includes(lang)) {
    return Hash
  }
  if (['html', 'xml', 'svg'].includes(lang)) {
    return Code2
  }
  return FileCode
})

// Display label for language
const langLabel = computed(() => {
  const lang = (props.language || '').toLowerCase()
  const map: Record<string, string> = {
    js: 'JavaScript',
    javascript: 'JavaScript',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    py: 'Python',
    python: 'Python',
    go: 'Go',
    golang: 'Go',
    rs: 'Rust',
    rust: 'Rust',
    sql: 'SQL',
    pgsql: 'PostgreSQL',
    mysql: 'MySQL',
    sqlite: 'SQLite',
    md: 'Markdown',
    markdown: 'Markdown',
    sh: 'Bash',
    bash: 'Bash',
    shell: 'Shell',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    php: 'PHP',
    java: 'Java',
    cpp: 'C++',
    cs: 'C#',
    csharp: 'C#',
    ruby: 'Ruby',
    rb: 'Ruby',
    dockerfile: 'Docker',
    graphql: 'GraphQL',
  }
  return map[lang] ?? (props.language ? props.language.toUpperCase() : 'CODE')
})

// Highlighted HTML generator
const rawLines = computed(() => {
  const code = (props.code || '').replace(/\r\n/g, '\n')
  return code.split('\n')
})

const highlightedLines = computed(() => {
  const code = (props.code || '').trimEnd()
  const lang = props.language?.toLowerCase() || 'plaintext'

  try {
    let highlighted = ''
    if (hljs.getLanguage(lang)) {
      highlighted = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    } else {
      highlighted = hljs.highlightAuto(code).value
    }

    return highlighted.split('\n')
  } catch {
    // Fallback escaped text
    return rawLines.value.map((line) =>
      line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    )
  }
})

function copyCode() {
  if (!navigator.clipboard) return
  navigator.clipboard.writeText(props.code)
  copied.value = true

  if (copyTimeout) clearTimeout(copyTimeout)
  copyTimeout = setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-box border border-[var(--border)] bg-[#13171f] text-slate-100 shadow-lg font-mono text-xs">
    <!-- Codeblock Header Bar -->
    <div class="flex items-center justify-between border-b border-white/10 bg-[#0d1017] px-4 py-2.5">
      <!-- Left: Mac-style Window Dots & Filename / Language -->
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex items-center gap-1.5 shrink-0 select-none">
          <div class="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors" />
          <div class="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors" />
          <div class="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors" />
        </div>

        <div class="flex items-center gap-2 truncate text-slate-300">
          <component :is="langIcon" class="h-3.5 w-3.5 text-primary shrink-0" />
          <span v-if="filename" class="font-semibold text-slate-200 truncate">
            {{ filename }}
          </span>
          <span v-else class="text-[11px] font-medium tracking-wide uppercase text-slate-400">
            {{ langLabel }}
          </span>
        </div>
      </div>

      <!-- Right: Language Tag & Copy Action -->
      <div class="flex items-center gap-2 shrink-0">
        <span
          v-if="filename"
          class="hidden sm:inline-block rounded px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-white/5 text-slate-400 border border-white/5"
        >
          {{ langLabel }}
        </span>

        <UiTooltip v-if="copyable" :text="copied ? 'Tersalin!' : 'Salin Kode'" position="top">
          <button
            type="button"
            class="btn btn-ghost btn-xs h-7 px-2 gap-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-btn transition-all"
            :class="copied ? 'text-success hover:text-success' : ''"
            :aria-label="copied ? 'Tersalin' : 'Salin Kode'"
            @click="copyCode"
          >
            <Check v-if="copied" class="h-3.5 w-3.5 text-success" />
            <Copy v-else class="h-3.5 w-3.5" />
            <span class="text-[11px] hidden sm:inline">{{ copied ? 'Tersalin' : 'Salin' }}</span>
          </button>
        </UiTooltip>
      </div>
    </div>

    <!-- Code Content Container with Line Numbers -->
    <div
      class="overflow-auto scrollbar-thin select-text py-3"
      :style="{ maxHeight: maxHeight }"
    >
      <table class="w-full border-collapse font-mono text-[12px] leading-[1.6]">
        <tbody>
          <tr
            v-for="(lineHtml, idx) in highlightedLines"
            :key="idx"
            class="transition-colors group hover:bg-white/[0.04]"
            :class="highlightLines.includes(idx + 1) ? 'bg-primary/15 border-l-2 border-primary' : ''"
          >
            <!-- Line Numbers Column -->
            <td
              v-if="showLineNumbers"
              class="w-[1%] select-none px-3.5 text-right font-mono text-slate-500/70 group-hover:text-slate-400 align-top tabular-nums text-[11px]"
            >
              {{ idx + 1 }}
            </td>

            <!-- Line Code Column -->
            <td
              class="px-3 pr-5 align-top"
              :class="wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'"
              v-html="lineHtml || '&nbsp;'"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* Clean & Vibrant Dark Syntax Theme tokens for highlight.js */
.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #ff7b72;
  font-weight: 600;
}

.hljs-string,
.hljs-title,
.hljs-section,
.hljs-attribute,
.hljs-literal,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-addition {
  color: #a5d6ff;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #8b949e;
  font-style: italic;
}

.hljs-number,
.hljs-regexp,
.hljs-link {
  color: #79c0ff;
}

.hljs-variable,
.hljs-symbol,
.hljs-bullet {
  color: #ffa657;
}

.hljs-function,
.hljs-title.function_ {
  color: #d2a8ff;
}

.hljs-built_in,
.hljs-class .hljs-title {
  color: #ffa657;
}

.hljs-attr {
  color: #7ee787;
}

.hljs-tag,
.hljs-name {
  color: #7ee787;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
</style>
