import * as React from 'react';
import PropTypes from 'prop-types';
import prism from 'docs/src/modules/utils/prism';
import MarkdownElement from './MarkdownElement';

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const { code, language, ...other } = props;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);

  return (
    <MarkdownElement ref={ref} {...other}>
      <pre>
        <code
          className={`language-${language}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: renderedCode }}
        />
      </pre>
    </MarkdownElement>
  );
});

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default HighlightedCode;
