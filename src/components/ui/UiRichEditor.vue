<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  RotateCcw,
  Eraser,
  FileCode,
} from 'lucide-vue-next'

export interface UiRichEditorProps {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  minHeight?: string
}

const props = withDefaults(defineProps<UiRichEditorProps>(), {
  modelValue: '',
  label: undefined,
  placeholder: 'Mulai menulis konten di sini...',
  hint: undefined,
  minHeight: '180px',
})

const emit = defineEmits<{
  'update:modelValue': [html: string]
}>()

const editorRef = ref<HTMLElement | null>(null)
const showSourceCode = ref(false)
const rawHtml = ref(props.modelValue)

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    rawHtml.value = newVal
    if (editorRef.value && editorRef.value.innerHTML !== newVal) {
      editorRef.value.innerHTML = newVal
    }
  }
)

function syncFromEditor() {
  if (!editorRef.value) return
  const html = editorRef.value.innerHTML
  rawHtml.value = html
  emit('update:modelValue', html)
}

function syncFromTextarea() {
  emit('update:modelValue', rawHtml.value)
  if (editorRef.value) {
    editorRef.value.innerHTML = rawHtml.value
  }
}

function exec(command: string, value?: string) {
  if (showSourceCode.value) return
  editorRef.value?.focus()
  document.execCommand(command, false, value)
  syncFromEditor()
}

function insertLink() {
  if (showSourceCode.value) return
  const url = window.prompt('Masukkan URL tautan:', 'https://')
  if (url && url !== 'https://') {
    exec('createLink', url)
  }
}

function toggleSource() {
  showSourceCode.value = !showSourceCode.value
  if (!showSourceCode.value && editorRef.value) {
    editorRef.value.innerHTML = rawHtml.value
  }
}

const plainText = computed(() => {
  return rawHtml.value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
})

const wordCount = computed(() => {
  if (!plainText.value) return 0
  return plainText.value.split(' ').filter(Boolean).length
})

const charCount = computed(() => plainText.value.length)
</script>

<template>
  <div class="w-full space-y-1.5">
    <div v-if="label" class="flex items-center justify-between">
      <span class="text-xs font-semibold text-base-content/80">{{ label }}</span>
      <span class="badge badge-xs badge-soft badge-secondary font-mono">WYSIWYG Editor</span>
    </div>

    <div class="rounded-box border border-base-300/95 dark:border-white/15 bg-base-200/50 dark:bg-base-200/90 overflow-hidden shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.07)] focus-within:border-primary focus-within:bg-base-100 focus-within:ring-4 focus-within:ring-primary/15 dark:focus-within:ring-primary/25 dark:focus-within:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25),0_0_20px_-2px_rgb(var(--p)/0.4)] transition-all">
      <!-- Formatting Toolbar -->
      <div class="flex flex-wrap items-center gap-1 border-b border-base-300/80 dark:border-white/10 bg-base-200/75 dark:bg-base-300/60 p-2 select-none">
        <!-- Text Style Group -->
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Tebal (Bold)"
          @mousedown.prevent="exec('bold')"
        >
          <Bold class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Miring (Italic)"
          @mousedown.prevent="exec('italic')"
        >
          <Italic class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Garis Bawah (Underline)"
          @mousedown.prevent="exec('underline')"
        >
          <Underline class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Coret (Strikethrough)"
          @mousedown.prevent="exec('strikeThrough')"
        >
          <Strikethrough class="h-3.5 w-3.5" />
        </button>

        <div class="h-4 w-px bg-base-300 mx-1" />

        <!-- Headings & Blocks -->
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Judul H2"
          @mousedown.prevent="exec('formatBlock', 'H2')"
        >
          <Heading2 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Subjudul H3"
          @mousedown.prevent="exec('formatBlock', 'H3')"
        >
          <Heading3 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Kutipan (Blockquote)"
          @mousedown.prevent="exec('formatBlock', 'BLOCKQUOTE')"
        >
          <Quote class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Blok Kode"
          @mousedown.prevent="exec('formatBlock', 'PRE')"
        >
          <Code class="h-3.5 w-3.5" />
        </button>

        <div class="h-4 w-px bg-base-300 mx-1" />

        <!-- Lists -->
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Daftar Poin (Bullet List)"
          @mousedown.prevent="exec('insertUnorderedList')"
        >
          <List class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Daftar Angka (Numbered List)"
          @mousedown.prevent="exec('insertOrderedList')"
        >
          <ListOrdered class="h-3.5 w-3.5" />
        </button>

        <div class="h-4 w-px bg-base-300 mx-1" />

        <!-- Alignment -->
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Rata Kiri"
          @mousedown.prevent="exec('justifyLeft')"
        >
          <AlignLeft class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Rata Tengah"
          @mousedown.prevent="exec('justifyCenter')"
        >
          <AlignCenter class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Rata Kanan"
          @mousedown.prevent="exec('justifyRight')"
        >
          <AlignRight class="h-3.5 w-3.5" />
        </button>

        <div class="h-4 w-px bg-base-300 mx-1" />

        <!-- Link, Undo & Clear -->
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Sisipkan Tautan"
          @mousedown.prevent="insertLink"
        >
          <LinkIcon class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Batalkan (Undo)"
          @mousedown.prevent="exec('undo')"
        >
          <RotateCcw class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-xs h-7 w-7 p-0"
          title="Bersihkan Format"
          @mousedown.prevent="exec('removeFormat')"
        >
          <Eraser class="h-3.5 w-3.5" />
        </button>

        <!-- Right: Source Code Toggle -->
        <div class="ml-auto">
          <button
            type="button"
            class="btn btn-xs gap-1"
            :class="showSourceCode ? 'btn-primary' : 'btn-ghost'"
            title="Lihat / Edit Kode HTML"
            @click="toggleSource"
          >
            <FileCode class="h-3.5 w-3.5" />
            <span class="text-[10px]">HTML</span>
          </button>
        </div>
      </div>

      <!-- Editable Visual Area -->
      <div
        v-show="!showSourceCode"
        ref="editorRef"
        contenteditable="true"
        class="rich-editor-content p-4 text-sm text-base-content focus:outline-none leading-relaxed overflow-y-auto"
        :style="{ minHeight }"
        :data-placeholder="placeholder"
        @input="syncFromEditor"
      />

      <!-- Raw HTML Source Area -->
      <textarea
        v-if="showSourceCode"
        v-model="rawHtml"
        class="w-full p-4 font-mono text-xs bg-base-200/40 text-primary focus:outline-none resize-y"
        :style="{ minHeight }"
        @input="syncFromTextarea"
      />

      <!-- Editor Footer Stats -->
      <div class="flex items-center justify-between px-3.5 py-2 border-t border-base-300/70 bg-base-200/30 text-[11px] text-base-content/55">
        <span>Mode: <strong class="text-base-content">{{ showSourceCode ? 'HTML Source' : 'Visual WYSIWYG' }}</strong></span>
        <div class="flex items-center gap-3 font-mono">
          <span>{{ wordCount }} kata</span>
          <span>•</span>
          <span>{{ charCount }} karakter</span>
        </div>
      </div>
    </div>

    <span v-if="hint" class="block text-[11px] text-base-content/60">
      {{ hint }}
    </span>
  </div>
</template>

<style scoped>
.rich-editor-content:empty:before {
  content: attr(data-placeholder);
  color: rgb(var(--bc) / 0.35);
  pointer-events: none;
}
.rich-editor-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 800;
  margin-top: 0.5rem;
  margin-bottom: 0.35rem;
}
.rich-editor-content :deep(h3) {
  font-size: 1.05rem;
  font-weight: 700;
  margin-top: 0.4rem;
  margin-bottom: 0.25rem;
}
.rich-editor-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.35rem 0;
}
.rich-editor-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.35rem 0;
}
.rich-editor-content :deep(blockquote) {
  border-left: 3px solid rgb(var(--p));
  padding-left: 0.85rem;
  margin: 0.5rem 0;
  font-style: italic;
  color: rgb(var(--bc) / 0.75);
}
.rich-editor-content :deep(pre) {
  background: rgb(var(--b2));
  padding: 0.65rem;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.8rem;
  margin: 0.5rem 0;
}
.rich-editor-content :deep(a) {
  color: rgb(var(--p));
  text-decoration: underline;
}
</style>
