import { BLOCKS, Node } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichTextAsset from "./rich-text-asset";
import markdownStyles from "./markdown-styles.module.css";
import { Typography } from "@mui/material";
import { useState } from "react";
import slugify from "slugify";
import EmbeddedEntry from "./embedded-entry";

interface IndexSections {
  anchorID: string;
  text: string;
}

export default function PostBody({ content }: any) {
  const [sections] = useState<IndexSections[]>([]);

  const customMarkdownOptions = (content: any) => ({
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
      [BLOCKS.HEADING_2]: (node: Node) => {
        const text = (node as any).content[0].value;
        if (sections.filter((item) => item.anchorID === `#${slugify(text)}`).length <= 0) {
          sections.push({
            anchorID: "#" + slugify(text),
            text,
          });
        }
        return (
          <Typography variant="h2" id={slugify(text)}>
            <a href={`#${slugify(text)}`} className="anchor-post-section">
              {(node as any).content[0].value}
            </a>
          </Typography>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => (
        <EmbeddedEntry
          id={node.data.target.sys.id}
          block={content.links.entries.block}
        />
      ),
    },
  });

  return (
    <div className="content-center">
      <Typography
        variant="h3"
        className="capitalize"
        sx={{
          display: sections.length <= 0 ? "none" : "block",
        }}
      >
        índice
      </Typography>
      <ul>
        {sections.map((item, index) => (
          <li key={index} className="py-1">
            <a href={`${item.anchorID}`} className="index-link">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      <div className={markdownStyles["markdown"]}>
        {documentToReactComponents(
          content.json,
          customMarkdownOptions(content)
        )}
      </div>
    </div>
  );
}
