import useMedia from './useMedia';

// This hook should be used inside of the bootstyle components, so that we are
// able to pass a function as style to the component that can then be resolved
// with style(elementState).
function useElementState() {
  const media = useMedia();

  // TODO: Get hover, focus and active state.
  // Ref: https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/Pressable/index.js
  return {
    hover: false,
    focus: false,
    active: false,
    media,
  };
}

export default useElementState;
