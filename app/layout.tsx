import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import './globals.css'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html >
      <body className="w-full relative">
        <SidebarProvider
          style={{
            "--sidebar-width": "13rem",
            "--sidebar-width-mobile": "5rem",
          }}
        >
          <AppSidebar />
          <span className="absolute top-0 right-0">
            <SidebarTrigger />
          </span>
          <main className="w-full h-full">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
