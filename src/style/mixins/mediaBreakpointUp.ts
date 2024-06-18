import type { StyleScope } from '../createStyle';
import type { InteractionState, Viewport } from '../../types';

const mediaBreakpointUp = {
  include() {
    return true;
  },
  apply(scope: StyleScope, { media }: InteractionState) {
    return media.up(scope.args[0] as Viewport);
  },
};

export default mediaBreakpointUp;
