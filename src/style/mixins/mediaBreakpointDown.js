const mediaBreakpointUp = {
  include() {
    return true;
  },
  apply(scope, { media }) {
    return media.down(scope.args[0]);
  },
};

export default mediaBreakpointUp;
