import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarItems } from "@/app/data"

export function AppSidebar() {
    return (
        <Sidebar className="h-11/12 my-auto border-0">
            <SidebarContent
            >
                <SidebarGroup className="items-center">
                    <SidebarGroupLabel>Weather</SidebarGroupLabel>
                    <SidebarGroupContent className="items-center">
                        <SidebarMenu className="items-center">
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton asChild>
                                        <a href={"/"}>
                                            <item.icon />
                                            <span>{item.itemLabel}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
