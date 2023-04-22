import { CopyAll } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { copyTextToClipboard } from "../utils/functions";

const SyntaxHighlighter = dynamic(
  import("react-syntax-highlighter").then((mod) => mod.Prism)
);

type SyntaxHighlightProps = {
  language: string;
  code: string;
  theme?: "dark" | "light";
};

export default function SyntaxHighlight({
  language,
  code,
  theme,
}: SyntaxHighlightProps) {
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (theme && theme === "light") {
      import(
        "react-syntax-highlighter/dist/esm/styles/prism/material-light"
      ).then((mod) => setStyle(mod.default));
    } else {
      import(
        "react-syntax-highlighter/dist/esm/styles/prism/material-dark"
      ).then((mod) => setStyle(mod.default));
    }
  });

  return (
    <div className="w-full md:w-full lg:w-full overflow-scroll lg:overflow-auto">
      <div className="flex items-center bg-gray-100 dark:bg-slate-500">
        <div className="flex-grow capitalize ml-5">{language}</div>
        <div className="bg-slate-300 dark:bg-black">
          <IconButton
            onClick={() => copyTextToClipboard(code)}
            aria-label="copiar todo codigo"
          >
            <CopyAll />
          </IconButton>
        </div>
      </div>
      <SyntaxHighlighter
        style={style}
        language={language}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
