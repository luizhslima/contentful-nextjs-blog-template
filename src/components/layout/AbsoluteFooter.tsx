import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

export default function AbsoluteFooter() {
  return (
    <footer className="pt-10 mt-12 bg-slate-100 dark:bg-slate-900 dark:text-white">
      <div className="py-3 px-10">
        <div className="flex items-center">
          <div className="w-full lg:-[90%]">
            <div>
              <IconButton
                href="https://twitter.com/luizhenriquemsl"
                target="_blank"
              >
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
          <Typography>Desenvolvido por Luiz henrique</Typography>
        </div>
      </div>
    </footer>
  );
}
