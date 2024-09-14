import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

const linkClassName = 'bg-secondary text-text m-3 p-3 rounded-lg inline-block hover:ml-0 hover:mr-0 hover:bg-foreground smooth';
const activeLinkClassName =  "ml-0 mr-0 bg-foreground border-4 border-foreground " + linkClassName;

const NavLink = ({ href, children }: NavLinkProps) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <div className={isActive ? activeLinkClassName : linkClassName}>
            <Link href={href} className=''>
                {children}  
            </Link>
        </div>
    );
};

export default NavLink;
