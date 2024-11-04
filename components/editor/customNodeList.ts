import { markRaw } from "vue";

import CustomNode from "~/components/editor/nodes/CustomNode.vue";

/**
 * Custom Node Config
 * @type: lower case string, no spaces
 * @name: Display name of the node
 * @description: Description of the node
 * @data: State data of the node
 * @component: Vue component of the node
 */
export type CustomNodeConfig = {
    type: string;
    name: string;
    description: string;
    defaultData: any;
    component: Component;
}

export const nodesList: CustomNodeConfig[]  = [
    {
        type: 'custom',
        name: 'Custom Node',
        description: 'Custom Node Description',
        defaultData: {
            message: 'Hello World!'
        },
        component: markRaw(CustomNode)
    }
];