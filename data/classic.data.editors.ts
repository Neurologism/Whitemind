import NodeStringEditor from '~/components/project/customNode/typeEditors/editors/NodeStringEditor.vue';
import NodeBoolEditor from '~/components/project/customNode/typeEditors/editors/NodeBoolEditor.vue';
import NodeSelectEditor from '~/components/project/customNode/typeEditors/editors/NodeSelectEditor.vue';
import NodeFloatEditor from '~/components/project/customNode/typeEditors/editors/NodeFloatEditor.vue';
import NodeIntEditor from '~/components/project/customNode/typeEditors/editors/NodeIntEditor.vue';
import NodeTupleEditor from '~/components/project/customNode/typeEditors/editors/NodeTupleEditor.vue';
import NodeMultiselectEditor from '~/components/project/customNode/typeEditors/editors/NodeMultiselectEditor.vue';
import NodeRangeEditor from '~/components/project/customNode/typeEditors/editors/NodeRangeEditor.vue';
import NodeNestedEditor from '~/components/project/customNode/typeEditors/editors/NodeNestedEditor.vue';

export const nodeDataEditors = {
  string: NodeStringEditor,
  boolean: NodeBoolEditor,
  select: NodeSelectEditor,
  float: NodeFloatEditor,
  int: NodeIntEditor,
  tuple: NodeTupleEditor,
  multiselect: NodeMultiselectEditor,
  range: NodeRangeEditor,
  nested: NodeNestedEditor,
} as Record<string, Component>;
