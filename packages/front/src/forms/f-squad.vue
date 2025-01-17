<template>
  <BForm v-if="!update" class="f-squad" @submit="onSubmit" :schema="schema">
    <BInput label="Squad name" name="name" placeholder="Name" type="text" />
    <BInput label="Max rounds" name="maxRounds" :min="1" placeholder="3" type="number" />
    <BInput label="Percentual" name="percentual" :max="1" :min="0" placeholder="0.25" :step="0.1" type="number" />

    <div class="f-squad__buttons-container">
      <BButton variant="transparent" value="cancel" @click="$emit('close')" />
      <BButton class="f-squad__button" type="submit" value="create" />
    </div>
  </BForm>

  <BForm v-else class="f-squad" @submit="onSubmit" :schema="schema">
    <BInput :initial="squad.activeSquad?.name" label="Squad name" name="name" type="text" />
    <BInput :initial="squad.activeSquad?.maxRounds" label="Max rounds" name="maxRounds" :min="1" type="number" />
    <BInput :initial="squad.activeSquad?.percentual" label="Percentual" name="percentual" :max="1" :min="0"
      placeholder="0.25" :step="0.1" type="number" />

    <div class="f-squad__buttons-container">
      <BButton variant="transparent" value="cancel" @click="$emit('close')" />
      <BButton class="f-squad__button" type="submit" value="update" ref="submitButton" />
    </div>
  </BForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { squadSchemas } from '@briefly/apidef';

import BButton from '@/components/b-button.vue';
import BInput from '@/components/b-input.vue';
import BForm from '@/components/b-form.vue';
import { squadStore } from '@/stores';
import type { z } from 'zod';

const props = withDefaults(defineProps<{ update?: boolean }>(), { update: false });

const emit = defineEmits<{ (event: 'close'): void }>();

const squad = squadStore();

const submitButton = ref<HTMLButtonElement | null>(null);

const schema = props.update ? squadSchemas.updateSchemaReq : squadSchemas.createSchemaReq

async function onSubmit(data: z.infer<typeof schema>){
    if (isCreate(data, props.update)){
      await squad.addSquad(data);
    }
    else squad.updateSquad(data);
    emit('close');
}
</script>

<script lang="ts">
function isCreate(obj: squadSchemas.CreateSchemaReq | squadSchemas.UpdateSchemaReq, update: boolean): obj is squadSchemas.CreateSchemaReq{
  return !update;
}
function isUpdate(obj: squadSchemas.CreateSchemaReq | squadSchemas.UpdateSchemaReq, update: boolean): obj is squadSchemas.UpdateSchemaReq{
  return update;
}
</script>

<style lang="scss" scoped>
.f-squad {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.f-squad__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>
