import { Typography } from "@mui/material";
import SocialMedia from "../menu/SocialMedia";

export default function AbsoluteFooter() {
  return (
    <footer className="pt-10 mt-1 bg-slate-100 dark:bg-slate-900 dark:text-white">
      <div className="py-3 px-10">
        <div className="flex items-center">
          <SocialMedia></SocialMedia>
          <Typography>Feito por Luiz Monteiro</Typography>
        </div>
      </div>
    </footer>
  );
}
