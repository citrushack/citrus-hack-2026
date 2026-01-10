import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";
import ProtectedPage from "@/components/protected";
import { getSession } from "@/utils/auth/auth";

type Props = {
  children: React.ReactNode;
};

const FormLayout = async ({ children }: Props) => {
  const session = await getSession();

  return (
    <Providers>
      <Toaster />
      <ProtectedPage session={session} restrictions={{}}>
        {children}
      </ProtectedPage>
    </Providers>
  );
};

export default FormLayout;
