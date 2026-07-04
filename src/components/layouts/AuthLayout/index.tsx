import { Outlet } from "@tanstack/react-router";

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
  SquareArrowRightExitIcon,
  StethoscopeIcon,
  SyringeIcon,
  UsersRoundIcon,
} from "lucide-react";
import { useLogout } from "../../../features/auth/hooks/useLogout";

export function AuthLayout() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className={styles.layout}>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup label="Cadastros">
            <SidebarItem
              to="/owners"
              icon={<UsersRoundIcon />}
              label="Tutores"
            />
            <SidebarItem to="/pets" icon={<PawPrintIcon />} label="Pets" />
            <SidebarItem
              to="/veterinarios"
              icon={<StethoscopeIcon />}
              label="Veterinarios"
            />
          </SidebarGroup>

          <SidebarGroup label="Atendimento">
            <SidebarItem
              to="/consulta"
              icon={<HospitalIcon />}
              label="Consulta"
            />

            <SidebarItem
              to="/prontuarios"
              icon={<ClipboardPlusIcon />}
              label="prontuarios"
            />

            <SidebarItem to="/vacinas" icon={<SyringeIcon />} label="vacinas" />

            <SidebarItem to="/exames" icon={<HeartPlusIcon />} label="exames" />
          </SidebarGroup>

          <SidebarGroup label="Administração">
            <SidebarItem
              to="/pagamentos"
              icon={<HandCoinsIcon />}
              label="Pagamentos"
            />

            <SidebarItem
              to="/relatorios"
              icon={<MessageSquareWarningIcon />}
              label="Relatórios"
            />
          </SidebarGroup>
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
        <Outlet />
      </main>
    </div>
  );
}
