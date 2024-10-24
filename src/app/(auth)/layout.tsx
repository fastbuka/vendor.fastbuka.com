
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
          {children}
      </section>
    </div>
  );
}

export default Layout;
