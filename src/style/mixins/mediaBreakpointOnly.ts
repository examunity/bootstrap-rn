import type { StyleScope } from '../transform';
import type { InteractionState, Viewport } from '../../types';

const mediaBreakpointUp = {
  include() {
    return true;
  },
  apply(scope: StyleScope, { media }: InteractionState) {
    return (
      media.up(scope.args[0] as Viewport) &&
      media.down(scope.args[0] as Viewport)
    );
  },
};

export default mediaBreakpointUp;
