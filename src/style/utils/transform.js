import transformCss from 'css-to-react-native';
import camelize from 'camelize';
import parse from './parse';

// We'll not transform the following styles, because they are considered as web
// only. There is no real equivalent in native.
// See https://github.com/necolas/react-native-web/issues/44.
const webRuleNames = ['box-shadow'];

const transformRules = (content) => {
  const webRules = {};

  const rules = content
    .split(';')
    .slice(0, -1)
    // Split text content into rules.
    .map((string) => {
      const rule = string.split(':', 2);

      return rule.map((item) => item.trim());
    })
    // Filter web rules.
    .filter((rule) => {
      const isWebRule = webRuleNames.indexOf(rule[0]) !== -1;

      if (isWebRule) {
        const [name, value] = rule;
        webRules[camelize(name)] = value;

        return false;
      }

      return true;
    });

  return {
    ...webRules,
    ...transformCss(rules),
  };
};

function transform(content) {
  const result = parse(content);

  return result.map((item) => ({
    ...item,
    declarations: transformRules(item.declarations),
  }));
}

export default transform;
