import { markRaw } from "vue";

import CustomNode from "~/components/editor/nodes/CustomNode.vue";
import type {ButtonColor} from "#ui/types";

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

export type CustomNodesGroup = {
    name: string;
    icon: string;
    color: ButtonColor;
    nodes: CustomNodeConfig[];
}

export function getCustomNodeConfig(type: string): CustomNodeConfig | undefined {
    return nodesList.flatMap(group => group.nodes).find(node => node.type === type);
}

export function getColorByType(type: string): string {
    const group = nodesList.find(group => group.nodes.some(node => node.type === type));
    return group ? group.color : 'grey';
}

export const nodesList: CustomNodesGroup[]  = [
    {
        name: 'test group',
        icon: 'mdi-test-tube',
        color: 'green',
        nodes: [
            {
                type: 'custom',
                name: 'Custom Node',
                description: 'Custom Node Description while I am a tank for some reason',
                defaultData: {
                    message: 'Hello World!'
                },
                component: markRaw(CustomNode)
            }
        ]
    },
    {
        name: 'test group2',
        icon: 'mdi-test-tube',
        color: 'lime',
        nodes: [
            {
                type: 'custom',
                name: 'Custom Node',
                description: 'Custom Node Description',
                defaultData: {
                    message: 'Hello World!'
                },
                component: markRaw(CustomNode)
            }
        ]
    },
    {
        name: 'test group3',
        icon: 'mdi-cube',
        color: 'amber',
        nodes: [
            {
                type: 'custom',
                name: 'Custom Node',
                description: 'Custom Node Description',
                defaultData: {
                    message: 'Hello World!'
                },
                component: markRaw(CustomNode)
            }
        ]
    }
];