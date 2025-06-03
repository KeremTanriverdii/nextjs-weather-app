import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import './globals.css'
import { WeatherProvider } from "./context/WeatherContext"
import { cookies } from "next/headers"
export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'false'
  return (
    <html >
      <body className="w-full relative bg-[#4373AE]">
        <WeatherProvider>
          <SidebarProvider
            defaultOpen={defaultOpen}
            style={{
              "--sidebar-width": "13rem",
              "--sidebar-width-mobile": "5rem",
            }}
          >
            <AppSidebar />
            <span className="absolute top-0 right-2 z-10 ">
              <SidebarTrigger className="" />
            </span>
            <main className="w-full h-full">
              {children}
            </main>
          </SidebarProvider>
        </WeatherProvider>
      </body>
    </html>
  )
}
