import { useRouter } from 'next/router';

const usePathname = () => {
  const { pathname } = useRouter();
  return pathname;
};

export default usePathname;