// import Link from 'next/link';
// import AuthCard from '@/app/(auth)/AuthCard';
// import AuthLogo from '@/components/AuthLogo';

export const metadata = {
  title: 'Authentication',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <section className=''>
        {/* <AuthCard
          logo={
            <Link href="/">
              <AuthLogo />
            </Link>
          }
        >
        </AuthCard> */}
          {children}
      </section>
    </div>
  );
}

export default Layout;
