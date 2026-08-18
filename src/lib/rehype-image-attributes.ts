interface HastNode {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

export function rehypeImageAttributes() {
  return (tree: HastNode): void => {
    const visit = (node: HastNode): void => {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties = {
          ...node.properties,
          loading: 'lazy',
          decoding: 'async',
        };
      }
      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
