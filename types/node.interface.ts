declare module '@vue-flow/core' {
  interface Node {
    identifier?: string;
    group_identifier?: string;
    // data?: something // this will be needed when upgrading to the next major release of vue flow (>=2.0.0)
  }
}
