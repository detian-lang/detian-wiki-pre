import siteConfig from '@generated/docusaurus.config';
import type * as PrismNamespace from 'prismjs';
import type {Optional} from 'utility-types';

export default function prismIncludeLanguages(
  PrismObject: typeof PrismNamespace,
): void {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism as {additionalLanguages: string[]};

  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      require('prismjs/components/prism-markup-templating.js');
    }
    require(`prismjs/components/prism-${lang}`);
  });

  PrismObject.languages.detian = {
    comment: [
      {
        pattern: /\/\/[^\r\n]*/,
        greedy: true,
      },
      {
        pattern: /\/\*[\s\S]*?\*\//,
        greedy: true,
      },
    ],
    string: {
      pattern: /"(?:\\.|[^"\\])*"/,
      greedy: true,
    },
    duration: /\b\d+(?:ms|s|m|h)\b/,
    number: /\b\d+(?:\.\d+)?\b/,
    keyword:
      /\b(?:load|as|require|export|group|thread|type|typestrict|autoflow|policy|try|on|fail|finally|timeout|retry|backoff|jitter|await|join|sync|cancel|schedule|log|test|assert|print|return|sleep|adopt|true|false|if|else|loop|while|for|in|const|var|dynamic|and|or|not|self|null)\b/,
    builtin:
      /\b(?:len|get|put|keys|has|now|since|argv|argc|json_parse|json_stringify|base64_encode|base64_decode|random|random_int|typeof|prompt|prompt_int|confirm|read_stdin|read_stdin_json|http_get|http_post|http_post_json|http_request|run_graph|trace_dump|write_trace|autoflow_trace)\b/,
    className: /\b[A-Z][A-Za-z0-9_]*\b/,
    function:
      /\b(?:[a-z_][A-Za-z0-9_]*\.)*[a-z_][A-Za-z0-9_]*(?=\s*\()/,
    variable: /[#@][A-Za-z_][A-Za-z0-9_]*/,
    operator: /\?\.|\?\?|=>|->|\+\+|--|==|!=|<=|>=|\|\||&&|[+\-*/%<>=|^?:]/,
    punctuation: /[()[\]{},.;]/,
  };

  PrismObject.languages.det = PrismObject.languages.detian;

  delete (globalThis as Optional<typeof globalThis, 'Prism'>).Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismBefore;
  }
}
