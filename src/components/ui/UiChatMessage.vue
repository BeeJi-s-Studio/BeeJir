<script setup lang="ts">
import { computed } from 'vue'
import UiAvatar, { type AvatarSize, type AvatarStatus } from '@/components/ui/UiAvatar.vue'
import { Check, CheckCheck } from 'lucide-vue-next'

export type MessageRole = 'user' | 'assistant' | 'system'
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read'

export interface MessageAuthor {
  name: string
  avatar?: string
  status?: AvatarStatus
  initials?: string
}

export interface UiChatMessageProps {
  role?: MessageRole
  content?: string
  author?: MessageAuthor
  timestamp?: string
  status?: MessageStatus
  avatarSize?: AvatarSize
  align?: 'auto' | 'left' | 'right'
}

const props = withDefaults(defineProps<UiChatMessageProps>(), {
  role: 'user',
  content: '',
  author: undefined,
  timestamp: undefined,
  status: undefined,
  avatarSize: 'sm',
  align: 'auto',
})

const isRightAligned = computed(() => {
  if (props.align === 'right') return true
  if (props.align === 'left') return false
  return props.role === 'user'
})

const bubbleVariantClasses = computed(() => {
  if (props.role === 'system') {
    return 'bg-base-200/80 text-base-content/70 border border-base-300 text-center text-xs mx-auto rounded-box p-3'
  }
  if (isRightAligned.value) {
    return 'bg-primary text-primary-content rounded-box rounded-br-xs shadow-xs'
  }
  // Assistant / Peer bubble
  return 'bg-[var(--surface-raised)] text-base-content border border-[var(--border)] rounded-box rounded-bl-xs shadow-xs'
})
</script>

<template>
  <!-- System Message Layout -->
  <div v-if="role === 'system'" class="w-full flex justify-center py-2 select-none">
    <div :class="bubbleVariantClasses" class="max-w-md">
      <slot>{{ content }}</slot>
    </div>
  </div>

  <div
    v-else
    class="flex gap-2.5 max-w-full group"
    :class="isRightAligned ? 'flex-row-reverse justify-start' : 'flex-row justify-start'"
  >
    <!-- Avatar (when author exists or slot provided) -->
    <div class="shrink-0 mt-0.5">
      <slot name="avatar">
        <UiAvatar
          v-if="author"
          :src="author.avatar"
          :name="author.name"
          :status="author.status"
          :size="avatarSize"
          :variant="isRightAligned ? 'primary' : 'neutral'"
        />
      </slot>
    </div>

    <!-- Message Body Container -->
    <div
      class="flex flex-col min-w-0 max-w-[85%] sm:max-w-[75%]"
      :class="isRightAligned ? 'items-end' : 'items-start'"
    >
      <!-- Author Name & Timestamp Header -->
      <div
        v-if="author?.name || timestamp"
        class="flex items-center gap-2 mb-1 px-1 text-[11px] text-base-content/50"
      >
        <span v-if="author?.name" class="font-medium text-base-content/80">
          {{ author.name }}
        </span>
        <span v-if="timestamp" class="tabular-nums">
          {{ timestamp }}
        </span>
      </div>

      <!-- Message Bubble -->
      <div
        class="px-4 py-2.5 text-sm leading-relaxed break-words whitespace-pre-wrap"
        :class="bubbleVariantClasses"
      >
        <slot>{{ content }}</slot>
      </div>

      <!-- Footer Info (Status checkmarks / Actions) -->
      <div
        v-if="status || $slots.footer"
        class="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-base-content/40"
      >
        <slot name="footer">
          <span v-if="status === 'sending'" class="italic">Mengirim...</span>
          <span v-else-if="status === 'sent'" title="Terkirim">
            <Check class="h-3 w-3" />
          </span>
          <span v-else-if="status === 'delivered'" title="Tersampaikan">
            <CheckCheck class="h-3 w-3 text-base-content/60" />
          </span>
          <span v-else-if="status === 'read'" title="Dibaca">
            <CheckCheck class="h-3 w-3 text-primary" />
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>
