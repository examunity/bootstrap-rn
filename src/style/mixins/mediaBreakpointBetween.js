const mediaBreakpointUp = {
  include() {
    return true;
  },
  apply(scope, { media }) {
    return media.up(scope.args[0]) && media.down(scope.args[1]);
  },
};

export default mediaBreakpointUp;
