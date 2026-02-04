
// icons.js

// Languages
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPython,
  
  SiC,
  SiCplusplus,

  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiKotlin,
  SiSwift
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { FaJava ,FaFileCode } from "react-icons/fa";
// Frontend / Styling
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiTailwindcss,
  SiBootstrap
} from "react-icons/si";

// Backend / Runtime
import {
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiSpringboot
} from "react-icons/si";

// Databases
import {
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiSqlite,
  SiOracle,
  SiDotenv
  
} from "react-icons/si";

// Terminal / CLI
import { SiGnubash } from "react-icons/si";
import { FaTerminal } from "react-icons/fa";


// icons.js
export const ICONS = {
  // Languages
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  typescript: SiTypescript,
  python: SiPython,
  java: FaJava,
  c: SiC,
  cpp: SiCplusplus,
  csharp: TbBrandCSharp,
  go: SiGo,
  rust: SiRust,
  php: SiPhp,
  ruby: SiRuby,
  kotlin: SiKotlin,
  swift: SiSwift,
  filecode: FaFileCode,
  // Frontend / UI
  react: SiReact,
  nextjs: SiNextdotjs,
  vue: SiVuedotjs,
  angular: SiAngular,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  dotenv: SiDotenv,

  // Backend
  node: SiNodedotjs,
  express: SiExpress,
  django: SiDjango,
  flask: SiFlask,
  springboot: SiSpringboot,

  // Databases
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  redis: SiRedis,
  sqlite: SiSqlite,
  oracle: SiOracle,


  // Terminal
  bash: SiGnubash,
  terminal: FaTerminal
};

const IconRenderer = ({ icon, size = 22, className }: { icon: string; size?: number; className?: string }) => {
  const Icon = ICONS[icon as keyof typeof ICONS];
  return Icon ? <Icon size={size} className={className} /> : null;
};

export default IconRenderer;