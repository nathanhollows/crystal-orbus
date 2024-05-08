<script setup lang="ts">
import GroupTimetable from '@/components/GroupTimetable.vue'
import { type BusStopGroupData } from '@/types/BusStopGroupData'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import ClipboardJS from 'clipboard'
import { onUnmounted, ref } from 'vue'

// Define props
const props = defineProps<{ group: BusStopGroupData }>()

const uniqueId = ref(`copy-${Math.random().toString(36).substring(2, 11)}`)
const isCopied = ref(false) // Ref to manage the "copied" class state

function createUrl() {
  // Set base URL to the current location
  const baseUrl = window.location.href.split('/').slice(0, 3).join('/') + '/routes'
  const urlSlug = props.group.name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-*|-*$/g, '')
  const stopsSlug = props.group.stops.join('-')
  return `${baseUrl}/${urlSlug}/stops/${stopsSlug}`
}

const clipboard = new ClipboardJS(`#${uniqueId.value}`, {
  text: () => {
    return createUrl()
  }
})

clipboard.on('success', () => {
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 3000)
})

onUnmounted(() => {
  clipboard.destroy()
})
</script>

<template>
  <div class="flex flex-col gap-6 my-12 md:rounded-xl bg-white py-3 md:shadow-lg">
    <div class="px-3">
      <div class="mb-3 flex gap-1 justify-between">
        <h2 class="text-xl font-bold">{{ props.group.name }}</h2>
        <button
          :id="uniqueId"
          :class="[
            'copy',
            'bg-slate-100',
            'transition-all',
            'hover:bg-slate-200',
            'text-sm',
            'rounded-full',
            'py-2',
            'px-4',
            'flex',
            'items-center',
            'gap-2',
            isCopied ? 'copied' : ''
          ]"
        >
          Copy link
          <CopyIcon class="w-4 h-4" />
          <CheckIcon class="w-4 h-4" />
        </button>
      </div>
      <div class="flex gap-1">
        <a
          v-for="stop in props.group.data"
          :key="stop.stop.id"
          :href="'https://orc.mattersoft.fi/timetable/#?stop=' + stop.stop.id"
          target="_blank"
        >
          <span
            class="inline-block bg-blue-200 `text-blue-800 text-xs px-2 rounded-full font-semibold tracking-wide"
            >{{ stop.stop.name }}</span
          >
        </a>
      </div>
    </div>
    <GroupTimetable :data="props.group.data" />
  </div>
</template>

<style scoped>
.copy .lucide-check-icon {
  display: none;
}
.copy .lucide-copy-icon {
  display: block;
}
.copy.copied .lucide-check-icon {
  display: block;
}
.copy.copied .lucide-copy-icon {
  display: none;
}
</style>
