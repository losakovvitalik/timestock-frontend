import { CircleCheckBig, Clock, FolderOpen, Menu } from 'lucide-react';
import Link from 'next/link';
import { paths } from '../../shared/constants';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../shared/ui/sidebar';
import { AppSidebarActiveTime } from './app-sidebar-active-time';

const items = [
  {
    title: 'Таймер',
    url: paths.timer,
    icon: Clock,
  },
  {
    title: 'Проекты',
    url: paths.project.list,
    icon: FolderOpen,
  },
  {
    title: 'Задачи',
    url: paths.task.list,
    icon: CircleCheckBig,
  },
  {
    title: 'Меню',
    url: paths.menu,
    icon: Menu,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pb-0">
          <SidebarGroupLabel className="px-0">Таймер</SidebarGroupLabel>
          <AppSidebarActiveTime />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-0">Приложение</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
