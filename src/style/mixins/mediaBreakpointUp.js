const mediaBreakpointUp = {
  include() {
    return true;
  },
  apply(scope, { media }) {
    return media.up(scope.args[0]);
  },
};

export default mediaBreakpointUp;
