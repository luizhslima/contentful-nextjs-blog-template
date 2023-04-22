import SyntaxHighlight from "../code/syntax-highlight";
import { useAppThemeContext } from "../theme/AppThemeContext";

export default function EmbeddedEntry({
  id,
  block,
}: {
  id: string;
  block: any[];
}) {
  const theme = useAppThemeContext();
  const entry = block.find((item) => item.sys.id == id);
  if (entry.__typename === "Sourcecode") {
    return (
      <SyntaxHighlight
        code={entry.snippetcode}
        language={entry.language}
        theme={theme.mode}
      />
    );
  }

  return null;
}
