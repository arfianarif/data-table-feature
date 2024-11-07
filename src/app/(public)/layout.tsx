import HeadNav from '@/components/base/head-nav'
import PageContainer from '@/components/page-container'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageContainer>
      <HeadNav />
      {children}
    </PageContainer>
  )
}
