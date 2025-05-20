import { Calendar, Home, Inbox, Search } from "lucide-react";
import { type SVGProps } from "react";

interface SidebarItemsType {
    id: number;
    itemLabel: string;
    icon: React.FC<SVGProps<SVGSVGElement>>;
}

const sidebarItems: SidebarItemsType[] = [
    { id: 0, itemLabel: "İtems1", icon: Home },
    { id: 1, itemLabel: "İtems1", icon: Calendar },
    { id: 2, itemLabel: "İtems1", icon: Inbox },
    { id: 3, itemLabel: "İtems1", icon: Search },
]

export { sidebarItems }