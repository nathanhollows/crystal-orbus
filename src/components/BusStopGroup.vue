<template>
  <div class="flex flex-col gap-6 my-12 md:rounded-xl bg-white pb-3 pt-5 md:shadow-2xl">
    <div class="px-3">
      <div class="mb-3 flex gap-1 justify-between">
        <h2 class="text-xl font-bold">{{ props.group.name }}</h2>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 flex flex-center items-center gap-2 bg-slate-100 transition-all hover:bg-slate-300 text-sm rounded-full"
            v-on:click="saveGroup"
            v-if="!savedGroup"
          >
            Save
            <BookmarkPlusIcon class="w-4 h-4" />
          </button>
          <button
            :id="uniqueId"
            :class="[
              'copy',
              'bg-slate-100',
              'transition-all',
              'hover:bg-slate-300',
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
            {{ isCopied ? 'Copied!' : 'Copy URL' }}
            <CopyIcon class="w-4 h-4" />
            <CheckIcon class="w-4 h-4" />
          </button>
          <button
            class="px-4 py-2 flex flex-center items-center gap-2 bg-slate-100 transition-all hover:bg-slate-300 text-rose-700 text-sm rounded-full"
            v-if="savedGroup"
            v-on:click="deleteGroup"
          >
            <DeleteIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="flex gap-1">
        <a v-if="props.group.data.length === 0">
          <div
            class="animate-pulse inline-block bg-gray-300 w-28 text-xs px-2 rounded-full font-semibold tracking-wide"
          >
            &nbsp;
          </div>
        </a>
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

<script setup lang="ts">
import GroupTimetable from '@/components/GroupTimetable.vue'
import { type BusStopGroupData } from '@/types/BusStopData'
import { CheckIcon, CopyIcon, BookmarkPlusIcon, DeleteIcon } from 'lucide-vue-next'
import ClipboardJS from 'clipboard'
import { onUnmounted, ref } from 'vue'
import { useBusStopStore } from '@/stores/BusStopStore'

const props = defineProps<{ group: BusStopGroupData }>()
const store = useBusStopStore()

const uniqueId = `copy-${Math.random().toString(36).substring(2, 11)}`
const isCopied = ref(false)
const savedGroup = ref(false)

function createUrl(): string {
  const baseUrl = window.location.origin + '/timetable'
  const urlSlug = props.group.name.replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '')
  const stopsSlug = props.group.stops.join('-')
  return `${baseUrl}/${urlSlug}/stops/${stopsSlug}`
}

const clipboard = new ClipboardJS(`#${uniqueId}`, {
  text: createUrl
})

clipboard.on('success', () => {
  isCopied.value = true
  setTimeout(() => (isCopied.value = false), 3000)
})

clipboard.on('error', () => {
  alert('Failed to copy URL.')
})

onUnmounted(() => {
  clipboard.destroy()
})

savedGroup.value = store.isGroupInStore(props.group)
function saveGroup() {
  store.addGroup(props.group)
  savedGroup.value = store.isGroupInStore(props.group)
}

function deleteGroup() {
  // check if the user really wants to delete the group
  if (!confirm('Are you sure you want to delete this group?')) {
    return
  }
  store.removeGroup(props.group)
  savedGroup.value = store.isGroupInStore(props.group)
}
</script>
