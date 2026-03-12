import abbr from '../abbr.json';

function handleAbbr(md) {
  if (!abbr || typeof abbr !== 'object') {
    return false;
  }

  const defaultRender = md.renderer.render.bind(md.renderer);

  md.renderer.render = function(tokens, options, env) {
    let result = defaultRender(tokens, options, env);

    for (const key in abbr) {
      const pattern = new RegExp(`${key}(?!\s*<\/abbr>)`, 'gm');
      const replacement = `<abbr title="${abbr[key]}">${key}</abbr>`;

      result = result.replace(pattern, replacement);
    }

    return result;
  };

  return true;
}

export default handleAbbr;
