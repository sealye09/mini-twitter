import { useRouter } from "next/router";
import { useCallback } from "react";
import { BsArrowLeft } from "react-icons/bs";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BsArrowLeft
            onClick={handleBack}
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-lg font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
