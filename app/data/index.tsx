import { Calendar, Home, Inbox, Moon, Search } from "lucide-react";
import { type SVGProps } from "react";

interface SidebarItemsType {
    id: number;
    itemLabel: string;
    icon: React.FC<SVGProps<SVGSVGElement>>;
}

const sidebarItems: SidebarItemsType[] = [
    { id: 0, itemLabel: "Home", icon: Home },
]

export { sidebarItems }