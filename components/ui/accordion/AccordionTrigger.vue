<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-vue-next";
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  AccordionTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 px-2 items-center justify-between  font-medium transition-all group-hover:text-[#111111] [&[data-state=open]>svg]:rotate-180',
          props.class
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDown
          class="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:text-[#111111] text-[#978667]"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
