<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

interface Props {
  name: string
  label: string
  type?: string
  step?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  step: undefined,
  placeholder: '',
})
</script>

<template>
  <div>
    <label class="text-sm mb-1 block">{{ label }}</label>
    <div class="relative">
      <Field
        :name="props.name"
        :type="props.type"
        :step="props.step"
        :placeholder="props.placeholder"
        class="h-10 w-full rounded-md border border-input bg-background px-3"
      />
      <ErrorMessage :name="props.name" class="mt-1 block text-xs md:text-sm text-primary leading-normal" />
    </div>
  </div>
</template>
