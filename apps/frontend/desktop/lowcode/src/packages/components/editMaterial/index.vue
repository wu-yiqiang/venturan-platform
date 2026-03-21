<script setup lang="ts">
import { Film, TrendCharts } from '@element-plus/icons-vue';
import CommonComponents from '@/packages/components/CommonComponents/index.vue'
import CustomComponents from '@/packages/components/CustomComponents/index.vue'
import { ref } from 'vue';
const value = defineModel()
enum ComponentTypeEnum {
    Common = 'Common',
    Custom = 'Custom',
    Chart= 'Chart',
    Other = 'Other'
}
const type = ref(ComponentTypeEnum.Common)
</script>

<template>
    <section class="EditMaterial">
        <div class="editCategory">
            <el-radio-group v-model="type" size="large">
                <el-radio-button :value="ComponentTypeEnum.Common">
                    <el-tooltip effect="light" content="通用组件" placement="top">
                        <el-icon :size="16">
                            <Film />
                        </el-icon>
                    </el-tooltip>
                </el-radio-button>
                <el-radio-button :value="ComponentTypeEnum.Custom">
                     <el-tooltip effect="light" content="定制组件" placement="top">
                        <el-icon :size="16">
                            <TrendCharts />
                        </el-icon>
                    </el-tooltip>
                </el-radio-button>
                <el-radio-button :value="ComponentTypeEnum.Chart">
                     <el-tooltip effect="light" content="图表组件" placement="top">
                        <el-icon :size="16">
                            <TrendCharts />
                        </el-icon>
                    </el-tooltip>
                </el-radio-button>
                <el-radio-button :value="ComponentTypeEnum.Other">
                     <el-tooltip effect="light" content="其他组件" placement="top">
                        <el-icon :size="16">
                            <TrendCharts />
                        </el-icon>
                    </el-tooltip>
                </el-radio-button>
                <el-radio-button :value="ComponentTypeEnum.Other">
                     <el-tooltip effect="light" content="其他组件" placement="top">
                        <el-icon :size="16">
                            <TrendCharts />
                        </el-icon>
                    </el-tooltip>
                </el-radio-button>
            </el-radio-group>
        </div>
        <div class="editContent">
            <CommonComponents v-if="type === ComponentTypeEnum.Common" v-model="value" />
            <CustomComponents v-if="type === ComponentTypeEnum.Custom" />
        </div>
    </section>
</template>

<style scoped lang="scss">
.EditMaterial {
    width: 270px;
    height: inherit;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 14px;
    border-radius: 4px;
    .editCategory {
        position: sticky;
        background-color: #fff;
    }

    .editContent {
        overflow: auto;
        .component-item {
            display: grid;
            place-content: center;
            cursor: move;
            user-select: none;
            padding: 10px;
            height: fit-content;
            background-color: #dedede;
        }
    }
}
</style>
