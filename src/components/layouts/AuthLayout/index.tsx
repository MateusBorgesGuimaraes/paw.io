import { Outlet, useRouterState } from "@tanstack/react-router";

import styles from "./AuthLayout.module.css";
import { SidebarHeader } from "./Sidebar/SidebarHeader";
import { SidebarContent } from "./Sidebar/SidebarContent";
import { SidebarGroup } from "./Sidebar/SidebarGroup";
import { SidebarItem } from "./Sidebar/SidebarItem";
import { SidebarFooter } from "./Sidebar/SidebarFooter";
import { Sidebar } from "./Sidebar";

import {
  ClipboardPlusIcon,
  HandCoinsIcon,
  HeartPlusIcon,
  HospitalIcon,
  MessageSquareWarningIcon,
  PawPrintIcon,
  ShieldUserIcon,
  SquareArrowRightExitIcon,
  SyringeIcon,
  UsersRoundIcon,
} from "lucide-react";
import { IntroPage } from "../../IntroPage";
import type { RouterContext } from "../../../app/router";
import { useLogout } from "../../../entities/auth/api/hooks/useLogout";
import { useCurrentUser } from "../../../entities/auth/api/hooks/useCurrentUser";

export function AuthLayout() {
  const page = useRouterState({
    select: (s) => (s.matches.at(-1)?.context as RouterContext)?.page,
  });
  const { mutate: logout, isPending } = useLogout();
  const { data } = useCurrentUser();
  const role = data?.role;

  const allNavlinks = [
    {
      group: "Cadastros",
      roles: ["admin", "receptionist"],
      links: [
        {
          link: "/owners",
          label: "Tutores",
          icon: <UsersRoundIcon />,
          roles: ["admin", "receptionist"],
        },
        {
          link: "/pets",
          label: "Pets",
          icon: <PawPrintIcon />,
          roles: ["admin", "receptionist"],
        },
        {
          link: "/users",
          label: "Usuarios",
          icon: <ShieldUserIcon />,
          roles: ["admin"],
        },
      ],
    },
    {
      group: "Atendimento",
      roles: ["admin", "receptionist", "veterinarian"],
      links: [
        {
          link: "/appointments",
          label: "Consultas",
          icon: <HospitalIcon />,
          roles: ["admin", "receptionist", "veterinarian"],
        },
        {
          link: "/prontuarios",
          label: "Prontuários",
          icon: <ClipboardPlusIcon />,
          roles: ["admin", "veterinarian"],
        },
        {
          link: "/vaccines",
          label: "Vacinas",
          icon: <SyringeIcon />,
          roles: ["admin", "receptionist", "veterinarian"],
        },
        {
          link: "/exams",
          label: "Exames",
          icon: <HeartPlusIcon />,
          roles: ["admin", "veterinarian"],
        },
      ],
    },
    {
      group: "Administração",
      roles: ["admin", "receptionist"],
      links: [
        {
          link: "/payments",
          label: "Pagamentos",
          icon: <HandCoinsIcon />,
          roles: ["admin", "receptionist"],
        },
        {
          link: "/reports",
          label: "Relatórios",
          icon: <MessageSquareWarningIcon />,
          roles: ["admin"],
        },
      ],
    },
  ];

  const navlinks = allNavlinks
    .map((group) => ({
      ...group,
      links: group.links.filter((l) => role && l.roles.includes(role)),
    }))
    .filter((group) => group.links.length > 0);

  return (
    <div className={styles.layout}>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          {navlinks.map((g) => (
            <SidebarGroup key={g.group} label={g.group}>
              {g.links.map((l) => (
                <SidebarItem
                  key={l.label}
                  to={l.link}
                  icon={l.icon}
                  label={l.label}
                />
              ))}
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <button
            onClick={() => logout()}
            disabled={isPending}
            aria-label="Sair"
            className={styles.footerExit}
          >
            <SquareArrowRightExitIcon size={22} />
          </button>
        </SidebarFooter>
      </Sidebar>

      <main className={styles.content}>
        <header className={styles.header}>
          <IntroPage
            title={page?.title || "Add titulo"}
            subtitle={page?.subtitle || "Add subtitulo"}
          />
        </header>
        <div className={styles.contentLayout}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
