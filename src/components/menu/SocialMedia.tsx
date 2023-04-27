import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

export default function SocialMedia() {
  return (
    <div className="w-full lg:-[90%]">
      <div>
        <IconButton href="https://twitter.com/luizhenriquemsl" target="_blank">
          <Twitter />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com/in/luiz-henrique-monteiro-silva-lima/"
          target="_blank"
        >
          <LinkedIn />
        </IconButton>
        <IconButton href="https://github.com/luizhslima" target="_blank">
          <GitHub />
        </IconButton>
      </div>
    </div>
  );
}
