import type { ButtonColor } from "#ui/types";

import { blocks } from "~/components/editor/blocks";
import type { XYPosition } from "@vue-flow/core";

/**
 * Custom Node Config
 * @type: lower case string, no spaces "-" is allowed
 * @name: Display name of the node
 * @description: Description of the node
 * @data: State data of the node
 * @component: Vue component of the node
 */
export type CustomNodeConfig = {
  type: string;
  name: string;
  description: string;
  identifier: string;
  data: any;
};

export type CustomNodesGroup = {
  name: string;
  icon: string;
  color: ButtonColor | string;
  group_identifier: string;
  nodes: CustomNodeConfig[];
};

export class CustomNodes {
  // @ts-ignore
  static nodesList: CustomNodesGroup[] = blocks;

  static getCustomNodeConfig(type: string): CustomNodeConfig | undefined {
    return CustomNodes.nodesList
      .flatMap((group) => group.nodes)
      .find((node) => node.type === type);
  }

  static getNodeGroup(type: string): CustomNodesGroup | null {
    const node = CustomNodes.getCustomNodeConfig(type);
    if (!node) return null;
    return (
      CustomNodes.nodesList.find((group) =>
        group.nodes.some((node) => node.type === type),
      ) ?? null
    );
  }

  static getDefaultData(type: string, position: XYPosition) {
    const node = CustomNodes.getCustomNodeConfig(type);
    if (!node) return null;
    const data = {};

    for (const key in node.data) {
      if (node.data[key]["value"] !== undefined) {
        // @ts-ignore - data[key] is not a valid type
        data[key] = node.data[key]["value"];
        // continue;
      }
    }

    return {
      id: Math.random().toString(36),
      identifier: node.identifier,
      group_identifier: CustomNodes.getNodeGroup(type)?.group_identifier ?? "",
      type,
      position,
      data,
    };
  }
}
